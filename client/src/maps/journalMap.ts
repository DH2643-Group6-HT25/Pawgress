import type { AppThunkDispatch, RootState } from '../models'
import type { Journal } from '../models/journal/journalType'
import {
  saveJournalEntry,
  fetchJournalsForUser,
  deleteJournalById,
} from '../models/journal/journalThunks'
import { find } from 'lodash/fp'

export interface JournalMaptoPropTypes {
  journals: Journal[]
  today: Journal | null
  loading: boolean
  error: string | null
  saveJournalEntry: CallableFunction
  userId?: string | null
  fetchJournalsForUser: CallableFunction
  deleteJournal: CallableFunction
}

export function mapStateToDashboardJournalProps(state: RootState) {
  const todayDate = new Date().toISOString().slice(0, 10)
  const todayJournal = find(
    (j: Journal) =>
      typeof j.date === 'string' && j.date.slice(0, 10) === todayDate,
    state.journal.journals
  ) as Journal | undefined
  return {
    journals: state.journal.journals,
    today: todayJournal || null,
    loading: state.journal.loading,
    error: state.journal.error,
  }
}

export function mapDispatchToDashboardJournalProps(dispatch: AppThunkDispatch) {
  return {
    saveJournalEntry: (data: never) => dispatch(saveJournalEntry(data)),
    fetchJournalsForUser: () => dispatch(fetchJournalsForUser()),
    deleteJournal: (id: string) => dispatch(deleteJournalById({ id })),
  }
}
