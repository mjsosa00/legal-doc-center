import React from 'react';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.title}>CENTRO DE DOCUMENTOS LEGALES</div>
    </header>
  );
}

export default Header;
