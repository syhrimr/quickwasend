import Image from "next/image";

import styles from "../styles/Home.module.css";

const Footer = () => {
  return (
    <footer className="flex flex-1 w-full max-h-20 py-2 border-t-1 border-solid border-[#eaeaea] justify-center items-center bg-white">
      <a className="flex grow justify-center items-center" href="/__repl" target="_blank" rel="noopener noreferrer">
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
