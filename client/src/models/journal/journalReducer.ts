import { createSlice } from '@reduxjs/toolkit';
import type { Journal } from '../../api/journal';

interface JournalState {
	journalList: Array<Journal>;
}

const initialState: JournalState = {
	journalList: [],
};

export const journalSlice = createSlice({
	name: 'journal',
	initialState,
	reducers: {
		setJournals(state, action) {
			state.journalList = action.payload;
		},
		addOrUpdateJournal(state, action) {
			const idx = state.journalList.findIndex(j => j._id === action.payload._id);
			if (idx !== -1) {
				state.journalList[idx] = action.payload;
			} else {
				state.journalList.unshift(action.payload);
			}
		},
		deleteJournal(state, action) {
			state.journalList = state.journalList.filter(j => j._id !== action.payload);
		},
	},
});
export const { setJournals, addOrUpdateJournal, deleteJournal } = journalSlice.actions;
export default journalSlice.reducer;

import { useSelector, useDispatch } from 'react-redux';

// Custom hook to access journal state and dispatch
export function useJournal() {
	const journalList = useSelector((state: any) => state.journal.journalList);
	const dispatch = useDispatch();
	return { journalList, dispatch };
}


