import type { AppThunkDispatch, RootState } from '../models'
import type { Journal } from '../models/journal/journalType'
import {
  saveJournalEntry,
  fetchJournalsForUser,
  deleteJournalById,
} from '../models/journal/journalThunks'

interface JournalStateProps {
  journals: Journal[]
  today: Journal | null
}

import { find } from 'lodash/fp'
export function mapStateToDashboardJournalProps(
  state: RootState
): JournalStateProps & {
  loading: boolean
  error: string | null
  userId?: string | null
} {
  // Find today's journal using lodash/fp
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
    userId: state.user.userID,
  }
}

export function mapDispatchToDashboardJournalProps(dispatch: AppThunkDispatch) {
  return {
    saveJournalEntry: (data: never) => dispatch(saveJournalEntry(data)),
    fetchJournalsForUser: (userId: string) =>
      dispatch(fetchJournalsForUser(userId)),
    deleteJournal: (id: string, userId: string) =>
      dispatch(deleteJournalById({ id, userId })),
  }
}
