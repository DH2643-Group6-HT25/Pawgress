
export interface Formatting {
  start: number;
  end: number;
  type: 'bold' | 'italic' | 'underline';
}

export interface Journal {
  _id: string;
  journal: string;
  formatting?: Formatting[];
  date: string;
  userId: string;
}

// Get all journals for a user
export async function getJournalsForUser(userId: string): Promise<Journal[]> {
  const res = await fetch(`/api/journal?userId=${userId}`);
  if (!res.ok) throw new Error('Could not fetch journals');
  return res.json();
}

// Create or update today's journal
export async function upsertTodayJournal(journal: string, formatting: Formatting[] | undefined, userId: string): Promise<Journal> {
  const res = await fetch('/api/journal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ journal, formatting, user: userId }),
  });
  if (!res.ok) throw new Error('Could not save journal');
  return res.json();
}

// Update journal by ID
export async function updateJournal(id: string, patch: { journal?: string; formatting?: Formatting[] }): Promise<Journal> {
  const res = await fetch(`/api/journal/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  });
  if (!res.ok) throw new Error('Could not update journal');
  return res.json();
}

// Delete journal by ID
export async function deleteJournal(id: string): Promise<void> {
  const res = await fetch(`/api/journal/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Could not delete journal');
}
