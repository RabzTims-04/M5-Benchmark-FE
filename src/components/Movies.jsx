import '../css/ModalCarousel.css'
import { Component } from 'react'
import ModalCarousel from './ModalCarousel'

const {REACT_APP_BACKEND_URL} = process.env
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

    url = `${REACT_APP_BACKEND_URL}/medias`

    fetchData = async ()=>{

        const movieUrl= `${this.url}/search?Title=` + this.props.movieName

        try {

            let response = await fetch(movieUrl)
            /* console.log(response); */
            const data = await response.json()
            console.log('data',data);
           
            this.setState({
                moviesArr:data
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
                      <div key={movie._imdbID} className ='infinite-row-element position-relative'>
                       <ModalCarousel Year={movie.Year} imdbID={movie._imdbID} Poster={movie.Poster} Title={movie.Title}/>
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