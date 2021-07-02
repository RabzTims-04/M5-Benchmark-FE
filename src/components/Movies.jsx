import '../css/ModalCarousel.css'
import { Component } from 'react'
import ModalCarousel from './ModalCarousel'

class Movies extends Component{


    state={
        moviesArr:[],
        
    }

    componentDidMount =()=>{
        this.fetchData()
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.movieName !== this.props.movieName){
            this.fetchData()
        }
    }

    fetchData = async ()=>{

        const url='http://www.omdbapi.com/?i=tt3896198&apikey=5b5bab7&s=' + this.props['movieName']

        try {

            let response = await fetch(url)
            /* console.log(response); */
            const data = await response.json()
           
            let movies = await data.Search
            console.log(movies);
            this.setState({
                moviesArr:movies
            })
            console.log(this.state.moviesArr);
            
        } catch (error) {
            console.log(error);            
        }
    }

    render(){

        return(
            <>
            <div className="mt-5">
                <h6 className="d-inline pl-3">
                    {this.props.movieTitle}
                </h6>
             </div>
             <div className="scroller mt-1">
               <div id={this.props.id} className="infinite-row">
                   {(!this.state.moviesArr)
                   ?<p>No movies to show</p>
                   :this.state.moviesArr.map((movie)=>           
                      <div key={movie.imdbID} className ='infinite-row-element position-relative'>
                       <ModalCarousel Year={movie.Year} imdbID={movie.imdbID} Poster={movie.Poster} Title={movie.Title}/>
                        </div>
                    )   
                    }
                    </div>
                </div>     
            </>
        )
    }
}

export default Movies