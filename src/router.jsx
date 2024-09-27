import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import Tutorial from "./pages/TutorialPage";
import PlayPage from "./pages/PlayPage";
import WordsListPage from "./pages/WordsListPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "play",
        element: <PlayPage />,
      },
      {
        path: "tutorial",
        element: <Tutorial />,
      },
      {
        path: "words-list",
        element: <WordsListPage />,
      },
    ],
  },
]);

export default router;
