```typescript
interface SpatialNode {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  id?: string;
  children?: SpatialNode[];
}

export class RTree {
  private root: SpatialNode | null = null;
  private maxEntries = 9;

  insert(id: string, lat: number, lon: number) {
    const node: SpatialNode = {
      minX: lon,
      minY: lat,
      maxX: lon,
      maxY: lat,
      id
    };

    if (!this.root) {
      this.root = node;
      return;
    }

    this.insertNode(this.root, node);
  }

  bulkLoad(points: Array<{ id: string; lat: number; lon: number }>) {
    // Sort by X coordinate for better initial distribution
    points.sort((a, b) => a.lon - b.lon);
    
    const nodes = points.map(p => ({
      minX: p.lon,
      minY: p.lat,
      maxX: p.lon,
      maxY: p.lat,
      id: p.id
    }));

    this.root = this.bulkLoadNodes(nodes);
  }

  search(minLat: number, minLon: number, maxLat: number, maxLon: number): string[] {
    if (!this.root) return [];
    return this.searchNode(this.root, minLon, minLat, maxLon, maxLat);
  }

  private insertNode(parent: SpatialNode, node: SpatialNode) {
    if (parent.children) {
      const bestChild = this.chooseBestChild(parent, node);
      this.insertNode(bestChild, node);
    } else if (parent.children?.length < this.maxEntries) {
      parent.children = parent.children || [];
      parent.children.push(node);
    } else {
      this.split(parent, node);
    }
    
    this.extendBounds(parent, node);
  }

  private chooseBestChild(parent: SpatialNode, node: SpatialNode): SpatialNode {
    let minIncrease = Infinity;
    let bestChild = parent.children![0];

    parent.children!.forEach(child => {
      const increase = this.calculateBoundsIncrease(child, node);
      if (increase < minIncrease) {
        minIncrease = increase;
        bestChild = child;
      }
    });

    return bestChild;
  }

  private calculateBoundsIncrease(a: SpatialNode, b: SpatialNode): number {
    const currentArea = (a.maxX - a.minX) * (a.maxY - a.minY);
    const newMinX = Math.min(a.minX, b.minX);
    const newMinY = Math.min(a.minY, b.minY);
    const newMaxX = Math.max(a.maxX, b.maxX);
    const newMaxY = Math.max(a.maxY, b.maxY);
    const newArea = (newMaxX - newMinX) * (newMaxY - newMinY);
    return newArea - currentArea;
  }

  private extendBounds(parent: SpatialNode, node: SpatialNode) {
    parent.minX = Math.min(parent.minX, node.minX);
    parent.minY = Math.min(parent.minY, node.minY);
    parent.maxX = Math.max(parent.maxX, node.maxX);
    parent.maxY = Math.max(parent.maxY, node.maxY);
  }

  private split(node: SpatialNode, newNode: SpatialNode) {
    // Implement node splitting logic
  }

  private bulkLoadNodes(nodes: SpatialNode[]): SpatialNode {
    if (nodes.length <= this.maxEntries) {
      return {
        minX: Math.min(...nodes.map(n => n.minX)),
        minY: Math.min(...nodes.map(n => n.minY)),
        maxX: Math.max(...nodes.map(n => n.maxX)),
        maxY: Math.max(...nodes.map(n => n.maxY)),
        children: nodes
      };
    }

    const sliceSize = Math.ceil(nodes.length / this.maxEntries);
    const parentNodes: SpatialNode[] = [];

    for (let i = 0; i < nodes.length; i += sliceSize) {
      const slice = nodes.slice(i, i + sliceSize);
      parentNodes.push(this.bulkLoadNodes(slice));
    }

    return this.bulkLoadNodes(parentNodes);
  }

  private searchNode(
    node: SpatialNode,
    minX: number,
    minY: number,
    maxX: number,
    maxY: number
  ): string[] {
    if (!this.intersects(node, minX, minY, maxX, maxY)) {
      return [];
    }

    const results: string[] = [];

    if (node.children) {
      node.children.forEach(child => {
        results.push(...this.searchNode(child, minX, minY, maxX, maxY));
      });
    } else if (node.id) {
      results.push(node.id);
    }

    return results;
  }

  private intersects(
    node: SpatialNode,
    minX: number,
    minY: number,
    maxX: number,
    maxY: number
  ): boolean {
    return !(
      node.maxX < minX ||
      node.minX > maxX ||
      node.maxY < minY ||
      node.minY > maxY
    );
  }
}
```