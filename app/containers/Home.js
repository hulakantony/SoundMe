import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSongsData, getGenreSongs, getMoreSongs } from '../action/'

import SongsNav from '../components/SongsNav';
import Header from '../components/Header';
import SongsList from '../components/SongsList'

import '../styles/main.css'

import { debounce } from '../helpers/'

class Home extends Component {
  componentDidMount(){
    const { getSongsData } = this.props;
    getSongsData();
    document.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount(){
    document.removeEventListener('scroll', this.handleScroll);
  }
  changeGenre(genre) {
    const { getGenreSongs } = this.props;
    getGenreSongs(genre);
  }
  handleScroll(){
    //const { getMoreSongs } = this.props;
    var scrollHeight = window.pageYOffset;
    console.log(scrollHeight)
    //getMoreSongs();
  }
  render() {    
    const { isLoading, genres, songs } = this.props;
    if (!isLoading) {
      return(
        <div>
          <Header />
          <SongsNav genres={genres} changeGenre={(gen) => this.changeGenre(gen)}/>           
          {this.props.children}        
        </div>
      ) 
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => { 
  return {    
    isLoading: state.isLoading,
    hasErrored: state.hasErrored,
    genres: state.genres,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getSongsData: () => dispatch(getSongsData()),
    getGenreSongs: (genre) => dispatch(getGenreSongs(genre)),
    //getMoreSongs: () => dispatch(getMoreSongs()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

