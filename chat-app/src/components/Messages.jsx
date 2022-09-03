import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const Messages = ({ messages, currentChat, currentUser }) => {
  const scrollref = useRef();

  let sent = "";
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

  if (
    currentUser.avatarImage !== undefined &&
    currentUser.photoImage !== undefined
  )
      sent = currentUser.photoImage;
  else if (
    currentUser.avatarImage !== undefined &&
    currentUser.photoImage === undefined
  )
    sent = `data:image/svg+xml;base64 , ${currentUser.avatarImage}`;
  else if (
    currentUser.avatarImage === undefined &&
    currentUser.photoImage !== undefined
  )
    sent = currentUser.photoImage;


  
    useEffect(() => {
      scrollref.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
  return (
    <Container>
      <div className="chat-messages" ref={scrollref}>
        {messages.map((element) => {
          return (
            <div key={uuidv4(JSON.stringify(element.message), uuidv4.URL)}>
              <div
                className={`message ${element.fromSelf ? "sent" : "received"}`}
              >
                <div className="content">
                  <p>{element.message}</p>
                </div>
                <img style={{borderRadius:"50%"}}
                  src={ 
                    element.fromSelf
                      ? sent
                      : receive
                  }
                  alt=""
                />
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
    margin-top: 1rem;
    .message {
      display: flex;
      align-items: center;
      img {
        height: 4rem;
      }
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
        p {
          margin: 0;
        }
      }
    }
    .sent {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .received {
      justify-content: flex-end;
      flex-direction: row-reverse;
      .content {
        background-color: #cc16164a;
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
