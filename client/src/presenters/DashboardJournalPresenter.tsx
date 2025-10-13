
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as journalApi from "../api/journal";
import { setJournals, addOrUpdateJournal, deleteJournal as deleteJournalAction } from "../models/journal/journalReducer";

export function DashboardJournal(userId: string) {
const journalList = useSelector((state: any) => state.journal?.journalList ?? []);	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function loadJournals(userId: string) {
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

	async function saveJournal(journal: string, formatting: any) {
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
	}

	async function removeJournal(id: string) {
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
	}

	useEffect(() => {
		if (userId) loadJournals(userId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId]);

	return {
		journals: journalList,
		loading,
		error,
		saveJournal,
		deleteJournal: removeJournal,
	};
}
