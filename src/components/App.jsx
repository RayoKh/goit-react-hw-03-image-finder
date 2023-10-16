// const { Component } = require('react');

// class App extends Component {
//   state = {
//     query: '',
//     images: [],
//     page: 1,
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//     this.setState({
//       query: e.target.elements.query.value,
//       images: [],
//       page: 1,
//     });
//   };

//   handleLoadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (
//       prevState.query !== this.state.query ||
//       prevState.page !== this.state.page
//     ) {
//       // HTTP REQUEST
//     }
//   }

//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit}>
//           <input type="text" name="query" />
//           <button type="submit">Search</button>
//         </form>
//         {this.state.images.length > 0 && <div>Gallery</div>}
//         <button onClick={this.handleLoadMore}>Load more</button>
//       </div>
//     );
//   }
// }

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
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
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

      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
        page: prevState.page + 1,
        loading: false,
      }));
    } catch (error) {
      console.error('Error fetching images: ', error);
    } finally {
      this.setState({ isFetching: false });
    }
  };

  handleSearch = query => {
    this.setState({ query, page: 1, images: [] }, this.fetchImages);
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

  render() {
    const { images, largeImageURL, isFetching } = this.state;

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
        {images.length > 0 && !isFetching && (
          <Button onClick={this.handleLoadMore} />
        )}
        {isFetching && <Loader />}
        {largeImageURL && (
          <Modal
            largeImageURL={largeImageURL}
            onClose={this.handleCloseModal}
          />
        )}
        <GlobalStyle />
      </Wrapper>
    );
  }
}
