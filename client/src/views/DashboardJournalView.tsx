

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MenuCard } from '../components/MenuCard';
import JournalFormik from '../components/Journal/JournalFormik';
import JournalHistory from '../components/Journal/JournalHistory';
import { deleteJournalById } from '../models/journal/journalThunks';
import type { Journal } from '../models/journal/journalType';

interface Props {
  journals: Journal[];
  today: Journal | null;
  loading: boolean;
  error: string | null;
  saveJournalEntry: (data: any) => void;
  userId?: string | null;
  fetchJournalsForUser?: (userId: string) => void;
}

function DashboardJournalView({ journals, today, loading, error, saveJournalEntry, userId, fetchJournalsForUser }: Props) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId && fetchJournalsForUser) {
      fetchJournalsForUser(userId);
    }
  }, [userId, fetchJournalsForUser]);

  const handleDelete = async (id: string) => {
    if (!userId) return;
    await dispatch(deleteJournalById({ id, userId }) as any);
    if (fetchJournalsForUser) fetchJournalsForUser(userId);
  };

  return (
    <MenuCard title="Journal" isUsingCloseButton linkCloseButton="/dashboard">
      <JournalFormik userId={userId || undefined} today={today} loading={loading} error={error} saveJournalEntry={saveJournalEntry} />
      <JournalHistory journals={journals} onDelete={handleDelete} />
    </MenuCard>
  );
}

export default DashboardJournalView;

