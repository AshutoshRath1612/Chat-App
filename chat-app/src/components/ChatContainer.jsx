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
      socket.current.on('msg-receive' ,(msg)=>{
        setArrivalMsg({fromSelf:false ,message:msg});
      });
    }
  },[])

  useEffect(()=>{
    arrivalMsg && setmessages((prev)=>  [...prev ,arrivalMsg])
  },[arrivalMsg]);
  


  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <Messages messages={messages} />
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
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  
`;

export default ChatContainer;
