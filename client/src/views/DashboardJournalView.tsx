import { MenuCard } from '../components/MenuCard'
import JournalFormik from '../components/Journal/JournalFormik'
import JournalHistory from '../components/Journal/JournalHistory'
import type { JournalMaptoPropTypes } from '../maps/journalMap'

function DashboardJournalView({
  journals,
  today,
  loading,
  error,
  saveJournalEntry,
  userId,
  fetchJournalsForUser,
  deleteJournal,
}: JournalMaptoPropTypes) {
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
