import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import { useState } from 'react'
import { Container } from 'react-bootstrap'
import Header from "./components/Header";
import Movies from "./components/Movies";
import MyNav from "./components/MyNav";
import ShowDetail from './components/ShowDetail'
import Registration from './components/Registration'
import RegisterDetails from './components/RegisterDetails'

const App = ()=> {

  const [search, setSearch] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState(0)
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postal, setPostal] = useState(0)

  const newSearch = (data) =>{
    setSearch(data)
  }
  const newName = (data) =>{
    setName(data)
  }
  const newSurname = (data) =>{
    setSurname(data)
  }
  const newEmail = (data) =>{
    setEmail(data)
  }
  const newAge = (data) =>{
    setAge(data)
  }
  const newAddress = (data) =>{
    setAddress(data)
  }
  const newCity = (data) =>{
    setCity(data)
  }
  const newPostal = (data) =>{
    setPostal(data)
  }

  return (
    <>

    <Router>
    <MyNav searchValue={newSearch}/>
    < Route exact path="/" component ={Header}/>
    <Container fluid>
    <Route path="/" exact render={(routerProps)=> <Movies {...routerProps} id='harry-potter' movieName={search?search:'harry%20potter'} movieTitle={search?search:'Harry Potter'}/>}/>
      {search?'':
      <>
      <Route path="/" exact render={(routerProps)=><Movies {...routerProps} id='lotr' movieName='Lord+of+the+rings' movieTitle='Lord of the Rings'/> }/>
      <Route path="/" exact render={(routerProps)=> <Movies {...routerProps} id='batman' movieName='Batman' movieTitle='Batman'/> }/>
      <Route path="/" exact render={(routerProps)=> <Movies {...routerProps} id='avengers' movieName='Avengers' movieTitle='Avengers'/>}/>
      </>
      }      
    </Container>

    <Route path="/registration" render={(routerProps) => <Registration {...routerProps} 
    name={newName} surname={newSurname} email={newEmail} 
    age={newAge} address={newAddress} city={newCity} postal={newPostal} />}/>

    <Route path="/register/complete" render ={(routerProps) => <RegisterDetails {...routerProps} 
     name={name} surname={surname} email={email} 
     age={age} address={address} city={city} postal={postal} />}/>

    <Route path="/details/:movieID" render={(routerProps) => <ShowDetail {...routerProps} title="hello"/>}/>
    </Router>
     
    </>
  )
}

export default App;
