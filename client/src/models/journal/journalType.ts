export interface Journal {
  _id: string;
  journal: string;
  formatting?: Array<{ start: number; end: number; type: 'bold' | 'italic' | 'underline' }>;
  imageUrl?: string;
  date: string;
  userId: string;
}
