/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState ,useEffect ,useRef} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { alluserRoutes ,host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from 'socket.io-client';



function Chat() {
  const socket =useRef();
  const navigate =useNavigate();
  const [contacts,setContacts] = useState([]);
  const [currentUser,setCurrentUser]= useState(undefined);
  const [currentChat, setcurrentChat] = useState(undefined);
  const [isLoaded ,setIsLoaded] = useState(false);
  useEffect(()=>{
    async function fetchData(){
      if(!sessionStorage.getItem('chat-app-user')){
        navigate('/login')
      }else{
        setCurrentUser(await JSON.parse(sessionStorage.getItem('chat-app-user')))
        setIsLoaded(true);
      }
    }
    fetchData();
  },[]);
  
 
   useEffect(()=>{
    if(currentUser){
      socket.current =io(host);
      socket.current.emit('add-user', currentUser._id);
    }
   },[currentUser])

  useEffect(()=>{
    async function fetchData2(){
    if(currentUser){
      
      if(currentUser.isAvatarImageSet){
        const data= await axios.get(`${alluserRoutes}/${currentUser._id}`)
        setContacts(data.data);
      }
      else{
        navigate('/setavatar');
      }
    }
  }
  
  fetchData2();
  },[currentUser]);

  const handleChatChange = (chat)=>{
    setcurrentChat(chat);
  }
  return (
    <>
    {isLoaded && (
    <Container>
      <div className="container">
        <Contacts 
        contacts={contacts} 
        currentUser={currentUser} 
        changeChat={handleChatChange}/>
       
        { isLoaded &&
          currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ): (
            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
          )
        }
      </div>
    </Container>
    )}
    </>
  )
}

const Container =styled.div`
  height:100vh;
  width:100vw;
  display:flex;
  flex-direction:column;
  justify-content:center;
  gap:1rem;
  align-items:center;
  background-color: #131324;
  .container{
    height:85vh;
    width:85vw;
    background-color:#00000076;
    display:grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width:720px) and (max-width:1080px){
      grid-template-columns: 35% 65%;
    }
    @media screen and (min-width: 560px) and (max-width:720px){
      grid-template-columns: 45% 55%;
    }
    @media screen and  (max-width:560px){
      grid-template-columns: 50% 50%;
    }
    @media screen and (max-width:400px){
    width: 107vw;
  }
  }
  @media screen and (max-width:400px){
    height: 107vh;
    width: 107vw;
  }
`;

export default Chat