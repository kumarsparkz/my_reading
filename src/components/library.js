import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Bookshelf from './bookshelf';

class Library extends Component {

    shelfBooks = (shelf) => {
        const { books } = this.props;
        return books.filter((book) => book.shelf === shelf);
    }

    render () {
        const { updateShelf } = this.props;

        return(
            <div className="list-books">
            <div className="list-books-title">
              <h1>MY Reading Book Library</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf
                  name="Currently Reading"
                  books={ this.shelfBooks('currentlyReading') }
                  updateShelf={ updateShelf }
                />
                <Bookshelf
                  name="Want to Read"
                  books={ this.shelfBooks('wantToRead') }
                  updateShelf={ updateShelf }
                />
                <Bookshelf
                  name="Read"
                  books={ this.shelfBooks('read') }
                  updateShelf={ updateShelf }
                />
              </div>
            </div>
            <div className="open-search">
              <Link
                    to="/search"
                >
                    Search
              </Link>
            </div>
          </div>
        );
    }
}

export default Library;
