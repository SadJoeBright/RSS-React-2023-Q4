import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ValidationError } from 'yup';
import validationSchema from '../../utils/validation';
import CountryAutocomplete from '../CountryAutocomplete/CountryAutocomplete';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import readFile from '../../utils/fileReader';
import { AppDispatch } from '../../store/store';
import { IFormData, setFormData } from '../../store/formDataSlice';
import './Form.css';

export default function UncontrolledForm() {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const maleRef = useRef<HTMLInputElement>(null);
  const femaleRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const termsAndConditionsRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const [passwordStrength, setPasswordStrength] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dataToValidate = {
      name: nameRef.current?.value,
      age: Number(ageRef.current?.value),
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      country: countryRef.current?.value,
      gender: (maleRef.current?.checked ? 'male' : femaleRef.current?.checked)
        ? 'female'
        : null,
      image: imageRef.current?.files,
      termsAndConditions: termsAndConditionsRef.current?.checked,
    };

    const { password } = dataToValidate;
    if (password) {
      if (password.length >= 8) {
        setPasswordStrength('strong');
      } else if (password.length >= 6) {
        setPasswordStrength('moderate');
      } else if (password.length) {
        setPasswordStrength('weak');
      }
    }

    validationSchema
      .validate(dataToValidate, { abortEarly: false })

      .then(() => {
        const imageFile = dataToValidate.image;
        if (imageFile) {
          return readFile(imageFile[0]);
        }
        return null;
      })

      .then((result) => {
        const validData = {
          ...dataToValidate,
          image: result as string,
        };
        dispatch(setFormData(validData as unknown as IFormData));
        navigate('/');
      })

      .catch((validationErrors: ValidationError) => {
        setErrors(validationErrors.inner);
      });

    setErrors([]);
  };

  return (
    <>
      <Link className="back-link" to="/">
        Back to main page
      </Link>
      <form noValidate className="form" onSubmit={handleSubmit}>
        <h3 className="form__heading">Uncontrolled Form</h3>
        <label className="label-text-input" htmlFor="name">
          <span>Name</span>
          <input
            ref={nameRef}
            className={`text-input ${
              errors.some((error) => error.path === 'name') && 'invalid'
            }`}
            type="text"
            name="name"
            id="name"
            placeholder="Name"
          />
          <ErrorMessage errors={errors} name="name" />
        </label>
        <label className="label-text-input" htmlFor="age">
          <span>Age</span>
          <input
            ref={ageRef}
            className={`text-input ${
              errors.some((error) => error.path === 'age') && 'invalid'
            }`}
            type="number"
            name="age"
            id="age"
            placeholder="age"
          />
          <ErrorMessage errors={errors} name="age" />
        </label>
        <label className="label-text-input" htmlFor="email">
          <span>E-mail</span>
          <input
            ref={emailRef}
            className={`text-input ${
              errors.some((error) => error.path === 'email') && 'invalid'
            }`}
            type="email"
            name="email"
            id="email"
            placeholder="email"
          />
          <ErrorMessage errors={errors} name="email" />
        </label>
        <label className="label-text-input" htmlFor="password">
          <span>Password</span>
          <input
            ref={passwordRef}
            className={`text-input ${
              errors.some((error) => error.path === 'password') && 'invalid'
            }`}
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
          <div className="password-strength-container">
            {passwordStrength && (
              <p className={`${passwordStrength}-password`}>
                {passwordStrength} password
              </p>
            )}
          </div>
          <ErrorMessage errors={errors} name="password" />
        </label>
        <label className="label-text-input" htmlFor="confirm-password">
          <span>Confirm password</span>
          <input
            ref={confirmPasswordRef}
            className={`text-input ${
              errors.some((error) => error.path === 'confirmPassword') &&
              'invalid'
            }`}
            type="password"
            name="confirm-password"
            id="confirm-password"
            placeholder="confirm password"
          />
          <ErrorMessage errors={errors} name="confirmPassword" />
        </label>

        <fieldset>
          <legend>
            <span> Gender</span>
          </legend>
          <label className="label-radio" htmlFor="male">
            <input
              ref={maleRef}
              className="input-radio"
              type="radio"
              id="male"
              name="gender"
            />
            Male
          </label>
          <label className="label-radio" htmlFor="female">
            <input
              ref={femaleRef}
              className="input-radio"
              type="radio"
              id="female"
              name="gender"
            />
            Female
          </label>
          <ErrorMessage errors={errors} name="gender" />
        </fieldset>

        <CountryAutocomplete
          countryInput={
            <input
              ref={countryRef}
              className={`text-input ${
                errors.some((error) => error.path === 'country') && 'invalid'
              }`}
              type="text"
              placeholder="Country"
              name="country"
            />
          }
        />
        <ErrorMessage errors={errors} name="country" />

        <input ref={imageRef} type="file" accept="image/jpeg, image/png" />
        <ErrorMessage errors={errors} name="image" />

        <label htmlFor="T&C">
          <input
            ref={termsAndConditionsRef}
            className="input-checkbox"
            type="checkbox"
            id="T&C"
            name="T&C"
          />
          <span>I accept all terms and conditions</span>
          <ErrorMessage errors={errors} name="termsAndConditions" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
