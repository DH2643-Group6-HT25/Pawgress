import { createHashRouter, RouterProvider, Outlet } from 'react-router'
import { WelcomePage } from './presenters/WelcomePagePresenter'
import LayoutWrapper from './components/LayoutWrapper'

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
          element: <div>register</div>,
        },
        {
          path: 'login',
          element: <div>login</div>,
        },
        {
          path: 'dashboard',
          children: [
            {
              path: '',
              element: <div>dashboard root</div>,
            },
            {
              path: 'journal',
              element: <div>dashboard journal</div>,
            },
            {
              path: 'history',
              element: <div>dashboard history</div>,
            },
            {
              path: 'affirmation',
              element: <div>dashboard affirmation</div>,
            },
            {
              path: 'guide',
              element: <div>dashboard guide</div>,
            },
          ],
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default ReactRoot
