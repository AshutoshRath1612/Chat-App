import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";

const Contacts = ( {contacts, currentUser ,changeChat} ) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  let sent = "";
  

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
    console.log(contacts);
    if (currentUser) {
      setCurrentUserImage(sent);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={logo} alt="" />
            <h3>Chatty</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              let receive = "";
              if (
                contact.avatarImage !== undefined &&
                contact.photoImage !== undefined
              )
                receive = contact.photoImage;
              else if (
                contact.avatarImage !== undefined &&
                contact.photoImage === undefined)
              receive = `data:image/svg+xml;base64 , ${contact.avatarImage}`;
              else
              receive = contact.photoImage;
              console.log(contact)
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={()=>changeCurrentChat(index,contact)}
                >
                  <div className="avatar">
                    <img
                      src={receive}
                      alt="avatar"
                      style={{borderRadius:"50%"}}
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.name}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={sent}
                alt="avatar"
                style={{borderRadius: "50%"}}
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar{
        width:0.2rem;
        &-thumb{
            background-color: #ffffff39;
            border-radius:1rem;
        }
    }
    .contact {
      background-color: #ffffff39;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .usernmae {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9186f3;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width:720px) and (max-width:1080px){
       gap:0.5rem;
       .username{
        h2{
            font-size:1rem;
        }
       }
    }
  }
`;
export default Contacts;
