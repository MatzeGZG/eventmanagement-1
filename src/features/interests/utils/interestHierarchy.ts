```typescript
interface InterestNode {
  id: string;
  name: string;
  weight: number;
  children: InterestNode[];
  parent?: string;
}

export class InterestHierarchy {
  private nodes: Map<string, InterestNode> = new Map();

  addInterest(id: string, name: string, parentId?: string) {
    const node: InterestNode = {
      id,
      name,
      weight: 1.0,
      children: [],
      parent: parentId
    };

    this.nodes.set(id, node);

    if (parentId && this.nodes.has(parentId)) {
      this.nodes.get(parentId)?.children.push(node);
    }
  }

  updateWeight(id: string, interaction: 'view' | 'click' | 'attend') {
    const node = this.nodes.get(id);
    if (!node) return;

    const weights = {
      view: 0.1,
      click: 0.3,
      attend: 0.6
    };

    node.weight = Math.min(2.0, node.weight + weights[interaction]);

    // Propagate weight changes up the hierarchy
    if (node.parent) {
      const parentNode = this.nodes.get(node.parent);
      if (parentNode) {
        parentNode.weight = Math.min(2.0, parentNode.weight + weights[interaction] * 0.5);
      }
    }
  }

  getSimilarInterests(id: string): string[] {
    const node = this.nodes.get(id);
    if (!node) return [];

    // Get siblings and cousins
    const siblings = node.parent ? 
      this.nodes.get(node.parent)?.children.map(n => n.id) || [] : 
      [];

    return [...new Set([...siblings, ...node.children.map(n => n.id)])];
  }
}
```