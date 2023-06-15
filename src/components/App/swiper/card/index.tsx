import styles from "./index.module.css";

interface CardProps {
  pictures: { url: string }[];
}
const Card = ({ pictures }: CardProps) => {
  return (
    <div className={styles.container}>
      {pictures.map((picture, index) => (
        <img key={index} src={picture.url} alt="sourceByUnsplash" />
      ))}
    </div>
  );
};

export default Card;
