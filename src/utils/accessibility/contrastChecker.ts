export class ContrastChecker {
  // Convert hex to RGB
  private static hexToRgb(hex: string): number[] {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result 
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16)
        ]
      : [0, 0, 0];
  }

  // Calculate relative luminance
  private static getLuminance(r: number, g: number, b: number): number {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 
        ? c / 12.92 
        : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  // Calculate contrast ratio
  static getContrastRatio(color1: string, color2: string): number {
    const rgb1 = this.hexToRgb(color1);
    const rgb2 = this.hexToRgb(color2);
    
    const l1 = this.getLuminance(rgb1[0], rgb1[1], rgb1[2]);
    const l2 = this.getLuminance(rgb2[0], rgb2[1], rgb2[2]);
    
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }

  // Check if contrast meets WCAG 2.1 AA standards
  static meetsWCAGAA(color1: string, color2: string, isLargeText: boolean = false): boolean {
    const ratio = this.getContrastRatio(color1, color2);
    return isLargeText ? ratio >= 3 : ratio >= 4.5;
  }

  // Get suggested colors for better contrast
  static getSuggestedColors(backgroundColor: string, textColor: string): string[] {
    const suggestions: string[] = [];
    const rgb = this.hexToRgb(textColor);
    
    // Try adjusting brightness
    for (let i = 0; i <= 255; i += 51) {
      const newColor = `#${rgb.map(c => 
        Math.min(255, Math.max(0, c + i))
          .toString(16)
          .padStart(2, '0')
      ).join('')}`;
      
      if (this.meetsWCAGAA(backgroundColor, newColor)) {
        suggestions.push(newColor);
      }
    }
    
    return suggestions;
  }
}