import React, { useRef ,useEffect} from "react";
import styled from "styled-components";
import {v4 as uuidv4} from 'uuid';

const Messages = ({ messages }) => {
  const scrollref = useRef();
  
  useEffect(()=>{
    scrollref.current?.scrollIntoView({behavior: "smooth"});
  },[messages])
  return (
    <Container>
      <div className="chat-messages" ref={scrollref}>
        {messages.map((element) => {
          return (
            <div key={uuidv4(JSON.stringify(element.message) , uuidv4.URL)}>
              <div 
                className={`message ${element.fromSelf ? "sent" : "received"}`}
              >
                <div  className="content">
                  <p >{element.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

const Container = styled.div`

overflow: auto;
.chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
   
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sent {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
  &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
`;

export default Messages;
