/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import '../UncontrolledForm/UncontrolledForm.css';

interface CountryAutocompleteProps {
  // inputRef?: React.RefObject<HTMLInputElement>;
  countryInput: React.ReactNode;
}

export default function CountryAutocomplete({
  countryInput,
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
      {/* <input
        ref={inputRef}
        className="text-input"
        type="text"
        placeholder="country"
        value={currentValue}
        onChange={handleChange}
      /> */}
      {React.cloneElement(countryInput as React.ReactElement, {
        value: currentValue,
        onChange: handleChange,
      })}
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

// CountryAutocomplete.defaultProps = {
//   inputRef: { current: null },
// };
