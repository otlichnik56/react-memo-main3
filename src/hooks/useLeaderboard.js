import { useContext } from "react";
import { LeaderboardContext } from "../contexts/LeaderboardContext";

export const useLeaderboard = () => {
    return useContext(LeaderboardContext);
}