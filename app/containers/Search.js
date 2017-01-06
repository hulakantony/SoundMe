import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGenreSongs } from '../action/'

class Search extends Component {
	handleSubmit(e){
		e.preventDefault();
		const { input } = this.refs;
		const { getGenreSongs } = this.props;
		getGenreSongs(input.value);
	}	
	render() {
		return (
			<form onSubmit={(e)=>this.handleSubmit(e)} className='search-form'>
				<input type='text' ref='input' defaultValue='' placeholder='Search...' />
			</form>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
  return {    
    getGenreSongs: (genre) => dispatch(getGenreSongs(genre)),    
  }
}

export default connect(null, mapDispatchToProps)(Search);