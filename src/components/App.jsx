import { Component } from 'react';
import { Loader } from './Loader/Loader';
import { Error } from './Error/Error';
import { Greeting } from './Greeting/Greeting';
import { Button } from './Button/Button';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import api from './api/api';
import { Wrapper } from './App.styled';
import { GlobalStyle } from './GlobalStyle';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    loading: false,
    showBtn: false,
    error: null,
    isEmpty: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    const perPage = 12;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ loading: true, showBtn: false });

      api
        .fetchImages(query, page, perPage)
        .then(images => {
          if (images.hits.length === 0) {
            this.setState({ isEmpty: true, loading: false, showBtn: false });
            return;
          }

          this.setState(prevState => ({
            images: [...prevState.images, ...images.hits],
            showBtn: page < Math.ceil(images.totalHits / 12),
          }));
        })
        .catch(error => this.setState({ error }))
        .finally(this.setState({ loading: false }));
    }
  }

  handleSearch = query => {
    this.setState({
      query,
      images: [],
      page: 1,
      isEmpty: false,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { query, showBtn, images, loading, error, isEmpty } = this.state;

    return (
      <Wrapper>
        <Searchbar onSubmit={this.handleSearch} />
        {!query && <Greeting />}
        {images.length > 0 && <ImageGallery query={query} images={images} />}
        {loading && <Loader />}
        {showBtn && <Button onCLick={this.handleLoadMore} />}
        {error && (
          <Error message={'Sorry, something went wrong. Try again later!'} />
        )}
        {isEmpty && <Error message={`Sorry, but we can't find ${query}`} />}
        <GlobalStyle />
      </Wrapper>
    );
  }
}
