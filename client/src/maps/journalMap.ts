import type { RootState } from '../models';
import type { Journal } from '../models/journal/journalType';
import { saveJournalEntry, fetchJournalsForUser } from '../models/journal/journalThunks';

interface JournalStateProps {
  journals: Journal[];
  today: Journal | null;
}


export function mapStateToDashboardJournalProps(state: RootState): JournalStateProps & { loading: boolean; error: string | null; userId?: string | null } {
  return {
    journals: state.journal.journals,
    today: state.journal.today,
    loading: state.journal.loading,
    error: state.journal.error,
    userId: state.user.userID,
  };
}

export function mapDispatchToDashboardJournalProps(dispatch: any) {
  return {
    saveJournalEntry: (data: any) => dispatch(saveJournalEntry(data)),
    fetchJournalsForUser: (userId: string) => dispatch(fetchJournalsForUser(userId)),
  };
}
