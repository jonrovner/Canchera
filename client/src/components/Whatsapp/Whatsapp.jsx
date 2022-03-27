import styles from "./Whatsapp.module.css";
import whatsapp from "../../assets/whatsappIcon.png";

export default function Whatsapp() {
  return (
      <div className={styles.Whatsapp}>
    <a      
      id="app-whatsapp"
      target="_blanck"
      href="https://api.whatsapp.com/send?phone=+543777679100&amp;text=Hola!&nbsp;me&nbsp;pueden&nbsp;ayudar?"
    >
      <img src={whatsapp} alt="" />
    </a>
    </div>
  );
}
