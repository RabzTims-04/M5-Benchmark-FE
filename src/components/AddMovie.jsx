import { Component, createRef } from 'react'
import { Container, Row, Col, Form, Button, InputGroup, FormControl } from 'react-bootstrap'
import '../css/Registration.css'

const {REACT_APP_BACKEND_URL} = process.env

class AddMovie extends Component{

    ref = createRef()

   state={
        movie:{
            Title:"",
            Poster:"http://cover.com",
            Year:0,
            Type:""
        }
   }

   url = `${REACT_APP_BACKEND_URL}/medias`

   postMovie = async (e) =>{
       e.preventDefault()
       let formData = new FormData()
        formData.append('mediaCover', this.state.movie.image)
       try {
           const response = await fetch(this.url,{
               method:"POST",
               body:JSON.stringify({
                    Title:this.state.movie.Title,
                    Poster:this.state.movie.Poster,
                    Year:this.state.movie.Year,
                    Type:this.state.movie.Type
               }),
               headers:{
                'content-type':'application/json'
               }
           })
           const data = await response.json()  
           const id = await data._imdbID 
           if(response.ok){
               if(this.state.movie.image){
                   try {
                    const postImg = await fetch(`${this.url}/${id}/uploadCover`,{
                        method:'POST',
                        body: formData
                    })
                    console.log(await postImg.json());
                    if(postImg.ok){
                        const imgData = await postImg.json()
                        console.log(imgData);
                    }
                       
                   } catch (error) {
                       console.log(error);
                   }
               }

               alert('movie added successfully')
               this.setState({
                   movie:{
                        Title:"",
                        Poster:"http://cover.com",
                        Year:0,
                        Type:""
                   }
               })
           }        
           
       } catch (error) {
           console.log(error);
       }

   }

   render(){
       
       return(
           <Container className="mt-5">
           <Row>
               <Col md={{span:6, offset:3}}>

                <Form id="registration" onSubmit={(e) => this.postMovie(e)} >
                   <Form.Group>   

                       <div className="d-flex ">
                           <Form.Label>Title</Form.Label>
                           <Form.Text className="text-danger ml-2">
                       *
                       </Form.Text>
                       </div>
                       <Form.Control 
                       value={this.state.movie.Title} 
                       onChange={(e)=> this.setState({
                           ...this.state,
                           movie:{
                               ...this.state.movie,
                               Title: e.target.value
                           }
                       })} 
                       required type="text" 
                       placeholder="Enter Title" />
                   </Form.Group>

                   <label className="p-0 d-flex mb-2" for="image">                                     
                        <input 
                        onClick={(e)=> {e.stopPropagation()
                                return true}}  
                        hidden
                        type="file"
                        id="image"
                        ref={this.ref}
                        onChange={(e) => {this.setState({
                                    movie:{
                                    ...this.state.movie, 
                                    image: e.target.files[0]}
                                })
                                console.log(e.target.files[0])}}
                        />
                    </label> 
                    <button
                        onClick={()=> this.ref.current.click()}
                        variant="secondary"
                        className=" mb-4"
                        style={{backgroundColor:"red"}}
                    >
                        Upload Poster
                    </button>  

                   <Form.Group>

                   <InputGroup className="mb-3">
                           <InputGroup.Prepend>                            
                               <InputGroup.Text>Year and Type <span className="ml-2 text-danger">*</span></InputGroup.Text>
                           </InputGroup.Prepend>
                           <FormControl 
                           placeholder="Year" 
                           type='number'
                           min='1900'
                           value={this.state.movie.Year} 
                           onChange={(e)=> this.setState({
                            ...this.state,
                            movie:{
                                ...this.state.movie,
                                Year: e.target.value
                            }
                        })}  
                           required  />
        
                           <FormControl placeholder="Type" 
                           value={this.state.movie.Type} 
                           onChange={(e)=> this.setState({
                            ...this.state,
                            movie:{
                                ...this.state.movie,
                                Type: e.target.value
                            }
                        })}  
                           required />
                          
                       </InputGroup>
                   </Form.Group>

                   <Form.Text className="text-danger ml-2">
                       * Fields are required
                       </Form.Text>

                   <Button variant="primary" type="submit" >
                       Submit
                   </Button>
               </Form>

               </Col>
           </Row>
       </Container>
   )
}
   
}

export default AddMovie