import { useRef, useState } from "react";
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
  const containerRef = useRef(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const handleTouchStart = (event: React.MouseEvent | React.TouchEvent) => {
    const startX =
      "touches" in event ? event.touches[0].clientX : event.clientX;
    setStartX(startX);
    setIsSwiping(true);
  };

  const handleTouchMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isSwiping) return;
    const currentX =
      "touches" in event ? event.touches[0].clientX : event.clientX;
    const diffX = currentX - startX;
    if (containerRef.current !== null) {
      (
        containerRef.current as HTMLElement
      ).style.transform = `translateX(${diffX}px)`;
    }
  };

  const handleTouchEnd = (event: React.MouseEvent | React.TouchEvent) => {
    setIsSwiping(false);
    if (containerRef.current !== null) {
      (containerRef.current as HTMLElement).style.transform = "translateX(0)";
    }
    const threshold = 100;
    const diffX =
      startX - ("touches" in event ? event.touches[0].clientX : event.clientX);

    if (diffX > threshold && currentCardIndex < pictures.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else if (diffX < -threshold && currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  return (
    <div
      className={styles.container}
      ref={containerRef}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
    >
      {pictures.map((_, index) => (
        <Card
          key={index}
          pictures={pictures}
          currentIndex={currentCardIndex}
          cardIndex={index}
        />
      ))}
    </div>
  );
};

export default Swiper;
