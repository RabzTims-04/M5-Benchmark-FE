import { Component } from 'react'
import { Button, Form } from 'react-bootstrap'
import Alerting from './Alerting'

class EditComment extends Component{

    state={
        editComment: {
            comment: this.props.comment,
            rate: this.props.rate,
            elementId: this.props.elementId
          },
          isError:false,
          isSuccess:false
    }

    inputChange =(e)=>{
        let id= e.target.id
        this.setState({
            editComment:{
                ...this.state,
                ...this.state.editComment,
                [id]:e.target.value
            }
        })
    }

    alert =()=>{
        if(this.state.isSuccess){
            setTimeout(()=>(this.setState({
                ...this.state.editComment,
                ...this.state,
                isSuccess:false,
            })),2000)
        }
        if(this.state.isError){
            setTimeout(()=>(this.setState({
                ...this.state.editComment,
                ...this.state,
                isError:false
            })),2000)
        }
    } 

    componentDidUpdate =()=>{
        this.alert()
    }


    editComment = async (e) =>{
        const url = 'https://striveschool-api.herokuapp.com/api/comments/' + this.props.commentId
        const key= "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGI4YTk5YzE2ZWY2MDAwMTVjZWQwNWUiLCJpYXQiOjE2MjI3MTQ3ODAsImV4cCI6MTYyMzkyNDM4MH0.-Wnp1TVPbpihQKGNhWBtiCGVL0J9wSxFlGgsbMfh4CA"
        console.log('id',this.props.commentId);

            try {
                const response = await fetch (url,{
                    method : 'PUT',
                    body: JSON.stringify(this.state.editComment),
                    headers :{
                        'Authorization' : key,
                        'Content-type' : 'application/json'  
                    }
                })

                const editcomment= await response.json()
               
                console.log('put',await response.json());

                if(response.ok){
                    /* this.props.editComment=(await response.json()) */
                   this.props.editComment(editcomment)
                    this.setState({
                        editComment:{
                            comment:'',
                            rate:'',
                            elementId:'' 
                        },
                        isError:false,
                        isSuccess:true
                    })
                }else{
                    this.setState({
                       ...this.state.editComment,
                        isError:true,
                        isSuccess:false
                    })
                }
                
            } catch (error) {
                console.log(error);
            }

    }

    render(){

        return(

            <>

               {this.state.isSuccess && <Alerting color="success" msg="Yay, Comment has been successfully edited" />}
               {this.state.isError && <Alerting color='danger' msg='Oh No, Something went wrong!!!' />}

               <Form className="mt-3">
                    <Form.Group>
                        <Form.Control
                            as="textarea"
                            rows={1}
                            value={this.state.editComment.comment}
                            id="comment"
                            onChange={e => this.inputChange(e)}
                        />
                    </Form.Group>
                    <Form.Group>
                            <Form.Control
                                type="number"
                                value={this.state.editComment.rate}
                                id="rate"
                                onChange={e => this.inputChange(e)}
                            />
                        </Form.Group> 
                        <Button
                        onClick={(e) =>this.editComment(e)} 
                        variant="primary">
                            Edit
                        </Button>
                </Form>

            </>
        )
    }
}

export default EditComment