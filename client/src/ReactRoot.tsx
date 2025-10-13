import { createHashRouter, RouterProvider, Outlet } from "react-router";
import { Provider } from "react-redux";
import LayoutWrapper from "./components/Wrappers/LayoutWrapper";
import { WelcomePage } from "./presenters/WelcomePagePresenter";
import { DashboardPage } from "./presenters/DashboardPagePresenter";
import JournalPagePresenter from "./presenters/JournalPagePresenter";
//import DashboardJournalView from "./views/DashboardJournalView";
import { DashboardHistory } from "./presenters/DashboardHistoryPresenter";
import { DashboardAffirmation } from "./presenters/DashboardAffirmationPresenter";
import { DashboardGuide } from "./presenters/DashboardGuidePresenter";
import { LoginPage } from "./presenters/LoginPagePresenter"; 
import { SignupPage } from "./presenters/SignupPagePresenter"; 
import LoadingPage from "./views/LoadingPageView";
import SuspenseView from "./views/SuspenseView";
import { OnboardingPage } from "./presenters/OnboardingPagePresenter";
import { store } from "./models";

function Layout() {
  return (
    <LayoutWrapper>
      <Outlet />
    </LayoutWrapper>
  );
}

const ReactRoot = () => {
  const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <WelcomePage /> },
        {
          path: "register",
          element: <div>register</div>, //change to the correct presenter
        },
        {
          path: "login",
          element: <LoginPage />, 
        },
        {
          path: "signup",
          element: <SignupPage />, 
        },
        {
          path: "loading",
          element: <LoadingPage />, // <-- use your loading page component here
        },
        {
          path: "onsuspense",
          element: <SuspenseView />, //TODO: delete it after finishing dashboard
        },
        {
          path: "onboarding",
          element: <OnboardingPage />,
        },
        {
          path: "dashboard",
          element: <DashboardPage />,
          children: [
            { path: "journal", element: <JournalPagePresenter /> },
            { path: "history", element: <DashboardHistory /> },
            { path: "affirmation", element: <DashboardAffirmation /> },
            { path: "guide", element: <DashboardGuide /> },
            // { path: "fish", element: <DashboardJournal /> },
          ],
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default ReactRoot;
