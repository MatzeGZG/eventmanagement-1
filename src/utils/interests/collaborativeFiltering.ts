```typescript
interface UserInterests {
  userId: string;
  interests: string[];
  weights: Record<string, number>;
}

export class CollaborativeFilter {
  private userInterests: Map<string, UserInterests> = new Map();

  addUser(userId: string, interests: string[], weights: Record<string, number>) {
    this.userInterests.set(userId, { userId, interests, weights });
  }

  findSimilarUsers(userId: string, limit = 5): string[] {
    const user = this.userInterests.get(userId);
    if (!user) return [];

    const similarities = Array.from(this.userInterests.entries())
      .filter(([id]) => id !== userId)
      .map(([id, other]) => ({
        id,
        similarity: this.calculateSimilarity(user, other)
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit);

    return similarities.map(s => s.id);
  }

  suggestInterests(userId: string): string[] {
    const user = this.userInterests.get(userId);
    if (!user) return [];

    const similarUsers = this.findSimilarUsers(userId);
    const interestScores = new Map<string, number>();

    similarUsers.forEach(similarId => {
      const similar = this.userInterests.get(similarId);
      if (!similar) return;

      similar.interests
        .filter(interest => !user.interests.includes(interest))
        .forEach(interest => {
          const currentScore = interestScores.get(interest) || 0;
          interestScores.set(
            interest, 
            currentScore + (similar.weights[interest] || 1)
          );
        });
    });

    return Array.from(interestScores.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([interest]) => interest)
      .slice(0, 5);
  }

  private calculateSimilarity(user1: UserInterests, user2: UserInterests): number {
    const commonInterests = user1.interests.filter(i => 
      user2.interests.includes(i)
    );

    if (commonInterests.length === 0) return 0;

    const weightedSum = commonInterests.reduce((sum, interest) => 
      sum + (user1.weights[interest] || 1) * (user2.weights[interest] || 1), 
      0
    );

    return weightedSum / Math.sqrt(
      user1.interests.length * user2.interests.length
    );
  }
}
```