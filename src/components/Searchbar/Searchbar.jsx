// import { Component } from 'react';

// export class SearchBar extends Component {
//   render() {
//     <header class="searchbar">
//       <form class="form">
//         <button type="submit" class="button">
//           <span class="button-label">Search</span>
//         </button>

//         <input
//           class="input"
//           type="text"
//           autocomplete="off"
//           autofocus
//           placeholder="Search images and photos"
//         />
//       </form>
//     </header>;
//   }
// }

import { Component } from 'react';
import {
  HeaderBar,
  SearchForm,
  SearchBtn,
  BtnLabel,
  SearchInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <HeaderBar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchBtn type="submit">
            <BtnLabel>Search</BtnLabel>
          </SearchBtn>

          <SearchInput
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </SearchForm>
      </HeaderBar>
    );
  }
}
