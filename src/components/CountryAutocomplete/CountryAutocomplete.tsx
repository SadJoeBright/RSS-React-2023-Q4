import React, {
  ChangeEvent,
  useEffect,
  useState,
  forwardRef,
  Ref,
} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface CountryAutocompleteProps {
  inputRef?: Ref<HTMLInputElement>;
}

const CountryAutocomplete = forwardRef<
  HTMLInputElement,
  CountryAutocompleteProps
>(({ inputRef }, ref) => {
  const [currentValue, setCurrentValue] = useState('');
  const [matchingCountries, setMatchingCountries] = useState<string[]>([]);

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
    setMatchingCountries(matches);
  }, [currentValue, countries]);

  const chooseCountry = (value: string) => {
    setCurrentValue(value);
    setTimeout(() => {
      setMatchingCountries([]);
    });
  };

  return (
    <label className="label-text-input country" htmlFor="password">
      <span>Country</span>
      <input
        ref={(el) => {
          if (typeof inputRef === 'function') {
            inputRef(el);
          } else if (inputRef && 'current' in inputRef) {
            (
              inputRef as React.MutableRefObject<HTMLInputElement | null>
            ).current = el;
          }

          if (ref && typeof ref === 'function') {
            ref(el);
          } else if (ref && 'current' in ref) {
            (ref as React.MutableRefObject<HTMLInputElement | null>).current =
              el;
          }
        }}
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
            onClick={() => chooseCountry(country)}
          >
            {country}
          </p>
        ))}
      </div>
    </label>
  );
});
CountryAutocomplete.defaultProps = {
  inputRef: { current: null },
};

export default CountryAutocomplete;
