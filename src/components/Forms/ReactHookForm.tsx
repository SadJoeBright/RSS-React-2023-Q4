import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { setFormData, IFormData } from '../../store/formDataSlice';
import { AppDispatch } from '../../store/store';
import readFile from '../../utils/fileReader';
import validationSchema from '../../utils/validation';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import CountryAutocomplete from '../CountryAutocomplete/CountryAutocomplete';

export default function ReactHookForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(validationSchema), mode: 'all' });

  const [passwordStrength, setPasswordStrength] = useState('');

  const handlePasswordChange = () => {
    const password = watch('password');

    if (password.length >= 8) {
      setPasswordStrength('strong');
    } else if (password.length >= 6) {
      setPasswordStrength('moderate');
    } else if (password.length) {
      setPasswordStrength('weak');
    }
  };

  useEffect(() => {
    handlePasswordChange();
  }, [watch('password')]); //

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const onSubmit = async (data: { image: unknown }) => {
    try {
      const imageFile = data.image as unknown as FileList;
      if (imageFile) {
        data.image = await readFile(imageFile[0]);
      }

      dispatch(setFormData(data as unknown as IFormData));
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form noValidate className="form" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="form__heading">React Hook Form</h3>
        <label className="label-text-input" htmlFor="name">
          <span>Name</span>
          <input
            className={`text-input ${errors.name && 'invalid'}`}
            type="text"
            {...register('name')}
            id="name"
            placeholder="Name"
          />
          <ErrorMessage message={errors.name?.message} />
        </label>

        <label className="label-text-input" htmlFor="age">
          <span>Age</span>
          <input
            className={`text-input ${errors.age && 'invalid'}`}
            type="number"
            {...register('age')}
            id="age"
            placeholder="age"
          />
          <ErrorMessage message={errors.age?.message} />
        </label>

        <label className="label-text-input" htmlFor="email">
          <span>E-mail</span>
          <input
            className={`text-input ${errors.email && 'invalid'}`}
            type="email"
            {...register('email')}
            id="email"
            placeholder="email"
          />
          <ErrorMessage message={errors.email?.message} />
        </label>

        <label className="label-text-input" htmlFor="password">
          <span>Password</span>
          <input
            className={`text-input ${errors.password && 'invalid'}`}
            type="password"
            {...register('password')}
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
          <ErrorMessage message={errors.password?.message} />
        </label>

        <label className="label-text-input" htmlFor="confirm-password">
          <span>Confirm password</span>
          <input
            className={`text-input ${errors.confirmPassword && 'invalid'}`}
            type="password"
            {...register('confirmPassword')}
            placeholder="confirm password"
            id="confirm-password"
          />
          <ErrorMessage message={errors.confirmPassword?.message} />
        </label>

        <fieldset>
          <legend>
            <span> Gender</span>
          </legend>

          <label className="label-radio" htmlFor="male">
            <input
              className="input-radio"
              type="radio"
              id="male"
              value="male"
              {...register('gender', { value: 'male' })}
            />
            Male
          </label>

          <label className="label-radio" htmlFor="female">
            <input
              className="input-radio"
              type="radio"
              id="female"
              value="female"
              {...register('gender', { value: 'female' })}
            />
            Female
          </label>
          <ErrorMessage message={errors.gender?.message} />
        </fieldset>

        <CountryAutocomplete
          countryInput={
            <input
              {...register('country')}
              className={`text-input ${errors.country && 'invalid'}`}
              type="text"
              placeholder="Country"
            />
          }
        />
        <ErrorMessage message={errors.country?.message} />

        <input
          {...register('image')}
          type="file"
          accept="image/jpeg, image/png"
        />
        <ErrorMessage message={errors.image?.message} />

        <label htmlFor="T&C">
          <input
            className="input-checkbox"
            type="checkbox"
            id="T&C"
            {...register('termsAndConditions')}
          />
          <span>I accept all terms and conditions</span>
          <div className="error-container">
            <p className="error-message">
              {errors.termsAndConditions?.message}
            </p>
          </div>
        </label>
        <button disabled={!isValid} type="submit">
          Submit
        </button>
      </form>
      <Link to="/">Back to main page</Link>
    </>
  );
}
