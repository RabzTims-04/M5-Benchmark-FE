import {Container, Row, Col, Button} from 'react-bootstrap'
import {useState} from 'react'
import AddComment from './AddComment'
import CommentList from './CommentList'

const {REACT_APP_BACKEND_URL} = process.env

const MovieDetails =({movie, comments}) =>{
    console.log(movie);

    const [newcomment, setNewComment] = useState([])

    const updated =(data)=>{
        setNewComment(data)
    }

    const url = `${REACT_APP_BACKEND_URL}/medias/${movie._imdbID}`

    const deleteMovie = async (e) => {
        try {
            const response = await fetch(url,{
                method:'DELETE'
            })
            if(response.ok){
                alert('successfully deleted')
                window.location.replace('http://localhost:3000')
            }
        } catch (error) {
            console.log(error);
        }
    }

return (
   <Container fluid>
                 <h2 className="text-center text-danger my-5">{movie.Title} - {movie.Year}</h2>
       <Row className="justify-content-center my-5" >

           <Col md={4} className="text-center">

           <img className="img-fluid" style={{textAlign:'center'}} src ={movie.Poster} alt="movie poster"/>

           <div className="mt-4 d-flex justify-content-between px-5">
               <Button variant = "info">Edit</Button>
               <Button onClick={(e)=> deleteMovie(e)} variant = "danger">Delete</Button>
               <Button href={`${url}/pdf`} variant = "secondary">PDF</Button>
           </div>

           </Col>

           <Col md={8}>
           <h3 className="mt-3 text-danger">COMMENTS</h3>
           <Row className="mt-5">      

               <CommentList elementId={movie._imdbID} updatedComments={newcomment}/>
       </Row> 
               
    </Col>
      </Row> 

        <Row className="my-5">
           <Col md={{span:4, offset:4}}>
              <AddComment elementId={movie._imdbID}  updatedComments={updated}  /> 
           </Col>
       </Row>

   </Container> 
)
}

export default MovieDetails