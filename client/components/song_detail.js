import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchSong';
import { Link } from 'react-router';
import  LyricCreate from './lyric_create';
import LyricList from './lyric_list';
class SongDetail extends Component {


  render() {
    const { song } = this.props.data // or check for this.props.data.loading
    if (!song) { return <div>Loading...</div>; }
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={this.props.params.id} />
      </div>
    );
  }
}


// Show song
// props here and this.props(above) are the same
export default graphql(fetchSong, {
  options: (props) => { return { variables: { id: props.params.id } } }
})(SongDetail);
