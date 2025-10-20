
import { INTERNAL_API_URL } from './config';

export interface Formatting {
  start: number;
  end: number;
  type: 'bold' | 'italic' | 'underline';
}

export interface Journal {
  _id: string;
  journal: string;
  formatting?: Formatting[];
  imageUrl?: string;
  date: string;
  userId: string;
}

const JOURNAL_API_URL = INTERNAL_API_URL + '/journal';

export async function getJournalsForUser(userId: string): Promise<Journal[]> {
  const res = await fetch(`${JOURNAL_API_URL}?userId=${userId}`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error(await res.text() || 'Could not fetch journals');
  return res.json();
}

export async function saveJournal(
  data: { journal: string; formatting?: Formatting[]; userId: string; image?: File }
): Promise<Journal> {
  let res: Response;
  if (data.image) {
    const formData = new FormData();
    formData.append('journal', data.journal);
    formData.append('userId', data.userId);
    formData.append('formatting', JSON.stringify(data.formatting || []));
    formData.append('image', data.image);
    res = await fetch(JOURNAL_API_URL, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
  } else {
    res = await fetch(JOURNAL_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        journal: data.journal,
        userId: data.userId,
        formatting: data.formatting || [],
      }),
      credentials: 'include',
    });
  }
  if (!res.ok) throw new Error(await res.text() || 'Could not save journal');
  return res.json();
}

export async function deleteJournal(id: string): Promise<void> {
  const res = await fetch(`${JOURNAL_API_URL}/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) throw new Error(await res.text() || 'Could not delete journal');
}
