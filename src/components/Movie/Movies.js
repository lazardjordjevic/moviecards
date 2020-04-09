import React, { Component } from 'react';
import MovieList from './MovieList';
import MovieService from '../../services/MovieService';
import uuid from 'react-uuid';

export default class Movies extends Component {

    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            id: 1000,
            title: '',
            subtitle: '',
            description: '',
            year: 0,
            imageUrl: '',
            rating: 0,
            isError: false
        };
    }

    componentDidMount() {
        this.setState(() => ({ movies: MovieService.getMovies() }));
    }

    handleTextChange(value, name) {
        this.setState({ [name]: value })
    }

    handleSubmitMovie() {
        if (!this.state.title.trim() || !this.state.subtitle.trim() 
            || !this.state.description.trim() || !this.state.year.trim()
            || !this.state.imageUrl.trim() || !this.state.rating.trim()) {
            this.setState({ isError: true })
        }
        if (!this.state.isError) {  
            this.setState({ movies: [
                ...this.state.movies,
                {
                    id: uuid(),
                    title: this.state.title,
                    subtitle: this.state.subtitle,
                    description: this.state.description,
                    year: parseInt(this.state.year),
                    imageUrl: this.state.imageUrl,
                    rating: parseInt(this.state.rating),
                    new: true,
                    isError: false 
                }
            ]})
        }
    }

    handleDeleteMovie() {
        let temp = this.state.movies
        const newMovieList = temp.filter(movie => {
            return !movie.hasOwnProperty('new')
        })
        this.setState({ movies: newMovieList })
    }

    render() {
        return (
            <div className="container-fluid" style={{marginLeft: '-15px'}}>
                <div className='from-group'>
                    <div className='col-md-4'>
                        <h3>Add new movie</h3>
                        <input type='text' placeholder='please insert title' className='form-control' 
                            name='title' onChange={(e)=>this.handleTextChange(e.target.value, e.target.name)}/>
                        <input type='text' placeholder='please insert subtitle' className='form-control'
                            name='subtitle' onChange={(e)=>this.handleTextChange(e.target.value, e.target.name)}/>
                        <input type='text' placeholder='please insert description' className='form-control'
                            name='description' onChange={(e)=>this.handleTextChange(e.target.value, e.target.name)}/>
                        <input type='text' placeholder='please insert year' className='form-control'
                            name='year' onChange={(e)=>this.handleTextChange(e.target.value, e.target.name)}/>
                        <input type='text' placeholder='please insert imageUrl' className='form-control'
                            name='imageUrl' onChange={(e)=>this.handleTextChange(e.target.value, e.target.name)}/>
                        <input type='text' placeholder='please insert rating' className='form-control'
                            name='rating' onChange={(e)=>this.handleTextChange(e.target.value, e.target.name)}/>
                        <button type='button' className='btn btn-primary'
                            onClick={()=>this.handleSubmitMovie()}>Add movie</button>
                        {
                            this.state.isError ? 
                                (<p >Please insert all fields</p>) :
                                (<p></p>)
                        }
                        <button type='button' className='btn btn-danger'
                            onClick={()=>this.handleDeleteMovie()}
                        >delete new movie</button>
                    </div>
                </div>
                <div className="d-flex flex-row"> 
                    <div className="col-sm-12">
                        <MovieList 
                            movies={this.state.movies}/>
                    </div>
                </div>
            </div>
        );
    }
}