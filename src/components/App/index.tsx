import styles from "./index.module.css";
import Swiper from "./swiper";
import { IoHeart, IoHeartDislike } from "react-icons/io5";

const App = () => {
  return (
    <div className={styles.container}>
      <IoHeartDislike className={styles.dislike} name="heart-dislike" />
      <Swiper />
      <IoHeart className={styles.like} name="heart" />
    </div>
  );
};

export default App;
