import { connect } from 'react-redux';
import DashboardJournalView from '../views/DashboardJournalView';
import { mapStateToDashboardJournalProps, mapDispatchToDashboardJournalProps } from '../maps/journalMap';

export const DashboardJournal = connect(
  mapStateToDashboardJournalProps,
  mapDispatchToDashboardJournalProps
)(DashboardJournalView);
