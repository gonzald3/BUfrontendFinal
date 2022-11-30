import { useEffect, useRef, useContext } from "react";
import validator from "validator";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Context from "../context";


const Login = (props) => {
  
    const { setUser } = useContext(Context);
  
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
  
    const history = useNavigate();
  
    useEffect(() => { 
     // const authenticatedUser = JSON.parse(localStorage.getItem('auth'));
    //   if (authenticatedUser) { 
    //     history.push('/');
    //   }
    }, [history]);
  
    const getInputs = () => {
      const email = emailRef.current.value;
      const passkey = passwordRef.current.value;
      return { email, passkey };
    };
  
    const isUserCredentialsValid = (email, passkey) => {
      return validator.isEmail(email) && passkey;
    };
  
  
    const signin = async (email, passkey) => {
      //const url = 'http://localhost:7840/login';
      const url = 'https://arcane-plateau-71865.herokuapp.com/login';
      return await axios.post(url, { email, passkey });
    }


    const login = async (e) => {
        e.preventDefault();
        const { email, passkey } = getInputs();
        
        if (isUserCredentialsValid(email, passkey)) {
            const authenticatedUser = await signin(email, passkey);
            console.log(authenticatedUser.data)
            if (authenticatedUser.data.email == email) {
                localStorage.setItem('auth', JSON.stringify(authenticatedUser.data));
                setUser(authenticatedUser.data);
                history("/profile");
            } else {
                alert(authenticatedUser.data.message);
            }
        }else{
            alert("Username is invalid");
        }
    };
  
    return (
      <div>
        


        <div className='container mt-3'>
                <h1>Login</h1>

            <Form>
                    <Form.Group className="mb-3" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text"  placeholder="Email" ref={emailRef}  />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"  placeholder="Password" ref={passwordRef} />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={login}>
                        Login
                    </Button>
            </Form>


            






                
        </div>






      </div>
    );
  }
  
  export default Login;