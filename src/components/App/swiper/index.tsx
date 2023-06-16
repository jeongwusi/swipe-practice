import { useEffect, useState } from "react";
import styles from "./index.module.css";
import Card from "./card";

const Swiper = () => {
  const [cards, setCards] = useState<{ imageUrl: string }[]>([]);

  const urls = [
    "https://source.unsplash.com/random/1000x1000/?shoes",
    "https://source.unsplash.com/random/1000x1000/?shoes",
    "https://source.unsplash.com/random/1000x1000/?shoes",
    "https://source.unsplash.com/random/1000x1000/?shoes",
    "https://source.unsplash.com/random/1000x1000/?shoes",
  ];

  const appendNewCard = () => {
    const newCard = {
      imageUrl: urls[cards.length % 5],
    };

    setCards((prevCards) => [...prevCards, newCard]);
  };

  useEffect(() => {
    for (let i = 0; i < 5; i++) {
      appendNewCard();
    }
  }, []);

  return (
    <div className={styles.container}>
      {cards.map((card, index) => (
        <Card key={index} imageUrl={card.imageUrl} style={{ "--i": index }} />
      ))}
    </div>
  );
};

export default Swiper;
