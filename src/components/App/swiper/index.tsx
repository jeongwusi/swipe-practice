import { useState } from "react";
import styles from "./index.module.css";
import Card from "./card";

const Swiper = () => {
  const [pictures, setPictures] = useState([
    {
      url: "https://source.unsplash.com/random/1000x1000/?shoes",
    },
    {
      url: "https://source.unsplash.com/random/1000x1000/?shoes",
    },
  ]);
  return (
    <div className={styles.container}>
      <Card pictures={pictures} />
    </div>
  );
};

export default Swiper;
