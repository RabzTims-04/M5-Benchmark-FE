import { Component } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import Alerting from './Alerting'

class AddComment extends Component{

    state={
        comment: {
            comment: '',
            rate: 1,
            elementId: this.props.elementId
          },
          isError:false,
          isSuccess:false
    }

     url = "https://striveschool-api.herokuapp.com/api/comments/";
     key= "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGI4YTk5YzE2ZWY2MDAwMTVjZWQwNWUiLCJpYXQiOjE2MjI3MTQ3ODAsImV4cCI6MTYyMzkyNDM4MH0.-Wnp1TVPbpihQKGNhWBtiCGVL0J9wSxFlGgsbMfh4CA"

    inputChange =(e)=>{
        let id=e.target.id
        console.log(this.state.comment.elementId);

        this.setState({
            comment:{
                ...this.state.comment,
                [id]:e.target.value
            }
        })
    }

    alert =()=>{
        if(this.state.isSuccess){
            setTimeout(()=>(this.setState({
                ...this.state,
                isSuccess:false
            })),2000)
        }
        if(this.state.isError){
            setTimeout(()=>(this.setState({
                ...this.state,
                isError:false
            })),2000)
        }
    } 

    componentDidUpdate =()=>{
        this.alert()
    }

    fetchComment = async ()=>{
        try {
            const response = await fetch(this.url +  this.props.elementId, {      
                headers: {
                    "Authorization": this.key
                }
              })

            const comments = await response.json()
            console.log(comments);
            this.props.updatedComments(comments) 
            
        } catch (error) {
            this.setState({
                ...this.state,
                isError:true,
                isSuccess:false
            })
            console.log(error);                        
        }
    }

    postComment = async (e)=>{
        try {
            let response = await fetch(this.url, {
                method: "POST",
                body: JSON.stringify(this.state.comment),        
                headers: {
                    "Authorization": this.key,
                    "Content-type": "application/json"
                },
              })
              console.log(response);     
              if(response.ok){               
                  this.setState({
                      comment:{
                        comment: '',
                        rate: 1,
                        elementId: this.state.comment.elementId
                      },
                      isSuccess:true,
                      isError:false
                  })    
                 this.fetchComment()
              }
              else{
                  this.setState({
                      ...this.state,
                      isError:true,
                      isSuccess:false
                  })
              }

        }         
        catch (error) {
            this.setState({
                ...this.state,
                isError:true,
                isSuccess:false
            })
            console.log(error);            
        }
                  
    }

    render(){

        return(

            <>
               {this.state.isSuccess && <Alerting color="success" msg="Yay, Comment has been successfully posted" />}
               {this.state.isError && <Alerting color='danger' msg='Oh No, Something went wrong!!!' />}
                <Form className="pt-2 mt-2">
                        <Form.Row>
                            <Col>
                                <Form.Control 
                                required
                                as="textarea"
                                rows={2} 
                                placeholder="Write your comment here..." 
                                value={this.state.comment.comment} 
                                id="comment" 
                                onChange={e => this.inputChange(e)} />
                            </Col>
                        </Form.Row>
                        <Form.Row className="d-flex mt-4">
                            <Col>
                                <Form.Control
                                required 
                                as="select" 
                                className = "align-items-center" 
                                defaultValue="Rating..." 
                                value={this.state.comment.rate} id="rate" 
                                onChange={e => this.inputChange(e)} >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Form.Control>
                            </Col>
                        
                        </Form.Row>
                        <Form.Row>
                        </Form.Row>
                        <Button 
                        variant="primary"
                        onClick={(e) => this.postComment(e)}  
                        id="sendBtn" 
                        className = "btn btn-success ml-2 mt-2"
                        >Add Comment</Button>
                    </Form>

            </>
        )
    }
}

export default AddComment