import type { Journal } from '../models/journal/journalType';
import { MenuCard } from '../components/MenuCard';
import JournalFormik from '../components/JournalFormik';
import moment from 'moment';
import { JournalListContainer, InsideCard, InsideCardText } from '../components/CardComponents';
import { useEffect } from 'react';

interface Props {
  journals: Journal[];
  today: Journal | null;
  loading: boolean;
  error: string | null;
  saveJournalEntry: (data: any) => void;
  userId?: string | null;
  fetchJournalsForUser?: (userId: string) => void;
}

// Helper to render formatted text (basic bold/italic/underline)
function renderFormattedText(journal: Journal) {
  return <span dangerouslySetInnerHTML={{ __html: journal.journal }} />;
}

function JournalHistoryList({ journals }: { journals: Journal[] }) {
  return (
    <JournalListContainer>
      {journals.map((j: Journal) => (
        <InsideCard key={j._id}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{moment(j.date).format('DD/MM/YYYY')}</div>
            {j.imageUrl && (
              <img
                src={j.imageUrl}
                alt="journal"
                style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 12, border: '1px solid #ccc', background: 'repeating-conic-gradient(#eee 0% 25%, #fff 0% 50%) 50% / 20px 20px' }}
              />
            )}
          </div>
          <InsideCardText>{renderFormattedText(j)}</InsideCardText>
        </InsideCard>
      ))}
    </JournalListContainer>
  );
}

function DashboardJournalView({ journals, today, loading, error, saveJournalEntry, userId, fetchJournalsForUser }: Props & { fetchJournalsForUser?: (userId: string) => void }) {
  useEffect(() => {
    if (userId && fetchJournalsForUser) {
      fetchJournalsForUser(userId);
    }
  }, [userId, fetchJournalsForUser]);

  return (
    <MenuCard title="Journal" isUsingCloseButton linkCloseButton="/dashboard">
      <JournalFormik userId={userId || undefined} today={today} loading={loading} error={error} saveJournalEntry={saveJournalEntry} />
      <JournalHistoryList journals={journals} />
    </MenuCard>
  );
}

export default DashboardJournalView;

