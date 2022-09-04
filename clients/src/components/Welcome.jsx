import React from 'react';
import styled from 'styled-components';
import robot from '../assets/robot.gif'

function Welcome({currentUser}) {
  return (
    <Container>
        <img src={robot} alt="Robot" />
        <h1>Welcome, <span>{currentUser.name}</span></h1>
        <h3>Please select a chat to start messaging</h3>
    </Container>
  )
}

const Container =styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
color:white;
img{
    height:20rem;
}
span{
    color:#4e0eff
}
@media screen and (max-width:500px){
  img{
    height: 15rem;
  }
  h1{
    font-size: 1.5rem;
  }
  h3{
    font-size: 1rem;
  }
}
@media screen and (max-width:400px){
  h1{
    font-size: 1rem;
  }
  h3{
    font-size: 0.8rem;
  }
}
`;
export default Welcome