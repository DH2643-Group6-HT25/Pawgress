import React from 'react';
import { connect } from 'react-redux';
import DashboardJournalView from '../views/DashboardJournalView';
import type { Journal } from '../models/journal/journalType';
import { mapStateToDashboardJournalProps } from '../maps/journalMap';

interface PropTypes {
	journals: Journal[];
	today: Journal | null;
}

const DashboardJournalPresenter: React.FC<PropTypes> = (props) => {
	// Add logic here for loading, error, etc. if needed
	return <DashboardJournalView {...props} />;
};

export const DashboardJournal = connect(mapStateToDashboardJournalProps)(DashboardJournalPresenter);
