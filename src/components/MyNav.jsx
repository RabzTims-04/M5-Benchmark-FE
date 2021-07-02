import { Navbar, Nav, NavDropdown, FormControl } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { Component } from 'react'
import logo from '../assets/netflix_logo.png'
import avatar from '../assets/avatar.png'
import '../css/MyNav.css'

class MyNav extends Component{

    state = {
        search:false, 
        searchValue:''
    }

    inputChange = (e)=>{
        this.setState({
            ...this.state,
            searchValue:e.target.value.toLowerCase()
        })
    }

    componentDidUpdate = () =>{   
            this.props.searchValue(this.state.searchValue)
            console.log(this.state.searchValue)        
    }

    render(){       
        
        return (            
            
            <Navbar collapseOnSelect expand="lg" variant="dark">
            <Navbar.Brand href="#home"><Link to="/"><img className='navbar-logo' src={logo} alt='netflix logo'/></Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Link to="/">
                    <div className={this.props.location.pathname==='/' ? 'nav-link active' : 'nav-link'}>Home</div>
                </Link>
                <Nav.Link href="#pricing">TV Shows</Nav.Link>
                <Nav.Link href="#pricing">Movies</Nav.Link>
                <Nav.Link href="#pricing">Recently Added</Nav.Link>
                <Nav.Link href="#pricing">MyList</Nav.Link>
                <Link to="/registration">
                    <div className={this.props.location.pathname === '/registration' ? 'nav-link active' : 'nav-link'}>
                        Registration
                    </div>
                </Link>
                </Nav>

                <Nav>
                <div className="d-flex">
                    <div className="d-flex mt-2 pr-3">
                    <FormControl
                        type="search"
                        value={this.state.searchValue}
                        onChange={(e)=> this.inputChange(e)}
                        placeholder="Search"
                        className="mt-1 search-input"
                        style={this.state.search?{visibility:'visible'}:{visibility:'hidden'}}
                        onMouseLeave={()=>this.setState({...this.state,search:false})}
                        aria-label="Search"
                        />
                <Nav.Link href="/">
                <svg
                    onMouseEnter={()=>this.setState({...this.state,search:true})}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="white"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                    >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
                </Nav.Link>
                <Nav.Link className="px-3" href="/">KIDS</Nav.Link>
                <Nav.Link href="/">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-bell-fill bell"
                    viewBox="0 0 16 16"
                    >
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                </svg>
                </Nav.Link>
                </div>
                <Nav.Link eventKey={2} href="/">
                    <NavDropdown className="userDropdown" title={<img className="avatar" src={avatar} alt="avatar"/>} id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/">Action</NavDropdown.Item>
                    <NavDropdown.Item href="/">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="/">Something</NavDropdown.Item>
                </NavDropdown>
                </Nav.Link>
                </div>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
    
}

}

export default withRouter(MyNav)