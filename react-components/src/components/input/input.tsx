import { ChangeEvent, Component, ReactNode } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { IData, IInputState, ISearchProps } from '../../types/types';

export default class Input extends Component<ISearchProps, IInputState> {
  private updateResults = this.props.updateResults;

  constructor(props: ISearchProps) {
    super(props);
    this.state = {
      searchValue: window.localStorage.getItem('searchValue') || '',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getData(this.state.searchValue);
  }

  private handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: event.target.value });
    window.localStorage.setItem('searchValue', event.target.value);
  };

  private getData = async (searchValue: string) => {
    this.setState({ isLoading: true });
    const url: string = `https://swapi.dev/api/starships/${
      searchValue ? `?search=${searchValue}` : ''
    }`;
    const response = await fetch(url);
    const data: IData = await response.json();
    console.log(data);
    this.updateResults(data.results);
    this.setState({ isLoading: false });
  };

  render(): ReactNode {
    return (
      <>
        <input
          type="text"
          placeholder="Enter starship's name"
          value={this.state.searchValue}
          onChange={this.handleInputChange}
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
