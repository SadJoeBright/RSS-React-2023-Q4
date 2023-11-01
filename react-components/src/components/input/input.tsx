import { ChangeEvent, Component, ReactNode } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { IData, IInputState, ISearchProps } from '../../types/types';
import './input.css';

export default class Input extends Component<ISearchProps, IInputState> {
  private updateResults = this.props.updateResults;

  constructor(props: ISearchProps) {
    super(props);
    this.state = {
      searchValue: window.localStorage.getItem('searchValue') || '',
      isLoading: false,
    };
  }

  componentDidMount(): void {
    this.getData(this.state.searchValue);
  }

  private handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchValue: event.target.value });
    window.localStorage.setItem('searchValue', event.target.value);
  };

  private handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === 'Enter') {
      this.getData(this.state.searchValue);
    }
  };

  private getData = async (searchValue: string): Promise<void> => {
    this.setState({ isLoading: true });
    const url: string = `https://swapi.dev/api/starships/${
      searchValue ? `?search=${searchValue}` : ''
    }`;
    const response = await fetch(url);
    const data: IData = await response.json();
    this.updateResults(data.results);
    this.setState({ isLoading: false });
  };

  render(): ReactNode {
    return (
      <>
        <input
          className="input"
          type="text"
          placeholder="Enter starship's name"
          value={this.state.searchValue}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
        />

        <button
          type="button"
          className="search-button"
          onClick={() => this.getData(this.state.searchValue)}
        >
          Search
        </button>

        {this.state.isLoading && (
          <div className="spinner">
            <ColorRing
              visible
              height={80}
              width={80}
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
          </div>
        )}
      </>
    );
  }
}
