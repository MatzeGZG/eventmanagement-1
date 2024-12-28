```typescript
export interface Tag {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  metadata: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export interface TagCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  parent_id?: string;
  created_at: Date;
  updated_at: Date;
}

export interface TagRelationship {
  parent_tag_id: string;
  child_tag_id: string;
  relationship_type: string;
  weight: number;
  created_at: Date;
}

export interface TagPreference {
  user_id: string;
  tag_id: string;
  preference_level: number;
  interaction_count: number;
  last_interaction: Date;
  created_at: Date;
  updated_at: Date;
}

export interface TagAnalytics {
  tag_id: string;
  date: Date;
  usage_count: number;
  event_count: number;
  user_count: number;
  trending_score: number;
  metadata: Record<string, any>;
}
```