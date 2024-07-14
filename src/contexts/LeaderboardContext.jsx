import { createContext, useState } from "react";

export const LeaderboardContext = createContext(false);

export const LeaderboardProvider = ({ children }) => {

    const [leaderboard, setLeaderboard] = useState([]);

    return (
        <LeaderboardContext.Provider value = {{ leaderboard, setLeaderboard }}>
            {children}
        </LeaderboardContext.Provider>
    );
};

