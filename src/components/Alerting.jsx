import { Alert } from 'react-bootstrap'
const Alerting =(props)=>{
    
    return(
        <Alert className={props.class}  variant={props.color}>
            {props.msg}
        </Alert>
    )
}

export default Alerting