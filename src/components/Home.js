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












    const getUserData = async () => {
        const res = await axios.get("/getdata", {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.data.status == 201) {
            console.log("data get");
            setData(res.data.data)

        } else {
            console.log("error")
        }
    }


    const dltUser = async (id) => {
        console.log(id)
        const res = await axios.delete(`/${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.data.status == 201) {
            getUserData()
            setShow(true)
        } else {
            console.log("error")
        }
    }

    useEffect(() => {
        getUserData()
    }, [])

    

    if(userAuth.email === "admin@admin.com"){
        //console.log(userAuth.username);
                return (
                    <> 
                        {
                            show ? <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                                User Delete
                            </Alert> : ""
                        }
                        <div className="container mt-2">
                        <h1>Administrator</h1>

                            

                            <div id="card-div" className="row">
                                {
                                    data.length > 0 ? data.map((el, i) => {
                                        return (
                                            <>
                                            <div className="col-12  col-lg-4">
                                                <Card className="mb-3">
                                                    <Card.Img variant="top" src={`/uploads/${el.userimg}`} style={{ width: '100px', textAlign: "center", margin: "auto" }} className="mt-2" />
                                                    <Card.Body className='text-center'>
                                                        <Card.Title>UserName : {el.username}</Card.Title>
                                                        <Card.Title>UserName : {el.email}</Card.Title>
                                                        <Card.Text>
                                                            Date Added : {moment(el.date).format("DD-MM-YYYY")}
                                                        </Card.Text>
                                                        <Button variant="danger" onClick={() => dltUser(el.id)} className='col-lg-6 text-center'>Delete</Button>
                                                    </Card.Body>
                                                </Card>
                                            </div>
                                            </>
                                        )
                                    }) : ""
                                }

                            </div>
                        </div>
                    </>
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