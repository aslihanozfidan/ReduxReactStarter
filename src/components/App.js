import React, { Component } from 'react';
import axios from 'axios';
import md5 from 'md5';

import SearchBar from './search-bar';
import CharacterLİst from './character-list';
import Details from './details';

const API_URL = 'https://gateway.marvel.com:443/v1/public/';
const publicKey = 'f9a04d0dbaa29021d63f263d2222e378';
const privateKey = '355bb31e40898ee3dd1f71cc8fea4e3834f81f42';
const ts = '1';
const auth = `ts=${ts}&apikey=${publicKey}&hash=${md5(`${ts}${privateKey}${publicKey}`)}`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      characters: null,
    };
  }


  componentDidMount = () => {
    this.GetInitialChracters();
  }

  GetInitialChracters() {
    axios.get(`${API_URL}/characters?${auth}&limit=5`)
      .then(res => {
        const characters = res.data.data.results;
        this.setState({ characters });
      });
  }

  render() {
    console.log('app.jsten gelen characters', this.state.characters);
    return (
      <div className="container" >
        <SearchBar />
        <CharacterLİst characters={this.state.characters} />
        <Details />
      </div>
    );
  }
};

export default App;
