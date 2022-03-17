import { useState } from "react";
import styles from "./Slider.module.scss";
import img1 from "../../assets/1.jpg";
import img2 from "../../assets/2.jpg";
import img3 from "../../assets/3.png";
import img4 from "../../assets/4.jpg";
import arrow from "../../assets/arrow.png";

const Slider = () => {
  const [currentSlider, setCurrentSlider] = useState(0);
  const data = [
    {
      id: 1,
      img: img1,
    },
    {
      id: 2,
      img: img2,
    },
    {
      id: 3,
      img: img3,
    },
    {
      id: 4,
      img: img4,
    },
  ];

  console.log(currentSlider);
  const handleOnClick = (way) => {
    way === "left"
      ? setCurrentSlider(currentSlider > 0 ? currentSlider - 1 : 3)
      : setCurrentSlider(
          currentSlider < data.length - 1 ? currentSlider + 1 : 0
        );
  };

  return (
    <div className={styles.sliderContainer}>
      <div
        className={styles.Slider}
        style={{ transform: `translateX(-${currentSlider * 100}vw)` }}
      >
        {data.map((d) => (
          <div className={styles.container} key={d.id}>
            <div className={styles.imgContainer}>
              <img src={d.img} alt="img not found" />
            </div>
          </div>
        ))}
      </div>
      <img
        src={arrow}
        alt="img not found"
        className={styles.arrowLeft}
        onClick={() => handleOnClick("left")}
      />
      <img
        src={arrow}
        alt="img not found"
        className={styles.arrowRight}
        onClick={() => handleOnClick()}
      />
    </div>
  );
};

export default Slider;
