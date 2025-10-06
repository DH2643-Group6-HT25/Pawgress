import { createHashRouter, RouterProvider, Outlet } from 'react-router'
import { Provider } from 'react-redux'
import LayoutWrapper from './components/Wrappers/LayoutWrapper'
import { WelcomePage } from './presenters/WelcomePagePresenter'
import { DashboardPage } from './presenters/DashboardPagePresenter'
import { DashboardJournal } from './presenters/DashboardJournalPresenter'
import { DashboardHistory } from './presenters/DashboardHistoryPresenter'
import { DashboardAffirmation } from './presenters/DashboardAffirmationPresenter'
import { DashboardGuide } from './presenters/DashboardGuidePresenter'
import LoginPage from './views/LoginPageView' // <-- add this import
import SignupPage from './views/SignupPageView' // <-- add this import
import LoadingPage from './views/LoadingPageView'
import { store } from './models'

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
          path: 'signup',
          element: <SignupPage />, // <-- use your signup page component here
        },
        {
          path: 'loading',
          element: <LoadingPage />, // <-- use your loading page component here
        },
        {
          path: 'dashboard',
          element: <DashboardPage />,
          children: [
            { path: 'journal', element: <DashboardJournal /> },
            { path: 'history', element: <DashboardHistory /> },
            { path: 'affirmation', element: <DashboardAffirmation /> },
            { path: 'guide', element: <DashboardGuide /> },
            { path: 'fish', element: <DashboardJournal /> },
          ],
        },
      ],
    },
  ])

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default ReactRoot
