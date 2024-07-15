import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LeaderboardPage.module.css";
import { getLeaders } from "../../utils/api";
import { formatSecondsToMMSS } from "../../utils/util";

export function LeaderboardPage() {

  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const mockLeaders = {
    "leaders": [
      { "id": 1, "name": "Великий маг", "time": 8000 },
      { "id": 2, "name": "Карточный мастер", "time": 12000 },
      { "id": 3, "name": "Гениальный игрок", "time": 31000 }
    ]
  };

  /**
  useEffect(() => {
    setLeaderboard(mockLeaders.leaders);
    setLoading(false);
  }, []);*/

  
  useEffect(() => {
    getLeaders()
      .then(data => {
        setLeaderboard(data.leaders);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleStartGame = () => {
    navigate("/");
  };

  if (loading) {
    return <div className={styles.container}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.container}>Ошибка загрузки данных: {error.message}</div>;
  }

  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <h1>Лидерборд</h1>
            <button className={styles.startButton} onClick={handleStartGame}>
                Начать игру
            </button>
        </div>

        <table className={styles.table}>
            <thead>
            <tr className={styles.headerRow}>
                <th>Позиция</th>
                <th>Пользователь</th>
                <th>Время</th>
            </tr>
            </thead>
            <tbody>
            {leaderboard.map((entry, index) => (
                <tr key={entry.id} className={styles.row}>
                    <td>#{index + 1}</td>
                    <td>{entry.name}</td>
                    <td>{formatSecondsToMMSS(entry.time)}</td>
                </tr>
            ))}
            </tbody>
        </table>      
    </div>
  );
}

