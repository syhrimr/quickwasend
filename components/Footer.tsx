import Image from "next/image";

import styles from "../styles/Home.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a href="/__repl" target="_blank" rel="noopener noreferrer">
        Built on
        <span className={styles.logo}>
          <Image src="/replit.svg" alt="Replit Logo" width={20} height={18} />
        </span>
        Replit
      </a>
    </footer>
  );
};

export default Footer;
