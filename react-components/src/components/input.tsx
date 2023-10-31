import { ChangeEvent, Component, ReactNode } from 'react';

interface SearchProps {
  updateResults: (results: object[]) => void;
}
export default class Input extends Component<SearchProps> {
  state = {
    searchValue: window.localStorage.getItem('searchValue') || '',
    isLoading: false,
  };

  updateResults = this.props.updateResults;

  componentDidMount() {
    this.getData(this.state.searchValue);
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: event.target.value });
    window.localStorage.setItem('searchValue', event.target.value);
  };

  getData = async (searchValue: string) => {
    this.setState({ isLoading: true });
    const url = `https://swapi.dev/api/starships/${
      searchValue ? `?search=${searchValue}` : ''
    }`;
    const response = await fetch(url);
    const data = await response.json();
    this.updateResults(data.results);
    console.log(data);
    this.setState({ isLoading: false });
  };

  render(): ReactNode {
    if (this.state.isLoading) {
      console.log('loading...');
      return <p>Loading</p>;
    }
    console.log('loading finished');

    return (
      <>
        <input
          type="text"
          placeholder="Enter starship name"
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
      </>
    );
  }
}
