import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Journal } from './journalType';
import { saveJournal } from '../../api/journal';
import { getJournalsForUser } from '../../api/journal';

// Save (create or update) today's journal entry
export const saveJournalEntry = createAsyncThunk<
  Journal,
  { journal: string; formatting?: any[]; userId: string; image?: File },
  { rejectValue: string }
>(
  'journal/saveJournalEntry',
  async (data, { rejectWithValue }) => {
    try {
      const res = await saveJournal(data);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Network error');
    }
  }
);

// Fetch all journals for a user
export const fetchJournalsForUser = createAsyncThunk<
  Journal[],
  string,
  { rejectValue: string }
>(
  'journal/fetchJournalsForUser',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await getJournalsForUser(userId);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Network error');
    }
  }
);
