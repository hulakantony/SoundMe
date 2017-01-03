import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSongsData, getGenreSongs, getMoreSongs } from '../action/'

import SongsNav from '../components/SongsNav';
import Header from '../components/Header';
import Player from '../components/Player'

import '../styles/main.css'

import { debounce } from '../helpers/'

class Home extends Component {
  componentDidMount(){
    const { getSongsData } = this.props;
    getSongsData();
    const pagin = debounce(()=>{
      this.handleScroll()
    }, 500)
    document.addEventListener('scroll', pagin);
  }
  componentWillUnmount(){
    document.removeEventListener('scroll', this.handleScroll);
  }
  changeGenre(genre) {
    const { getGenreSongs } = this.props;
    getGenreSongs(genre);
  }
  handleScroll(){   
    const { getMoreSongs } = this.props;
    let pageHeight = document.documentElement.clientHeight;
    let scroll = window.pageYOffset;
    let height = document.body.offsetHeight;
    if (height === pageHeight + scroll) {      
      getMoreSongs()
    }   
  }  
  render() {    
    const { isLoading, genres, songs } = this.props;
    if (!isLoading) {
      return(
        <div>
          <Header />
          <Player />
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
    getMoreSongs: () => dispatch(getMoreSongs()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

