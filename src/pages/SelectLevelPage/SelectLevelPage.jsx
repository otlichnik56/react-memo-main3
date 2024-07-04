import { Link } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { useEasyMode } from "../../hooks/useEasyMode";

export function SelectLevelPage() {

  const { easyMode, setEasyMode } = useEasyMode();

  const handleEasyModeChange = event =>{
    setEasyMode(event.target.checked);
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <ul className={styles.levels}>
          <li className={styles.level}>
            <Link className={styles.levelLink} to="/game/3">
              1
            </Link>
          </li>
          <li className={styles.level}>
            <Link className={styles.levelLink} to="/game/6">
              2
            </Link>
          </li>
          <li className={styles.level}>
            <Link className={styles.levelLink} to="/game/9">
              3
            </Link>
          </li>
        </ul>
        <label htmlFor="">
          <input type="checkbox" onChange={handleEasyModeChange} checked={easyMode} />
          <span className={styles.mode} >Легкий режим</span>
        </label>
      </div>
    </div>
  );
}
