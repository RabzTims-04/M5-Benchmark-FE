import { Component } from 'react'
import { ListGroup } from 'react-bootstrap'
import Alerting from './Alerting'
import del from "../assets/delete.jpg";
import EditComment from './EditComment';

class CommentList extends Component{

    state={
        comments:[],
        isSuccess:false,
        isError:false,
        isEdit:false
    }

     url = "https://striveschool-api.herokuapp.com/api/comments/";
     key= "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGI4YTk5YzE2ZWY2MDAwMTVjZWQwNWUiLCJpYXQiOjE2MjI3MTQ3ODAsImV4cCI6MTYyMzkyNDM4MH0.-Wnp1TVPbpihQKGNhWBtiCGVL0J9wSxFlGgsbMfh4CA"

     alert =()=>{
        if(this.state.isSuccess){
            setTimeout(()=>(this.setState({
                ...this.state,
                isSuccess:false,
            })),2000)
        }
        if(this.state.isError){
            setTimeout(()=>(this.setState({
                ...this.state,
                isError:false,
            })),2000)
        }
    }
    
        editComment =(editComment)=>{
        const commentsRef = this.state.comments
        const edit = commentsRef.indexOf(editComment)
        commentsRef[edit] = editComment
        this.setState({
            ...this.state,
            comments:commentsRef,
      
        })
    }


    componentDidMount =()=>{
        this.fetchComments()
    }

    componentDidUpdate =()=>{
        if(this.props.updatedComments !== this.state.comments){
            this.fetchComments()
        }
        this.alert()
    }
    
    fetchComments = async ()=>{
        try {
            const response = await fetch(this.url + this.props.elementId, {      
                headers: {
                    "Authorization": this.key
                }
              })

            const comments = await response.json()
            console.log(comments);
            if(response.ok){
                this.setState({
                    ...this.state,
                    comments:comments,
                    isSuccess:false,
                    isError:false,
                })
            }
            else{
                console.log('commentlist error');
            }
            
        } catch (error) {
            console.log(error);                        
        }
    }

    deleteComment = async (e)=>{

        try {
            console.log(e.target.id);
            const response = await fetch(this.url + e.target.id, {
                method:'DELETE',      
                headers: {
                    "Authorization": this.key
                }
              })

            if(response.ok){
                this.setState({
                    comments:this.state.comments.filter(comment => comment._id !== e.target.id),
                    isSuccess:true,
                    isError:false,
                    isEdit:false
                })
            }
            else{
                this.setState({
                    ...this.state,
                     isSuccess:false,
                     isError:true,
                     isEdit:false
                 })
                console.log('commentlist error');
            }
            
        } catch (error) {
            
        }
    }


    render(){

        return(

            <>
            {this.state.isSuccess && <Alerting color="success" msg="Comment successfully deleted" />}
            {this.state.isError && <Alerting color='danger' msg='Oh No, Something went wrong!!!' />}
 
              <ListGroup>  
                {(!this.state.comments.length)
                        ?<p className="mt-3">No Comments Yet</p>
                        :(this.props.updatedComments.length)
                             ?this.props.updatedComments.map(comment =>
                               ((!this.state.isEdit)
                                ?<ListGroup.Item 
                                className="d-flex" 
                                >
                                    <span className="mr-auto">{comment.comment}</span>
                                    <span className="">{comment.rate===1?'⭐':comment.rate===2?'⭐⭐'
                                    :comment.rate===3?'⭐⭐⭐':comment.rate===4?'⭐⭐⭐⭐':'⭐⭐⭐⭐⭐'}</span>
                                    <img
                                        className="ml-5 mt-1 deleteBtn"
                                        id= {comment._id}
                                        onClick={(e) => this.deleteComment(e)}
                                        src={del} 
                                        alt="delete-icon"/>

                                        <img 
                                        className="ml-2 mt-1 deleteBtn"
                                        id= {comment._id}
                                        onClick={(e) => (this.setState({
                                            ...this.state,
                                            isEdit:!this.state.isEdit
                                        }))}
                                        src="https://img.icons8.com/dusk/64/000000/edit--v2.png" 
                                        alt="edit icon"/>                             
                                    </ListGroup.Item>
                                    :<><EditComment comment={comment.comment} rate={comment.rate} elementId={this.props.elementId} commentId={comment._id} editComment={this.editComment} isEdit={this.state.isEdit} />
                                     <img 
                                     className="closebtn" 
                                     onClick={()=> this.setState({
                                        ...this.state,
                                        isEdit:!this.state.isEdit
                                    })} 
                                     src="https://img.icons8.com/fluent/48/000000/close-window.png" 
                                     alt="close"/>
                                    </>
                             ) ) 
                            :this.state.comments.map(comment => 
                                ((!this.state.isEdit)
                                ?<ListGroup.Item 
                                className="d-flex" 
                                >
                                    <span className="mr-auto">{comment.comment}</span>
                                    <span className="">{comment.rate===1?'⭐':comment.rate===2?'⭐⭐'
                                    :comment.rate===3?'⭐⭐⭐':comment.rate===4?'⭐⭐⭐⭐':'⭐⭐⭐⭐⭐'}</span>
                                    <img
                                        className="ml-5 mt-1 deleteBtn"
                                        id= {comment._id}
                                        onClick={(e) => this.deleteComment(e)}
                                        src={del} 
                                        alt="delete-icon"/> 

                                        <img 
                                        className="ml-2 mt-1 deleteBtn"
                                        id= {comment._id}
                                        onClick={(e)=> (this.setState({
                                            ...this.state,
                                            isEdit:!this.state.isEdit
                                        }))}
                                        src="https://img.icons8.com/dusk/64/000000/edit--v2.png" 
                                        alt="edit icon"/>                            
                                    </ListGroup.Item>
                                    :<><EditComment comment={comment.comment} rate={comment.rate} elementId={this.props.elementId} commentId={comment._id} editComment={this.editComment} isEdit={this.state.isEdit}/>
                                    <img 
                                    className="closebtn"
                                    onClick={()=> this.setState({
                                        ...this.state,
                                        isEdit:!this.state.isEdit
                                    })} 
                                    src="https://img.icons8.com/fluent/48/000000/close-window.png" 
                                    alt="close"/>
                                        </>
                                  ))
                        }
                        </ListGroup>
            </>
        )
    }
}

export default CommentList