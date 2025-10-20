import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Journal } from './journalType'
import { saveJournalEntry, fetchJournalsForUser, deleteJournalById } from './journalThunks'

type JournalState = {
  journals: Journal[];
  today: Journal | null;
  loading: boolean;
  error: string | null;
};

const initialState: JournalState = {
  journals: [],
  today: null,
  loading: false,
  error: null,
}

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    setJournals: (state, action: PayloadAction<Journal[]>) => {
      state.journals = action.payload
    },
    setTodayJournal: (state, action: PayloadAction<Journal | null>) => {
      state.today = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveJournalEntry.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(saveJournalEntry.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.today = action.payload
        const idx = state.journals.findIndex((j: Journal) => j._id === action.payload._id)
        if (idx !== -1) {
          state.journals[idx] = action.payload
        } else {
          state.journals.unshift(action.payload)
        }
      })
      .addCase(saveJournalEntry.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to save journal'
      })
      .addCase(deleteJournalById.fulfilled, (state, action) => {
        state.journals = state.journals.filter((j: Journal) => j._id !== action.payload)
        if (state.today && state.today._id === action.payload) {
          state.today = null
        }
      })
      .addCase(fetchJournalsForUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchJournalsForUser.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.journals = action.payload
      })
      .addCase(fetchJournalsForUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to fetch journals'
      })
  },
})

export const { setJournals, setTodayJournal } = journalSlice.actions
export default journalSlice.reducer

import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '..'

export function useJournal() {
  const journalList = useSelector((state: RootState) => state.journal.journals)
  const dispatch = useDispatch()
  return { journalList, dispatch }
}
