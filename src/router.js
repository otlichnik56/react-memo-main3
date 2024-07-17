import { createBrowserRouter } from "react-router-dom";
import { GamePage } from "./pages/GamePage/GamePage";
import { LeaderboardPage } from "./pages/LeaderboardPage/LeaderboardPage";
import { SelectLevelPage } from "./pages/SelectLevelPage/SelectLevelPage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <SelectLevelPage />,
    },
    {
      path: "/leaderbord",
      element: <LeaderboardPage />,
    },
    {
      path: "/game/:pairsCount",
      element: <GamePage />,
    },
  ],
  /**
   * basename нужен для корректной работы в gh pages
   * он же указан в homepage package.json и в index.html
   */
  { basename: "/react-memo" },
);
