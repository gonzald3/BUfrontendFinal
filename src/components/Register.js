import React, { useState, useRef} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import validator from "validator";
import {useNavigate} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
//import bcrypt from 'bcrypt';

const Register = () => {

    const fullnameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const [file,setFile] = useState("");


    const history = useNavigate();

    //gets from the form refs
    const getInputs = () => {
        const fullname = fullnameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        return { fullname, email, password , confirmPassword };
    }


    //Validation System
    const isValidSignUp = ({fullname , email, password, confirmPassword }) => {
        if (validator.isEmpty(fullname)) {
            alert("Please input your fullname");
            return false;
        }
        if (!validator.isEmail(email)) {
            alert("Please input your email");
            return false;
        }
        if (validator.isEmpty(password) || !validator.isLength(password, { min: 6 })) {
            alert("Please input your password. You password must have at least 6 characters");
            return false;
        }
        if (validator.isEmpty(confirmPassword)) {
            alert("Please input your confirm password");
            return false;
        }
        if (password !== confirmPassword) {
            alert("Confirm password and password must be the same");
            return false;
        }
          return true;
    };

    const createFormData = ({ userUuid, email, password, fullname }) => {
        const formData = new FormData();
        formData.append('id', userUuid);
        formData.append("image",file)
        formData.append("fname",fullname);
        formData.append("email",email);
        formData.append("passkey",password);
            return formData;
      }


    const createUser = async({userUuid, email, password, fullname }) => {
        
        const config = {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }

        const formData = createFormData({ userUuid, email, password, fullname });

        const res = await axios.post("https://bubackendfinal-production.up.railway.app/register",formData,config);
        if(res.data.status == 201){
            history("/login")
        }else{
            console.log("error")
        }       

    };

    //set the image file from the server
    const setimgfile = (e)=>{
        setFile(e.target.files[0])
    }

    

    const addUserData = async(e)=>{
        e.preventDefault();
        const { fullname, email, password, confirmPassword } = getInputs();
        
        if(isValidSignUp({fullname, email, password, confirmPassword })){

            const userUuid = uuidv4();
            const response = await createUser({ userUuid, email, password, fullname });
            if(response && response.data.message){
                alert(response.data.message);
            }

        }

    }

    return (
        <>
            <div className='container mt-3'>
                <h1>Upload Your Img Here</h1>

                <Form>
                    <Form.Group className="mb-3" >
                        <Form.Label>UserName</Form.Label>
                        <Form.Control type="text"  placeholder="Username"  ref={fullnameRef} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name='email' placeholder="Email"  ref={emailRef} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='passkey' placeholder="Password"  ref={passwordRef} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Control type="password" placeholder="Confirm Password" ref={confirmPasswordRef} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Select Your Image</Form.Label>
                        <Form.Control type="file" name='photo' onChange={setimgfile} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={addUserData}>
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default Register