import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useEasyMode } from "../../hooks/useEasyMode";
import { useLeaderboard } from "../../hooks/useLeaderboard";

export function SelectLevelPage() {
  const { easyMode, setEasyMode } = useEasyMode();
  const { leaderboard, setLeaderboard } = useLeaderboard(false);
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState(1); // уровень по умолчанию - 1

  
  useEffect(() => {
    console.log("Leaderboard state updated:", leaderboard);
  }, [leaderboard]);

  const handleEasyModeChange = (event) => {
    setEasyMode(event.target.checked);
  };

  const handleLevelChange = (level) => {
    setSelectedLevel(level);
    if (level === 3) {
      setLeaderboard(true);
    } else {
      setLeaderboard(false);
    }
  };

  const handlePlayButtonClick = () => {
    navigate(`/game/${selectedLevel * 3}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <ul className={styles.levels}>
          <li className={styles.level}>
            <button
              className={selectedLevel === 1 ? styles.selectedButton : styles.levelButton}
              onClick={() => handleLevelChange(1)}
            >
              1
            </button>
          </li>
          <li className={styles.level}>
            <button
              className={selectedLevel === 2 ? styles.selectedButton : styles.levelButton}
              onClick={() => handleLevelChange(2)}
            >
              2
            </button>
          </li>
          <li className={styles.level}>
            <button
              className={selectedLevel === 3 ? styles.selectedButton : styles.levelButton}
              onClick={() => handleLevelChange(3)}
            >
              3
            </button>
          </li>
        </ul>
        <label>
          <input type="checkbox" onChange={handleEasyModeChange} checked={easyMode} />
          <span className={styles.mode}>Легкий режим (3 жизни)</span>
        </label>
        <button className={styles.playButton} onClick={handlePlayButtonClick}>
          Играть
        </button>
        <Link className={styles.levelLink} to="/leaderbord">
          Перейти к лидерборду
        </Link>
      </div>
    </div>
  );
}