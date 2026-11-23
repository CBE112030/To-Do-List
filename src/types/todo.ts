export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export type FilterMode = 'all' | 'active' | 'completed';
