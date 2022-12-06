import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import moment from "moment"
import Button from 'react-bootstrap/Button';

export default class PersonList extends React.Component {
  state = {
    persons: []
  }

   //Must return this functional component in Home.js
  componentDidMount() {
    axios.get(`https://bubackendfinal-production.up.railway.app/getdata`)
      .then(res => {
        const persons = res.data;
        //console.log(persons)
        this.setState({ persons });
      })
  }

  getData(){
    axios.get(`https://bubackendfinal-production.up.railway.app/getdata`)
      .then(res => {
        const persons = res.data;
        //console.log(persons)
        this.setState({ persons });
      })
  }

  //Must return this functional component in Home.js
  dltUser = (id, e) => {
    axios.delete(`https://bubackendfinal-production.up.railway.app/${id}`)
    .then(res => {
        console.log(res);
        const persons = this.state.persons;
        console.log(res.data);
        
        this.getData();

    })
  }
  
//   componentWillMount(){
//     axios.get('https://arcane-plateau-71865.herokuapp.com/getdata').then(res=>{
//         const persons = res.data;
//         this.setState({ state: persons })

//     })
// }
  

 //Must return this functional component in Home.js
  render() {
    let persons = this.state.persons.data
    console.log(persons)

    const results = [];

    if(persons){
        persons.forEach(person => {
            results.push(
                <div key={person.id}>
                    <div className="col-12  col-lg-4">
                <Card className="mb-3">
                        <Card.Body className='text-center'>
                            <div key={person.id}>{person.username}</div>
                            <Card.Img variant="top" src={person.userimg} style={{ width: '100px', textAlign: "center", margin: "auto" }} className="mt-2" />
                            <Card.Title>UserName : {person.username}</Card.Title>
                            <Card.Title>UserName : {person.email}</Card.Title>
                            <Card.Text>Date Added : {moment(person.date).format("DD-MM-YYYY")}</Card.Text>
                            <Button variant="danger" onClick={() => this.dltUser(person.id)} className='col-lg-6 text-center'>Delete</Button>
                    </Card.Body>
              </Card>
              </div>
                </div>
            )
        })
    }


    
    return (

        <div className="container mt-2">
        <h1>Administrator</h1>
        <div id="card-div" className="row">
        {results}
      </div>
      </div>
    )
  }
}

