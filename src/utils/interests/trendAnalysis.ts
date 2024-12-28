```typescript
interface InterestTrend {
  interest: string;
  popularity: number;
  growth: number;
  momentum: number;
}

export class TrendAnalyzer {
  private static readonly TREND_WINDOW = 7 * 24 * 60 * 60 * 1000; // 7 days

  static analyzeTrends(interactions: Array<{
    interest: string;
    timestamp: number;
    type: 'view' | 'click' | 'attend';
  }>): InterestTrend[] {
    const now = Date.now();
    const recentInteractions = interactions.filter(
      i => now - i.timestamp < this.TREND_WINDOW
    );

    const trends = new Map<string, {
      total: number;
      recent: number;
      veryRecent: number;
    }>();

    recentInteractions.forEach(interaction => {
      const current = trends.get(interaction.interest) || {
        total: 0,
        recent: 0,
        veryRecent: 0
      };

      current.total++;
      
      if (now - interaction.timestamp < this.TREND_WINDOW / 2) {
        current.recent++;
      }
      
      if (now - interaction.timestamp < this.TREND_WINDOW / 4) {
        current.veryRecent++;
      }

      trends.set(interaction.interest, current);
    });

    return Array.from(trends.entries()).map(([interest, stats]) => ({
      interest,
      popularity: stats.total,
      growth: stats.recent / (stats.total - stats.recent),
      momentum: stats.veryRecent / stats.recent
    }));
  }

  static getHotTopics(trends: InterestTrend[], limit = 5): string[] {
    return trends
      .sort((a, b) => 
        (b.popularity * b.growth * b.momentum) - 
        (a.popularity * a.growth * a.momentum)
      )
      .slice(0, limit)
      .map(t => t.interest);
  }
}
```