import type { RootState } from '../models';
import type { Journal } from '../models/journal/journalType';

interface JournalStateProps {
  journals: Journal[];
  today: Journal | null;
}

export function mapStateToDashboardJournalProps(state: RootState): JournalStateProps {
  return {
    journals: state.journal.journals,
    today: state.journal.today,
  };
}
