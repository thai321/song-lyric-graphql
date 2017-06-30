import '../style/style.css'
import React, { Component } from 'react';
import { Link } from 'react-router';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
// help to bond query and component

import query from '../queries/fetchSongs';
// query all the songs/ fetch songs to get all list of songs

class SongList extends Component {

  onSongDelete(id) {
    this.props.mutate({variables: { id } })
      .then(() => this.props.data.refetch())
  }      // refetch the query that associate with this component

  renderSongs() {
    return this.props.data.songs.map( song => {
      const { id, title }  = song;
      return (
        <li key={id} className="collection-item">
          <Link to={`/songs/${id}`}>
            {title}
          </Link>

          <i
            className="material-icons"
            onClick={() => this.onSongDelete(id)}
          >
            delete
          </i>

        </li>
      )
    })
  }

  render() {
    if (this.props.data.loading) { return <div>Loading...</div>; }
    return (
      <div>
        <ul className="collection ">
          { this.renderSongs() }
        </ul>
        <Link
          to="/songs/new"
          className="btn-floating btn-large red right"
          >
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

// forming the query, not excute it
const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(
  graphql(query)(SongList)
);
