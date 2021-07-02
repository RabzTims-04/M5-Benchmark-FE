import {Container, Row, Col, Table} from 'react-bootstrap'
import {useState} from 'react'
import AddComment from './AddComment'
import CommentList from './CommentList'

const MovieDetails =({movie, comments}) =>{
    console.log(movie);

    const [newcomment, setNewComment] = useState([])

    const updated =(data)=>{
        setNewComment(data)
    }

return (
   <Container fluid>
                 <h2 className="text-center text-danger my-5">{movie.Title}- {movie.Year}</h2>
       <Row className="justify-content-between my-5" >

           <Col md={4} className="text-center">

           <img className="img-fluid" style={{textAlign:'center'}} src ={movie.Poster} alt="movie poster"/>

           
           {
               movie.Ratings.map(rating =>(
                 <div className="text-center mt-5">
                   <p style={{listStyleType:'none'}} className="my-3 text-danger" >{rating.Source}</p>
                   <p className="my-3" >{rating.Value}</p>
                  </div>
                ))
             }

           </Col>
           <Col md={8}>

           <Table striped bordered hover>
                            <tbody>

                                <tr>
                                <td className="text-danger font-weight-bold">Actors:</td>
                                <td className="text-white">{movie.Actors}</td>
                                </tr>

                                <tr>
                                <td className="text-danger font-weight-bold">Awards:</td>
                                <td className="text-white">{movie.Awards}</td>
                                </tr>

                                <tr>
                                <td className="text-danger font-weight-bold">BoxOffice:</td>
                                <td className="text-white">{movie.BoxOffice}</td>
                                </tr>

                                <tr>
                                <td className="text-danger font-weight-bold">Country:</td>
                                <td className="text-white">{movie.Country}</td>
                                </tr>

                                <tr>
                                <td className="text-danger font-weight-bold">DVD:</td>
                                <td className="text-white">{movie.DVD}</td>
                                </tr>

                                <tr>
                                <td className="text-danger font-weight-bold">Genre:</td>
                                <td className="text-white">{movie.Genre}</td>
                                </tr>

                                <tr>
                                <td className="text-danger font-weight-bold">Language:</td>
                                <td className="text-white">{movie.Language}</td>
                                </tr>

                                <tr>
                                <td className="text-danger font-weight-bold">Metascore:</td>
                                <td className="text-white">{movie.Metascore}</td>
                                </tr>

                                <tr>
                                <td className="text-danger font-weight-bold">Plot:</td>
                                <td className="text-white">{movie.Plot}</td>
                                </tr>

                                <tr>
                                <td className="text-danger font-weight-bold">Production:</td>
                                <td className="text-white">{movie.Production}</td>
                                </tr>

                                <tr>
                                <td className="text-danger font-weight-bold">Rated:</td>
                                <td className="text-white">{movie.Rated}</td>
                                </tr>

                                <tr>
                                <td className="text-danger font-weight-bold">Released:</td>
                                <td className="text-white">{movie.Released}</td>
                                </tr>

                                <tr>
                                <td className="text-danger font-weight-bold">Runtime:</td>
                                <td className="text-white">{movie.Runtime}</td>
                                </tr>

                                <tr>
                                <td className="text-danger font-weight-bold">Writer:</td>
                                <td className="text-white">{movie.Writer}</td>
                                </tr>

                                <tr>
                                <td className="text-danger font-weight-bold">imdbRating:</td>
                                <td className="text-white">{movie.imdbRating}</td>
                                </tr>

                                <tr>
                                <td className="text-danger font-weight-bold">imdbVotes:</td>
                                <td className="text-white">{movie.imdbVotes}</td>
                                </tr>

                            </tbody>
                        </Table>

           </Col>
       </Row>

       <Row className="my-5">
           <Col md={{span:4, offset:4}}>
              <AddComment elementId={movie.imdbID}  updatedComments={updated}  /> 
           </Col>
       </Row>

       <Row className="mt-5">
           <Col className="text-center" md={{span:6, offset:3}}>
               <h3 className="mt-3 text-danger">COMMENTS</h3>

               <CommentList elementId={movie.imdbID} updatedComments={newcomment}/>

           </Col>

       </Row>
   </Container> 
)
}

export default MovieDetails