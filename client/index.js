import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client'; // front end data
import { ApolloProvider } from 'react-apollo';
// know how to work bettween client and server

import { Route, Router, hashHistory, IndexRoute } from 'react-router';

import App from './components/app';
import SongList from './components/song_list'
import SongCreate from './components/song_create';
import SongDetail from './components/song_detail';

const client = new ApolloClient({
  dataIdFromObject: o => o.id // provider an id to apollo in order to render
});                           // the form right after update/create
// assume that the server is  already configure, otherwise have to add
// some configurations

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongCreate} />
          <Route path="songs/:id" component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  );
}

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
