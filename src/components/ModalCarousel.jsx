import '../css/ModalCarousel.css'
/* import { Modal, Button, Row, Col } from 'react-bootstrap'
import { useState } from 'react'
import AddComment from './AddComment'
import CommentList from './CommentList' */
import { withRouter } from 'react-router-dom'

const ModalCarousel =(props)=>{

/* const [show, setShow] = useState(false);
const [newcomment, setNewComment] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updated =(data)=>{
      setNewComment(data)
  } */

    return (
        <>
         <img
                 id={props.imdbID}
                 onClick={()=> props.history.push('/details/' + props.imdbID)} 
                 className="imagetransition img-fluid image-height" 
                 src={props.Poster} 
                 alt={props.Title}/>
{/* 
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                   <Row className="">
                        <Col md={10}>
                            <Modal.Title>{props.Title} - {props.Year}</Modal.Title>
                        </Col>
                        <Col md={2} className=" modal-img">
                            <img src={props.Poster} alt={props.Title} className="img-fluid "/>
                        </Col>
                   </Row>
               
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>                           
                           <AddComment elementId={props.imdbID} updatedComments={updated} /> 
                        </Col>

                        <Col>
                            <CommentList elementId={props.imdbID} updatedComments={newcomment}/>                           
                        </Col>
                    </Row>                
                </Modal.Body>
            </Modal> */}
        </>
    )

}

export default withRouter(ModalCarousel)