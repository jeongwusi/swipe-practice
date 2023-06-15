import styles from "./index.module.css";

interface CardProps {
  pictures: { url: string }[];
  currentIndex: number;
  cardIndex: number;
}

const Card = ({ pictures, currentIndex, cardIndex }: CardProps) => {
  const isActive = currentIndex === cardIndex;
  return (
    <div className={`${styles.container} ${isActive ? styles.active : ""}`}>
      {pictures.map((picture, index) => (
        <img
          key={index}
          src={picture.url}
          alt="sourceByUnsplash"
          style={{ display: isActive ? "block" : "none" }}
        />
      ))}
    </div>
  );
};

export default Card;
