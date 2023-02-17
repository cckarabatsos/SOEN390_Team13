import React from 'react'
import SubFooter from '../components/SubFooter'
import Footer from '../components/Footer'
import '../styles/components/userconnection.css'
import {Button} from '@material-ui/core'
import {Grid } from "@material-ui/core";
import Person from "../assets/UserConnectionImages/image.jpg"
import Person1 from "../assets/UserConnectionImages/image (1).jpg"
import Person2 from "../assets/UserConnectionImages/image (2).jpg"
import Person3 from "../assets/UserConnectionImages/image (3).jpg"
import Person4 from "../assets/UserConnectionImages/image (4).jpg"
import Person5 from "../assets/UserConnectionImages/image (5).jpg"
import Person6 from "../assets/UserConnectionImages/image (6).jpg"
import Person7 from "../assets/UserConnectionImages/image (7).jpg"
import Person8 from "../assets/UserConnectionImages/image (8).jpg"
import Person9 from "../assets/UserConnectionImages/image (9).jpg"
import Person10 from "../assets/UserConnectionImages/image (10).jpg"
import Person11 from "../assets/UserConnectionImages/image (11).jpg"
import UserConnectionComponent from '../components/UserConectionComponent'
import { GetPendingInvitation } from '../api/userConectionApi'

function handleDecline() {
  // Do something when the decline button is clicked
  console.log('Decline button clicked');
}

function handleConfirm() {
  // Do something when the confirm button is clicked
  console.log('Confirm button clicked');
}


const users = [
  {
    name: 'Margeret Thatcher',
    job: 'Software Engineer',
    location: 'Montreal, QC',
    image: Person,
    id:1
  },
  {
    name: 'Helena Thomby',
    job: 'Software Engineer',
    location: 'Montreal, QC',
    image: Person1,
    id:2
  },
  {
    name: 'Helena Thomby',
    job: 'Software Engineer',
    location: 'Montreal, QC',
    image: Person1,
    id:3
  },
  // Add more users here
];










const UserConnection =() => {

  
  console.log(users.length)
  return (
    <>
      <div className='userconnection'>
        <b className='fontsize'>Requests</b>
        <div className='request-section'>
          <Grid container spacing={3}>
          

            {
            users.map((aUser)=>(
              
              <UserConnectionComponent
              key={aUser.id}
              name={aUser.name}
              job ={aUser.job}
              location= {aUser.location}>


              </UserConnectionComponent>









            ))}
          
          </Grid>
          <Button>Show More</Button>
        </div>
      </div>
      <SubFooter />
      <Footer />
    </>
  )
}

export default UserConnection