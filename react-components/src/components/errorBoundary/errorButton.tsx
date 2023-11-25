import { useState } from 'react';
import styles from './errorButton.module.css';

export default function ErrorButton() {
  const [hasError, setErrorState] = useState(false);

  if (hasError) {
    throw new Error('Generated Error');
  }

  return (
    <button
      type="button"
      className={styles.errorButton}
      onClick={() => setErrorState(true)}
    >
      Throw Error
    </button>
  );
}
