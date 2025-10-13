
import { DashboardJournal } from '../presenters/DashboardJournalPresenter';
import { useState } from 'react';
import { MenuCard } from '../components/MenuCard';
import JournalFormik from '../components/JournalFormik';
import { InsideCard, InsideCardContainer, InsideCardText } from '../components/CardComponents';
import type { Journal } from '../api/journal';

const userId = "demo-user"; // Ersätt med faktisk inloggad användare

function DashboardJournalView() {
  const { journals, loading, error, saveJournal, deleteJournal } = DashboardJournal(userId);
  const [editing, setEditing] = useState(false);

  // Hämta dagens journal (eller skapa ny)
  const today = new Date().toISOString().slice(0, 10);
  const todaysJournal = journals.find((j: Journal) => j.date.slice(0, 10) === today);

  return (
    <MenuCard title='Journal' isUsingCloseButton linkCloseButton='/dashboard'>
      <JournalFormik
        userId={userId}
        initialValue={todaysJournal?.journal || ''}
        onSave={async (text: string, formatting: any) => {
          await saveJournal(text, formatting);
          setEditing(false);
        }}
      />
      {loading && <p>Laddar...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <InsideCardContainer>
        {journals.map((j: Journal) => (
          <InsideCard key={j._id}>
            <InsideCardText>
              <b>{new Date(j.date).toLocaleDateString()}</b>: {j.journal}
            </InsideCardText>
            <button onClick={() => deleteJournal(j._id)}>Radera</button>
          </InsideCard>
        ))}
      </InsideCardContainer>
    </MenuCard>
  );
}

export default DashboardJournalView;
