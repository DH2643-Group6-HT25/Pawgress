import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as journalApi from "../api/journal";
import { setJournals, addOrUpdateJournal, deleteJournal as deleteJournalAction } from "../models/journal/journalReducer";
import JournalPageView from "../views/JournalPageView";

const userId = "demo-user"; // Ersätt med faktisk inloggad användare

const JournalPagePresenter = () => {
  const journalList = useSelector((state: any) => state.journal?.journalList ?? []);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadJournals() {
      setLoading(true);
      setError(null);
      try {
        const data = await journalApi.getJournalsForUser(userId);
        dispatch(setJournals(data));
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    loadJournals();
  }, [dispatch]);

  const saveJournal = async (journal: string, formatting: any) => {
    setLoading(true);
    setError(null);
    try {
      const data = await journalApi.upsertTodayJournal(journal, formatting, userId);
      dispatch(addOrUpdateJournal(data));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const removeJournal = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await journalApi.deleteJournal(id);
      dispatch(deleteJournalAction(id));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <JournalPageView
      journals={journalList}
      loading={loading}
      error={error}
      saveJournal={saveJournal}
      deleteJournal={removeJournal}
      userId={userId}
    />
  );
};

export default JournalPagePresenter;
