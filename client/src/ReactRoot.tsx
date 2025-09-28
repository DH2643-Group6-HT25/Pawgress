import { createHashRouter, RouterProvider } from "react-router-dom";
import WelcomePage from "./presenters/WelcomePage";
import LoginPage from "./views/LoginPage";
import SignupPage from "./views/SignupPage";

const ReactRoot = () => {
  const router = createHashRouter([
    {
      path: "/",
      element: <WelcomePage />,
    },
    {
      path: "/WelcomePage",
      element: <WelcomePage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
    // Add more routes as needed
  ]);

  return <RouterProvider router={router} />;
};

export default ReactRoot;
