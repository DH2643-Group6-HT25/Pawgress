import { createAsyncThunk } from '@reduxjs/toolkit'
import type { Journal } from './journalType'
import {
  saveJournal,
  deleteJournal,
  getJournalsForUser,
} from '../../api/journal'
import { getErrorMessage } from '../../utils/errorHandling'

export const deleteJournalById = createAsyncThunk<
  string,
  { id: string },
  { rejectValue: string }
>('journal/deleteJournalById', async ({ id }, { rejectWithValue }) => {
  try {
    await deleteJournal(id)
    return id
  } catch (err) {
    return rejectWithValue(getErrorMessage(err) || 'Network error')
  }
})

export const saveJournalEntry = createAsyncThunk<
  Journal,
  { journal: string; formatting?: never[]; userId: string; image?: File },
  { rejectValue: string }
>('journal/saveJournalEntry', async (data, { rejectWithValue }) => {
  try {
    const res = await saveJournal(data)
    return res
  } catch (err) {
    return rejectWithValue(getErrorMessage(err) || 'Network error')
  }
})

export const fetchJournalsForUser = createAsyncThunk(
  'journal/fetchJournalsForUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getJournalsForUser()
      return res
    } catch (err) {
      return rejectWithValue(getErrorMessage(err) || 'Network error')
    }
  }
)
