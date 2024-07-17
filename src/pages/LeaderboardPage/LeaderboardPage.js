import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LeaderboardPage.module.css";
import { getLeaders } from "../../utils/api";
import { formatSecondsToMMSS } from "../../utils/util";
import imageUrl1 from "./images/1.png";
import imageUrl2 from "./images/2.png";

export function LeaderboardPage() {

  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    getLeaders()
      .then(data => {
        const sortedLeaders = data.leaders.sort((a, b) => a.time - b.time);
        setLeaderboard(sortedLeaders);
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

  const getAchievementStyles = (achievements) => {
    if (achievements.includes(1) && achievements.includes(2)) {
      return { image1: {}, image2: {} };
    } else if (achievements.includes(1)) {
      return { image1: {}, image2: { opacity: 0.1 } };
    } else if (achievements.includes(2)) {
      return { image1: { opacity: 0.1 }, image2: {} };
    } else {
      return { image1: { opacity: 0.1 }, image2: { opacity: 0.1 } };
    }
  };

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
                <th>Достижения</th>
                <th>Время</th>
            </tr>
            </thead>
            <tbody>
            {leaderboard.map((entry, index) => {
              const styles = getAchievementStyles(entry.achievements);
              return (
                <tr key={entry.id} className={styles.row}>
                    <td>#{index + 1}</td>
                    <td>{entry.name}</td>
                    <td>
                        <div>
                        <img src={imageUrl1} style={styles.image1} />
                        <img src={imageUrl2} style={styles.image2} />
                        </div>
                    </td>
                    <td>{formatSecondsToMMSS(entry.time)}</td>
                </tr>
              );
            })}
            </tbody>
        </table>      
    </div>
  );
}