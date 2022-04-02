import React, { useState } from "react";
import styles from "./ScrollButton.module.css";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div>
      <button
        className={styles.ContentPosition}
        style={{ display: visible ? "inline" : "none" }}
        onClick={scrollToTop}
      >
        &#11014;
      </button>
    </div>
  );
};

export default ScrollButton;
