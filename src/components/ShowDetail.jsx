import {useCallback, useEffect, useState} from 'react'
import MovieDetails from './MovieDetails'

const {REACT_APP_BACKEND_URL} = process.env

const ShowDetail =({match})=>{

    const [info, setInfo] = useState(null)
    const [comments, setComments] = useState([])
    
    const url = `${REACT_APP_BACKEND_URL}/medias`

    useEffect(()=>{
        const getMovieData = async ()=>{
            let id= match.params.movieID
            if(id){
                let response = await fetch(`${url}/${id}`)
                let movieInfo = await response.json()
                setInfo(movieInfo)
            }
        }
        getMovieData()
    },[match.params.movieID, url])

    const getMovieComments = useCallback(async ()=>{
        let id= match.params.movieID
        if(id){
            let response = await fetch(`${url}/${id}/reviews`)
            let movieComments = await response.json()
            setComments(movieComments)
        }
    },[match.params.movieID,url,setComments])
    useEffect(()=>{
        getMovieComments()
    },[getMovieComments])

    return(
        <div>
            {
                info && <MovieDetails movie={info} comments={comments}/>
            }
        </div>
    )

}
export default ShowDetail
