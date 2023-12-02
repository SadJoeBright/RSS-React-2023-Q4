/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { ChangeEvent, useEffect, useState } from 'react';
import '../UncontrolledForm/UncontrolledForm.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface CountryAutocompleteProps {
  inputRef?: React.RefObject<HTMLInputElement>;
}

export default function CountryAutocomplete({
  inputRef,
}: CountryAutocompleteProps) {
  const [currentValue, setCurrentValue] = useState('');
  const [matchingCountries, setMatchingCounries] = useState<string[]>([]);

  const countries = useSelector((state: RootState) => state.country);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCurrentValue(value);
  };

  useEffect(() => {
    const matches = countries.filter(
      (country) =>
        currentValue &&
        country.toLowerCase().startsWith(currentValue.toLocaleLowerCase())
    );
    setMatchingCounries(matches);
  }, [currentValue]);

  const chooseCounry = (value: string) => {
    setCurrentValue(value);
    setTimeout(() => {
      setMatchingCounries([]);
    });
  };

  return (
    <label className="label-text-input country" htmlFor="password">
      <span>Country</span>
      <input
        ref={inputRef}
        className="text-input"
        type="text"
        placeholder="country"
        value={currentValue}
        onChange={handleChange}
      />
      <div className={matchingCountries.length ? 'countries-container' : ''}>
        {matchingCountries.map((country) => (
          <p
            className="country-row"
            key={country}
            onClick={() => chooseCounry(country)}
          >
            {country}
          </p>
        ))}
      </div>
    </label>
  );
}

CountryAutocomplete.defaultProps = {
  inputRef: { current: null },
};
