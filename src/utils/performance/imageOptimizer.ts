export const imageOptimizer = {
  getOptimizedUrl(url: string, width: number): string {
    // For Unsplash images, use their image optimization API
    if (url.includes('unsplash.com')) {
      const baseUrl = url.split('?')[0];
      return `${baseUrl}?w=${width}&q=80&auto=format`;
    }
    return url;
  },

  preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = src;
    });
  }
};