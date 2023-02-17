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

function handleDecline() {
  // Do something when the decline button is clicked
  console.log('Decline button clicked');
}

function handleConfirm() {
  // Do something when the confirm button is clicked
  console.log('Confirm button clicked');
}
const UserConnection = () => {
  return (
    <>
      <div className='userconnection'>
        <b className='fontsize'>Requests</b>
        <div className='request-section'>
          <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={6}>
            <div className='rectangle-1'>         
                <img className='image' alt='image 'src={Person}></img>
                <h3>Bobby Thorn</h3>                
                <p>Software Engineer</p>
                <p>Montreal, QC</p>
                <Button className='decline-button' style={{ borderRadius: 40, backgroundColor: "rgb(255,0,0)", fontSize: 10}} onClick={handleDecline}> Decline </Button>
                <Button className='confirm-button' style={{ borderRadius: 40, backgroundColor: "rgb(0, 181, 0)", fontSize: 10}} onClick={handleConfirm}> Confirm </Button>              
            </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <div className='rectangle-2'>              
                <img className='image' alt='image 'src={Person1}></img>
                <h3>Helena Thomby</h3>
                <p>Software Engineer</p>
                <p>Montreal, QC</p>
                <Button className='decline-button' style={{ borderRadius: 40, backgroundColor: "rgb(255,0,0)", fontSize: 10}} onClick={handleDecline}> Decline </Button>
                <Button className='confirm-button' style={{ borderRadius: 40, backgroundColor: "rgb(0, 181, 0)", fontSize: 10 }} onClick={handleConfirm}> Confirm </Button>              
            </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <div className='rectangle-3'>              
                <img className='image' src={Person2}></img>
                <h3>Julian Bory</h3>
                <p>Software Engineer</p>
                <p>Montreal, QC</p>
                <Button className='decline-button' style={{ borderRadius: 40, backgroundColor: "rgb(255,0,0)", fontSize: 10}} onClick={handleDecline}> Decline </Button>
                <Button className='confirm-button' style={{ borderRadius: 40, backgroundColor: "rgb(0, 181, 0)", fontSize: 10}} onClick={handleConfirm}> Confirm </Button>              
            </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <div className='rectangle-4'>              
                <img className='image' src={Person3}></img>
                <h3>Harold Figma</h3>
                <p>Software Engineer</p>
                <p>Montreal, QC</p>
                <Button className='decline-button' style={{ borderRadius: 40, backgroundColor: "rgb(255,0,0)", fontSize: 10}} onClick={handleDecline}> Decline </Button>
                <Button className='confirm-button' style={{ borderRadius: 40, backgroundColor: "rgb(0, 181, 0)", fontSize: 10}} onClick={handleConfirm}> Confirm </Button>              
            </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <div className='rectangle-5'>
                <img className='image' src={Person4}></img>              
                <h3>Mary Johnson</h3>
                <p>Software Engineer</p>
                <p>Montreal, QC</p>
                <Button className='decline-button' style={{ borderRadius: 40, backgroundColor: "rgb(255,0,0)", fontSize: 10}} onClick={handleDecline}> Decline </Button>
                <Button className='confirm-button' style={{ borderRadius: 40, backgroundColor: "rgb(0, 181, 0)", fontSize: 10}} onClick={handleConfirm}> Confirm </Button>              
            </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <div className='rectangle-6'> 
                <img className='image' src={Person5}></img>             
                <h3>Leon Martie</h3>
                <p>Software Engineer</p>
                <p>Montreal, QC</p>
                <Button className='decline-button' style={{ borderRadius: 40, backgroundColor: "rgb(255,0,0)", fontSize: 10}} onClick={handleDecline}> Decline </Button>
                <Button className='confirm-button' style={{ borderRadius: 40, backgroundColor: "rgb(0, 181, 0)", fontSize: 10}} onClick={handleConfirm}> Confirm </Button>              
            </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <div className='rectangle-7'>
                <img className='image' src={Person6}></img>              
                <h3>Sheldon Helere</h3>
                <p>Software Engineer</p>
                <p>Montreal, QC</p>
                <Button className='decline-button' style={{ borderRadius: 40, backgroundColor: "rgb(255,0,0)", fontSize: 10}} onClick={handleDecline}> Decline </Button>
                <Button className='confirm-button' style={{ borderRadius: 40, backgroundColor: "rgb(0, 181, 0)", fontSize: 10}} onClick={handleConfirm}> Confirm </Button>              
            </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <div className='rectangle-8'> 
                <img className='image' src={Person7}></img>              
                <h3>Lilly Liones</h3>
                <p>Software Engineer</p>
                <p>Montreal, QC</p>
                <Button className='decline-button' style={{ borderRadius: 40, backgroundColor: "rgb(255,0,0)", fontSize: 10}} onClick={handleDecline}> Decline </Button>
                <Button className='confirm-button' style={{ borderRadius: 40, backgroundColor: "rgb(0, 181, 0)", fontSize: 10}} onClick={handleConfirm}> Confirm </Button>              
            </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <div className='rectangle-9'>
                <img className='image' src={Person8}></img>               
                <h3>Rino Caldin</h3>
                <p>Software Engineer</p>
                <p>Montreal, QC</p>
                <Button className='decline-button' style={{ borderRadius: 40, backgroundColor: "rgb(255,0,0)", fontSize: 10}} onClick={handleDecline}> Decline </Button>
                <Button className='confirm-button' style={{ borderRadius: 40, backgroundColor: "rgb(0, 181, 0)", fontSize: 10}} onClick={handleConfirm}> Confirm </Button>              
            </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <div className='rectangle-10'> 
                <img className='image' src={Person9}></img>              
                <h3>Lisa Lysa</h3>
                <p>Software Engineer</p>
                <p>Montreal, QC</p>
                <Button className='decline-button' style={{ borderRadius: 40, backgroundColor: "rgb(255,0,0)", fontSize: 10}} onClick={handleDecline}> Decline </Button>
                <Button className='confirm-button' style={{ borderRadius: 40, backgroundColor: "rgb(0, 181, 0)", fontSize: 10}} onClick={handleConfirm}> Confirm </Button>              
            </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <div className='rectangle-11'> 
              <img className='image' src={Person10}></img>              
                <h3>Kurt Mennan</h3>
                <p>Software Engineer</p>
                <p>Montreal, QC</p>
                <Button className='decline-button' style={{ borderRadius: 40, backgroundColor: "rgb(255,0,0)", fontSize: 10}} onClick={handleDecline}> Decline </Button>
                <Button className='confirm-button' style={{ borderRadius: 40, backgroundColor: "rgb(0, 181, 0)", fontSize: 10}} onClick={handleConfirm}> Confirm </Button>              
            </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <div className='rectangle-12'> 
              <img className='image' src={Person11}></img>              
                <h3>Hilary Lee</h3>
                <p>Software Engineer</p>
                <p>Montreal, QC</p>
                <Button className='decline-button' style={{ borderRadius: 40, backgroundColor: "rgb(255,0,0)", fontSize: 10}} onClick={handleDecline}> Decline </Button>
                <Button className='confirm-button' style={{ borderRadius: 40, backgroundColor: "rgb(0, 181, 0)", fontSize: 10}} onClick={handleConfirm}> Confirm </Button>              
            </div>
            </Grid>            
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