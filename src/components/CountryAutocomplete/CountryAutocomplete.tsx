/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { ChangeEvent, useEffect, useState } from 'react';
import '../UncontrolledForm/UncontrolledForm.css';

interface CountryAutocompleteProps {
  inputRef?: React.RefObject<HTMLInputElement>;
}

export default function CountryAutocomplete({
  inputRef,
}: CountryAutocompleteProps) {
  const counries = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Anguilla',
    'Antigua &amp; Barbuda',
    'Argentina',
    'Armenia',
    'Aruba',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bermuda',
  ];

  const [currentValue, setCurrentValue] = useState('');
  const [matchingCountries, setMatchingCounries] = useState<string[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCurrentValue(value);
  };

  useEffect(() => {
    const matches = counries.filter(
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
