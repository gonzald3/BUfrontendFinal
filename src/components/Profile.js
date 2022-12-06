import { useState, useEffect, useCallback } from 'react';
import Card from 'react-bootstrap/Card';
import background from "../imgs/network.jpg";
import AOS from 'aos';
import 'aos/dist/aos.css';


const Profile = (props) => {

  const [data, setData] = useState([]);
  
  let loadUser = null;

  loadUser = useCallback(async () => {
    try {

      const authenticatedUser = JSON.parse(localStorage.getItem('auth'));

      if(authenticatedUser){
        setData( authenticatedUser);
      }
    } catch (error) {
      console.log("error");
    }
  }, [])
  

  useEffect(() => {
    AOS.init();
    loadUser()
  }, [loadUser])

 
  if(data.username){
  return (
    <div>
      


      <div className='container mt-3'>
                <h1>{data.username}</h1>
                <div>
                  <div>
                  {data.username && <Card.Img variant="top" src={data.userimg} style={{ width: '100px', textAlign: "center", margin: "auto" }} className="mt-2" />
                  
                  }
                    

                    
                  </div>
              

                  
                  <div>{data.email}</div>

                </div>

                
        </div>





  

    </div>
  );
                } else{
                  return(
                    <>
                    <div style={{backgroundColor: '#FCFFDB'}}>
                      <div className='container mt-3' >
                        <h1>Please Login</h1>
                        
                      </div>
                      <img data-aos="fade-right" style={{width: "100%",opacity: 0.5}} src={background}></img>
                      
                    </div>
                    </>
                  );
                }


};
export default Profile;