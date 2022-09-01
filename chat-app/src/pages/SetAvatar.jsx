import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { SetAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif";

const SetAvatar = () => {
  const api = "https://api.multiavatar.com";
  const navigate = useNavigate();
  const [avatar, setavatar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setselectedAvatar] = useState(undefined);

  const toastOptions = {
    theme: "dark",
    draggable: "true",
    position: "top-right",
    autoClose: "5000",
    hideProgressBar: "false",
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toast);
    }
    else{
        const user = await JSON.parse(localStorage.getItem('chat-app-user'));
        console.log(user._id)
        const {data}= await axios.post(`${SetAvatarRoute}/${user._id}`,{
            image : avatar[selectedAvatar],
        })
        if(data.isSet){
            user.isAvatarImageSet = true;
            user.avatarImage =data.image;
            localStorage.setItem('chat-app-user',JSON.stringify(user));
            navigate('/');
        }
        else{
            toast.error('Error setting Avatar. Please try again.',toastOptions)
        }
    }
  };

  useEffect(() => {
    async function fetchData() {
    
      const data = [];
      for (let i = 0; i < 5; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setavatar(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);
  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatar.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64, ${avatar}`}
                    alt="avatar"
                    onClick={() => setselectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={()=>setProfilePicture()}>
            Set as Profile Picture
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-initial-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;

export default SetAvatar;