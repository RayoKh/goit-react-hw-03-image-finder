import { Component } from 'react';
import { fetchImages } from './api/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Wrapper } from './App.styled';
import { GlobalStyle } from './GlobalStyle';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    largeImageURL: '',
    loading: false,
    isFetching: false,
    currentHits: 0,
    totalHits: 0,
    showBtn: false,
    error: null,
    isEmpty: false,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = e => {
    if (e.key === 'Escape') {
      this.handleCloseModal();
    }
  };

  fetchImages = async () => {
    const { query, page, isFetching } = this.state;
    const perPage = 12;

    if (isFetching) {
      return;
    }

    this.setState({ loading: true });

    try {
      const newImages = await fetchImages(query, page, perPage);

      if (newImages.hits.total === 0) {
        this.setState({ isEmpty: true, isLoading: false, showBtn: false });
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...newImages.hits],
        page: prevState.page + 1,
        loading: false,
        currentHits: prevState.currentHits + 12,
        totalHits: newImages.total,
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isFetching: false, isEmpty: false });
    }
  };

  handleSearch = query => {
    this.setState(
      { query, page: 1, images: [], currentHits: 0 },
      this.fetchImages
    );
  };

  handleLoadMore = () => {
    this.fetchImages();
  };

  handleImageClick = largeImageURL => {
    this.setState({ largeImageURL });
  };

  handleCloseModal = () => {
    this.setState({ largeImageURL: '' });
  };

  componentDidUpdate(_, prevState) {
    const { currentHits, totalHits } = this.state;
    if (
      currentHits !== prevState.currentHits ||
      totalHits !== prevState.totalHits
    ) {
      if (this.state.currentHits >= this.state.totalHits) {
        this.setState({ showBtn: false });
      } else {
        this.setState({ showBtn: true });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }
  render() {
    const { images, largeImageURL, isFetching, showBtn, isEmpty } = this.state;

    return (
      <Wrapper>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              image={image}
              onClick={this.handleImageClick}
            />
          ))}
        </ImageGallery>
        {images.length > 0 && !isFetching && showBtn && (
          <Button onClick={this.handleLoadMore} />
        )}
        {isFetching && <Loader />}
        {largeImageURL && (
          <Modal
            largeImageURL={largeImageURL}
            onClose={this.handleCloseModal}
          />
        )}
        {isEmpty && (
          <div>
            <h1>OOPS!</h1>
          </div>
        )}
        <GlobalStyle />
      </Wrapper>
    );
  }
}
