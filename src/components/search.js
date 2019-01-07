import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';
import Book from './book';

class Search extends Component {

    constructor () {
        super();
        this.state = {
            query: '',
            books: []
        };
    }

    /**
     * Update the query to hit the api with, search the api with that query and set the state of the page
     * @param {string} query string request to hit api with
     */
    updateQuery = (query) => {
        const { libraryBooks } = this.props;

        this.setState({ query: query });
        const trimmedQuery = query.trim();
        if (trimmedQuery === '') {
        this.setState({ books: [] });
                        return ;
        }
        BooksAPI.search(trimmedQuery, 5).then((response) => {
            if (response && response.length) {
                const books = response.map((book) => {
                    const libBook = libraryBooks.find((libBook) => libBook.id === book.id);
                    const shelf = libBook ? libBook.shelf : 'none';
                    return {
                        id: book.id,
                        shelf: shelf,
                        authors: book.authors !== undefined ? book.authors : 'Author name not found',
                        title: book.title !== undefined ? book.title : 'Book Title not found',

                        imageLinks: {
                                thumbnail: book.imageLinks !== undefined  ? book.imageLinks.thumbnail : 'http://via.placeholder.com/128x193?text=No%20Cover'
                        }

                    };
                });
                this.setState({ books });
            }
        });
    };

    render () {
        const { books } = this.state;
        const { updateShelf } = this.props;

        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link
                to="/"
                className="close-search"
              >
              Close
              </Link>
              <div className="search-books-input-wrapper">
                <input
                    type="text"
                    placeholder="Search by title or author"
                    onChange={ (event) => this.updateQuery(event.target.value) }
                    value = { this.state.query }
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                    {
                        books.map((book) => (
                            <li key={ book.id }>
                                <Book
                                    id={ book.id }
                                    shelf={ book.shelf }
                                    authors={ book.authors }
                                    title={ book.title }
                                    imageLinks={ book.imageLinks }
                                    updateShelf={ updateShelf }
                                />
                            </li>
                        ))
                    }
              </ol>
            </div>
          </div>
        );
    }
}

export default Search;
