export const chunkLoader = {
  async loadMapChunk(): Promise<void> {
    await Promise.all([
      import('mapbox-gl/dist/mapbox-gl.js'),
      import('mapbox-gl/dist/mapbox-gl.css')
    ]);
  },

  async loadCalendarChunk(): Promise<void> {
    await import('../../features/calendar/components/CalendarLayout');
  },

  preloadChunk(chunkName: 'map' | 'calendar'): void {
    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => {
        if (chunkName === 'map') this.loadMapChunk();
        else this.loadCalendarChunk();
      });
    }
  }
};