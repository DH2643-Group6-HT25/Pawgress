import { connect } from 'react-redux'
import DashboardJournalView from '../views/DashboardJournalView'
import {
  mapStateToDashboardJournalProps,
  mapDispatchToDashboardJournalProps,
  type JournalMaptoPropTypes,
} from '../maps/journalMap'
import { useEffect, useRef } from 'react'

function DashboardJournalPresenter({
  loading,
  fetchJournalsForUser,
  userId,
  ...props
}: JournalMaptoPropTypes) {
  const initialRender = useRef(true)
  useEffect(() => {
    if (initialRender.current && !loading) {
      fetchJournalsForUser(userId)
      initialRender.current = false
    }
  }, [loading, userId, fetchJournalsForUser])

  return (
    <DashboardJournalView
      {...props}
      loading={loading}
      userId={userId}
      fetchJournalsForUser={fetchJournalsForUser}
    />
  )
}

export const DashboardJournal = connect(
  mapStateToDashboardJournalProps,
  mapDispatchToDashboardJournalProps
)(DashboardJournalPresenter)
