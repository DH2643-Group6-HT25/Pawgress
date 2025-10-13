import React from "react";
import type { Journal } from "../api/journal";

interface JournalPageViewProps {
  journals: Journal[];
  loading: boolean;
  error: string | null;
  saveJournal: (journal: string, formatting: any) => void;
  deleteJournal: (id: string) => void;
  userId: string;
}

const JournalPageView: React.FC<JournalPageViewProps> = ({
  journals,
  loading,
  error,
  saveJournal,
  deleteJournal,
  userId,
}) => {
  return (
    <div>
      <h2>Journaler för {userId}</h2>
      {loading && <p>Laddar...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {journals.map((j) => (
          <li key={j._id}>
            <div dangerouslySetInnerHTML={{ __html: j.journal }} />
            <button onClick={() => deleteJournal(j._id)}>Ta bort</button>
          </li>
        ))}
      </ul>
      {/* Här kan du lägga till formulär för att skapa/uppdatera journal */}
      {/* <JournalFormik onSubmit={saveJournal} /> */}
    </div>
  );
};

export default JournalPageView;
