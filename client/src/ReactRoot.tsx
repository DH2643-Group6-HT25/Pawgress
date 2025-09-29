import { createHashRouter, RouterProvider } from "react-router-dom";
import { WelcomePage } from "./presenters/WelcomePagePresenter";


const ReactRoot = () => 
 {
  const router = createHashRouter([
    {
      path: "/",
      element: <WelcomePage />,
    },
    {
      path: "/WelcomePage",
      element: <WelcomePage />,
    },
    
    // Add more routes as needed
  ]);

  return (
      <RouterProvider router={router} />
  );
};

export default ReactRoot;
