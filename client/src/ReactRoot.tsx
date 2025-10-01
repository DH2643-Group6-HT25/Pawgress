import { createHashRouter, RouterProvider, Outlet } from 'react-router'
import LayoutWrapper from './components/Wrappers/LayoutWrapper'
import { WelcomePage } from './presenters/WelcomePagePresenter'
import { DashboardPage } from './presenters/DashboardPagePresenter'
import { DashboardJournal } from './presenters/DashboardJournalPresenter'
import { DashboardHistory } from './presenters/DashboardHistoryPresenter'
import { DashboardAffirmation } from './presenters/DashboardAffirmationPresenter'
import { DashboardGuide } from './presenters/DashboardGuidePresenter'
import LoginPage from './views/LoginPageView' // <-- add this import

function Layout() {
  return (
    <LayoutWrapper>
      <Outlet />
    </LayoutWrapper>
  )
}

const ReactRoot = () => {
  const router = createHashRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '', element: <WelcomePage /> },
        {
          path: 'register',
          element: <div>register</div>, //change to the correct presenter
        },
        {
          path: 'login',
          element: <LoginPage />, // <-- use your login page component here
        },
        {
          path: 'dashboard',
          element: <DashboardPage />,
          children: [
            { path: 'journal', element: <DashboardJournal /> },
            { path: 'history', element: <DashboardHistory /> },
            { path: 'affirmation', element: <DashboardAffirmation /> },
            { path: 'guide', element: <DashboardGuide /> },
          ],
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default ReactRoot
