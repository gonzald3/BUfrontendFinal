import React, { useEffect, useState, useCallback } from 'react'
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom"
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import moment from "moment"
import Alert from 'react-bootstrap/Alert';
import background from "../imgs/network.jpg";
import AOS from 'aos';
import 'aos/dist/aos.css';
import PersonList from './PersonList';

const Home = () => {

    const [data, setData] = useState([]);

    const [show, setShow] = useState(false);

    const [userAuth, setUserAuth] = useState([]);

    let loadUser = null;

  loadUser = useCallback(async () => {
    try {

      const authenticatedUser = JSON.parse(localStorage.getItem('auth'));

      if(authenticatedUser){
        setUserAuth( authenticatedUser);
      }
    } catch (error) {
      console.log("error");
    }
  }, [])
  

  useEffect(() => {
    AOS.init();
    loadUser()
  }, [loadUser])

    

    if(userAuth.email === "admin@admin.com"){
        //console.log(userAuth.username);
                return (
                    <PersonList />
                       
                );
        }
        else{

            
            return(
                <>
                <div style={{backgroundColor: '#FCFFDB'}}>
                    <div className="container mt-2">
                            <h1>Welcome to Friend Space</h1>
                            
                            
                            
                    </div>
                    <img data-aos="fade-right" style={{width: "100%",opacity: 0.5}} src={background}></img>
                </div>
                </>
            )
        }

}

export default Home