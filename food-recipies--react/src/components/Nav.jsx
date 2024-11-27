import styles from "./nav.module.css";

export default function Nav() {
  return (
    <div className={styles.nav}>
      <img
        className={styles.logo}
        src="https://az.przepisy.pl/www-przepisy-pl/www.przepisy.pl/przepisy3ii/img/variants/800x0/proste-spaghetti-bolognese.jpg"
      />
      <img
        className={styles.logo}
        src="https://na-talerzu.pl/wp-content/uploads/2021/07/Kurczak-z-cukinia-i-papryka-5338-1200x795.jpg"
      />
      Luiza Playground
      <img
        className={styles.logo}
        src="https://az.przepisy.pl/www-przepisy-pl/www.przepisy.pl/przepisy3ii/img/variants/800x0/domowa-pizza748835.jpg"
      />
      <img
        className={styles.logo}
        src="https://az.przepisy.pl/www-przepisy-pl/www.przepisy.pl/przepisy3ii/img/variants/800x0/zupa_pomidorowa9016481584951161000.jpg"
      />
    </div>
  );
}
