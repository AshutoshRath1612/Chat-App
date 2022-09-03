import React, { useEffect,useRef,useState } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import Messages from "./Messages";
import axios from "axios";
import { sendMessgeRoutes,getAllMessgeRoutes } from "../utils/APIRoutes";



const ChatContainer = ({ currentChat , currentUser ,socket }) => {

  const [messages, setmessages] = useState([]);
  const [arrivalMsg ,setArrivalMsg]= useState(null);

  const scrollRef = useRef();
  // console.log(currentChat)
  useEffect(()=>{
    if(currentChat){
    async function allmessage(){
      const response =await axios.post(getAllMessgeRoutes,{
        from:currentUser._id,
        to:currentChat._id
      })
      setmessages(response.data);
    }
    allmessage();
   
 }},[currentChat])

  const handlesendmessage =async(msg)=>{
    await axios.post(sendMessgeRoutes,{
      from: currentUser._id,
      to: currentChat._id,
      message: msg
    });
    socket.current.emit('send-msg',{
      to: currentChat._id,
      from:currentUser._id,
      message:msg,
    })
    const msgs = [...messages];
    msgs.push({fromSelf:true,message :msg});
    setmessages(msgs);
  };

  useEffect(()=>{
    if(socket.current){
      console.log("User online")
      socket.current.on('msg-receive' ,(msg)=>{
        setArrivalMsg({fromSelf:false ,message:msg});
      });
    }
    else{
      console.log("User offline")
    }
  },[])

  useEffect(()=>{
    arrivalMsg && setmessages((prev)=>  [...prev ,arrivalMsg])
  },[arrivalMsg]);
  


  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  let receive = "";
  if (
    currentChat.avatarImage !== undefined &&
    currentChat.photoImage !== undefined
  )
    receive = currentChat.photoImage;
  else if (
    currentChat.avatarImage !== undefined &&
    currentChat.photoImage === undefined)
  receive = `data:image/svg+xml;base64 , ${currentChat.avatarImage}`;
  else
  receive = currentChat.photoImage;



  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img style={{borderRadius:"50%"}}
              src={receive}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.name}</h3>
            <h5>{currentChat.username}</h5>
          </div>
        </div>
        <Logout />
      </div>
      <Messages messages={messages} currentChat={currentChat} currentUser={currentUser} />
      <ChatInput handleSendMsg={handlesendmessage} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    margin-top: 1rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
        h5{
          color: blue
        }
      }
    }
  }
  
`;

export default ChatContainer;
