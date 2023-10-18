import { Component } from 'react';
import {
  HeaderBar,
  SearchForm,
  SearchBtn,
  SearchInput,
} from './Searchbar.styled';
import { CiSearch } from 'react-icons/ci';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.query.trim() === '') {
      alert('Enter the data to search for an image.');
      return;
    }

    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <HeaderBar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchBtn type="submit">
            <CiSearch size={28} />
          </SearchBtn>

          <SearchInput
            type="text"
            value={this.state.query}
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </SearchForm>
      </HeaderBar>
    );
  }
}
