import { ValidationError } from 'yup';
import './ErrorMessge.css';

interface ErrorMessageProps {
  errors?: ValidationError[];
  name?: string;
  message?: string;
}

export default function ErrorMessage({
  errors,
  name,
  message,
}: ErrorMessageProps) {
  return (
    <div className="error-container">
      {errors &&
        errors.map(
          (error) =>
            error.path === name && (
              <p
                className="error-message"
                key={`${error.path}: ${error.message}`}
              >
                {error.message}
              </p>
            )
        )}
      {message && <p className="error-message">{message}</p>}
    </div>
  );
}

ErrorMessage.defaultProps = {
  errors: [],
  name: '',
  message: '',
};
