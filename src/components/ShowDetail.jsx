import {useEffect, useState} from 'react'
import MovieDetails from './MovieDetails'

const ShowDetail =({match})=>{

    const [info, setInfo] = useState(null)
    const [comments, setComments] = useState([])

    useEffect(()=>{
        const getMovieData = async ()=>{
            let id= match.params.movieID
            if(id){
                let response = await fetch('http://www.omdbapi.com/?apikey=5b5bab7&i=' + id)
                let movieInfo = await response.json()
                setInfo(movieInfo)
            }
        }
        getMovieData()
    },[match.params.movieID])

    useEffect(()=>{
        const getMovieComments = async ()=>{
            let id= match.params.movieID
            if(id){
                let response = await fetch('https://striveschool-api.herokuapp.com/api/comments/' + id,{
                    headers:{
                        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGI4YTk5YzE2ZWY2MDAwMTVjZWQwNWUiLCJpYXQiOjE2MjI3MTQ3ODAsImV4cCI6MTYyMzkyNDM4MH0.-Wnp1TVPbpihQKGNhWBtiCGVL0J9wSxFlGgsbMfh4CA"
                    }
                })
                let movieComments = await response.json()
                setComments(movieComments)
            }
        }
        getMovieComments()
    },[match.params.movieID])

    return(
        <div>
            {
                info && <MovieDetails movie={info} comments={comments}/>
            }
        </div>
    )

}
export default ShowDetail
