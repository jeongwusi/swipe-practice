import { CSSProperties } from "react";
import styles from "./index.module.css";

interface CardProps {
  imageUrl: string;
  style: CSSProperties & { "--i": number };
}

const Card = ({ imageUrl, style }: CardProps) => {
  return (
    <div className={styles.container} style={style}>
      <img src={imageUrl} alt="Card" />
    </div>
  );
};

export default Card;
