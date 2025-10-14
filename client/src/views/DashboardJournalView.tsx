
import React from 'react';
import type { Journal } from '../models/journal/journalType';
import { MenuCard } from '../components/MenuCard';
import { InsideCard, InsideCardContainer } from '../components/CardComponents';
import JournalFormik from '../components/JournalFormik';

interface Props {
  journals: Journal[];
  today: Journal | null;
}

function DashboardJournalView({ journals, today }: Props) {
  return (
    <MenuCard title="Journal" isUsingCloseButton linkCloseButton="/dashboard">
      <JournalFormik today={today} />
      <InsideCardContainer>
        <InsideCard />
      </InsideCardContainer>
    </MenuCard>
  );
}

export default DashboardJournalView;
