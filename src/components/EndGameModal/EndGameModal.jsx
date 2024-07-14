import styles from "./EndGameModal.module.css";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { useState, useEffect } from "react";
import { getLeaders } from "../../utils/api";
import { useLeaderboard } from "../../hooks/useLeaderboard";

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, onClick }) {
  const { leaderboard, setLeaderboard } = useLeaderboard();
  const [isTopLeader, setIsTopLeader] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const gameDurationTotalSeconds = gameDurationMinutes * 60 + gameDurationSeconds;

  useEffect(() => {
    if (leaderboard && isWon) {
      getLeaders()
        .then(data => {
          setLeaderboard(data.leaders);
          const timesArray = data.leaders.map(leader => leader.time);
          const isTop = timesArray.some(time => gameDurationTotalSeconds <= time);
          setIsTopLeader(isTop);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    }
  }, [gameDurationTotalSeconds, leaderboard, setLeaderboard]);

  const title = isWon ? "Вы победили!" : "Вы проиграли!";
  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;
  const imgAlt = isWon ? "celebration emodji" : "dead emodji";



  if (error) {
    return <div className={styles.modal}>Ошибка загрузки данных: {error.message}</div>;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.tb}></div>
      <img className={styles.image} src={imgSrc} alt={imgAlt} />

      {isTopLeader ? (
        <>
          <h2 className={styles.title}>Вы понали</h2>
          <h2 className={styles.title}>на Лидерборд</h2>
          <input
            type="text"
            className={styles.input}
            placeholder="Пользователь"
          />
        </>
        ) : (
          <h2 className={styles.title}>{title}</h2>
      )}
      

      <p className={styles.description}>Затраченное время:</p>
      <div className={styles.time}>
        {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
      </div>

      <Button onClick={onClick}>Начать сначала</Button>
      {isTopLeader && (
        <>
          <Link className={styles.link} to="/leaderbord">Перейти на Лидерборд</Link>
        </>
      )}
      <div className={styles.tb}></div>
    </div>
  );
}