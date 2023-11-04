import { useState } from 'react';

export default function ErrorButton() {
  const [hasError, setErrorState] = useState(false);

  if (hasError) {
    throw new Error('Generated Error');
  }

  return (
    <button
      type="button"
      className="error-generator"
      onClick={() => setErrorState(true)}
    >
      Throw Error
    </button>
  );
}
