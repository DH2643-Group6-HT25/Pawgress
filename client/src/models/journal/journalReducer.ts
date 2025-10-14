import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Journal } from './journalType';

interface JournalState {
  journals: Journal[];
  today: Journal | null;
}

const initialState: JournalState = {
  journals: [],
  today: null,
};

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    setJournals: (state, action: PayloadAction<Journal[]>) => {
      state.journals = action.payload;
    },
    setTodayJournal: (state, action: PayloadAction<Journal | null>) => {
      state.today = action.payload;
    },
  },
});

export const { setJournals, setTodayJournal } = journalSlice.actions;
export default journalSlice.reducer;

import { useSelector, useDispatch } from 'react-redux';

// Custom hook to access journal state and dispatch
export function useJournal() {
  const journalList = useSelector((state: any) => state.journal.journals);
  const dispatch = useDispatch();
  return { journalList, dispatch };
}