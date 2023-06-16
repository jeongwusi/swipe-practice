import { CSSProperties, useEffect, useRef, useState } from "react";
import styles from "./index.module.css";

interface CardProps {
  imageUrl: string;
  style: CSSProperties & { "--i": number };
}

const Card = ({ imageUrl, style }: CardProps) => {
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(
    null
  );
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [rotate, setRotate] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (x: number, y: number) => {
    if (!startPoint) return;

    const newOffsetX = x - startPoint.x;
    const newOffsetY = y - startPoint.y;
    const newRotate = newOffsetX * 0.1;
    setOffsetX(newOffsetX);
    setOffsetY(newOffsetY);
    setRotate(newRotate);

    if (
      cardRef.current &&
      Math.abs(newOffsetX) > cardRef.current.clientWidth * 0.7
    ) {
      dismiss(newOffsetX > 0 ? 1 : -1);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();

    if (!startPoint) return;

    const { clientX, clientY } = e;
    handleMove(clientX, clientY);
  };

  const handleMoveUp = () => {
    setStartPoint(null);

    document.removeEventListener("mousemove", handleMouseMove);

    setOffsetX(0);
    setOffsetY(0);
  };

  const dismiss = (direction: number) => {
    setStartPoint(null);

    document.removeEventListener("mouseup", handleMoveUp);
    document.removeEventListener("mousemove", handleMouseMove);

    if (cardRef.current !== null) {
      cardRef.current.style.transition = "transform 1s";
      cardRef.current.style.transform = `translate(${
        direction * window.innerWidth
      }px, ${offsetY}px) rotate(${90 * direction}deg)`;
      cardRef.current.classList.add("dismissing");
    }

    setTimeout(() => {
      cardRef.current?.remove();
    }, 1000);
  };

  const listenToEvents = () => {
    cardRef.current?.addEventListener("mousedown", (e) => {
      const { clientX, clientY } = e;

      setStartPoint({ x: clientX, y: clientY });

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMoveUp);
      if (cardRef.current !== null)
        cardRef.current.style.transition = "transform 0s";
    });

    cardRef.current?.addEventListener("dragstart", (e) => {
      e.preventDefault();
    });
  };

  useEffect(() => {
    listenToEvents();
  }, [listenToEvents]);

  return (
    <div ref={cardRef} className={styles.container} style={style}>
      <img src={imageUrl} alt="Card" />
    </div>
  );
};

export default Card;
