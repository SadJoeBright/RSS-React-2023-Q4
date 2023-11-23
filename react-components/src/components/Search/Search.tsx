import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { setSearchValue } from '../../state/searchValue/searchValueSlice';
// import './Search.css';

export default function Search() {
  const searchValue = useSelector(
    (state: RootState) => state.searchValue.searchValue
  );

  const [currentSearchValue, setCurrentSearchValue] = useState(searchValue);

  const dispatch = useDispatch<AppDispatch>();

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    setCurrentSearchValue(value);
    window.localStorage.setItem('searchValue', value);
  }

  const handleClick = () => {
    dispatch(setSearchValue(currentSearchValue));
  };

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      dispatch(setSearchValue(currentSearchValue));
    }
  }

  return (
    <div className="search">
      <input
        className="input"
        type="text"
        value={currentSearchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />

      <button type="button" className="search-button" onClick={handleClick}>
        Search
      </button>
    </div>
  );
}
