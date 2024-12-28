```typescript
export class ImageLoader {
  private static loadedImages = new Set<string>();
  private static observer: IntersectionObserver;

  static init() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              this.loadImage(img);
            }
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    );
  }

  static observe(img: HTMLImageElement) {
    if (!this.observer) {
      this.init();
    }
    this.observer.observe(img);
  }

  private static async loadImage(img: HTMLImageElement) {
    const src = img.dataset.src;
    if (!src || this.loadedImages.has(src)) return;

    try {
      // Create new image to preload
      const preloadImg = new Image();
      preloadImg.src = src;
      
      await new Promise((resolve, reject) => {
        preloadImg.onload = resolve;
        preloadImg.onerror = reject;
      });

      // Update actual image
      img.src = src;
      img.removeAttribute('data-src');
      this.loadedImages.add(src);
      this.observer.unobserve(img);

    } catch (error) {
      console.error('Failed to load image:', error);
    }
  }

  static preloadImage(src: string): Promise<void> {
    if (this.loadedImages.has(src)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.loadedImages.add(src);
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  static preloadImages(srcs: string[]) {
    return Promise.all(srcs.map(src => this.preloadImage(src)));
  }
}
```