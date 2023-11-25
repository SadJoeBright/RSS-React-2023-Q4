import React, { ReactNode } from 'react';
import Header from '../Header/Header';
import styles from './RootLayout.module.css';

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <div className={styles.rootLayout}>
      <Header />
      {children}
    </div>
  );
}
