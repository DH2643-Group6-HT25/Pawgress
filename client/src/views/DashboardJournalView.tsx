import { useEffect } from 'react'
import { MenuCard } from '../components/MenuCard'
import JournalFormik from '../components/Journal/JournalFormik'
import JournalHistory from '../components/Journal/JournalHistory'
import type { Journal } from '../models/journal/journalType'

interface Props {
  journals: Journal[]
  today: Journal | null
  loading: boolean
  error: string | null
  saveJournalEntry: CallableFunction
  userId?: string | null
  fetchJournalsForUser?: (userId: string) => void
  deleteJournal: CallableFunction
}

function DashboardJournalView({
  journals,
  today,
  loading,
  error,
  saveJournalEntry,
  userId,
  fetchJournalsForUser,
  deleteJournal,
}: Props) {
  useEffect(() => {
    if (userId && fetchJournalsForUser) {
      fetchJournalsForUser(userId)
    }
  }, [userId, fetchJournalsForUser])

  const handleDelete = async (id: string) => {
    if (!userId) return
    await deleteJournal(id, userId)
    if (fetchJournalsForUser) fetchJournalsForUser(userId)
  }

  return (
    <MenuCard title="Journal" isUsingCloseButton linkCloseButton="/dashboard">
      <JournalFormik
        userId={userId || undefined}
        today={today}
        loading={loading}
        error={error}
        saveJournalEntry={saveJournalEntry}
      />
      <JournalHistory journals={journals} onDelete={handleDelete} />
    </MenuCard>
  )
}

export default DashboardJournalView
