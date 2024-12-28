export class TouchHandler {
  private startX: number = 0;
  private startY: number = 0;
  private threshold: number = 50;

  onSwipe(
    element: HTMLElement,
    callbacks: {
      onLeft?: () => void;
      onRight?: () => void;
      onUp?: () => void;
      onDown?: () => void;
    }
  ): () => void {
    const handleStart = (e: TouchEvent) => {
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
    };

    const handleEnd = (e: TouchEvent) => {
      const deltaX = e.changedTouches[0].clientX - this.startX;
      const deltaY = e.changedTouches[0].clientY - this.startY;

      if (Math.abs(deltaX) > this.threshold) {
        deltaX > 0 ? callbacks.onRight?.() : callbacks.onLeft?.();
      }
      if (Math.abs(deltaY) > this.threshold) {
        deltaY > 0 ? callbacks.onDown?.() : callbacks.onUp?.();
      }
    };

    element.addEventListener('touchstart', handleStart);
    element.addEventListener('touchend', handleEnd);

    return () => {
      element.removeEventListener('touchstart', handleStart);
      element.removeEventListener('touchend', handleEnd);
    };
  }
}