import { ValidationError } from 'yup';
import './ErrorMessge.css';

interface ErrorMessageProps {
  errors: ValidationError[];
  path: string;
}

export default function ErrorMessage({ errors, path }: ErrorMessageProps) {
  return (
    <div className="error-container">
      {errors.map(
        (error) =>
          error.path === path && (
            <p
              className="error-message"
              key={`${error.path}: ${error.message}`}
            >
              {error.message}
            </p>
          )
      )}
    </div>
  );
}
