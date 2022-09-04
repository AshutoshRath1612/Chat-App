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
  const [image,setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setselectedAvatar] = useState(undefined);
  const [selectedImage, setselectedImage] = useState(undefined);

  const toastOptions = {
    theme: "dark",
    draggable: "true",
    position: "top-right",
    autoClose: "5000",
    hideProgressBar: "false",
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined && selectedImage === undefined) {
      toast.error("Please select an avatar", toast);
    }
    else{
        const user = await JSON.parse(sessionStorage.getItem('chat-app-user'));
        let imagee =""; let photo="";
        
        if(selectedAvatar===undefined)
            imagee = "undefined";
        else
            imagee = avatar[selectedAvatar];
        if(selectedImage===undefined)
            photo = "undefined";
        else{
            photo  = image[selectedImage]
            console.log(photo)
            console.log(image[selectedImage])
        }

        console.log(photo)
        const {data}= await axios.post(`${SetAvatarRoute}/${user._id}`,{
            image : imagee,
            photo : photo,
        })
        if(data.isSet){
            user.isAvatarImageSet = true;
            user.avatarImage =data.image;
            user.photoImage = data.photo;
            sessionStorage.setItem('chat-app-user',JSON.stringify(user));
            navigate('/');
        }
        else{
            toast.error('Error setting Avatar. Please try again.',toastOptions)
        }
    }
  };

  const previewHandler =(e)=>{
    var reader = new FileReader();
  reader.onloadend = function() {
    const result = reader.result;
    setImage(oldImage=> [...oldImage ,result]);
  }
  reader.readAsDataURL(e.target.files[0]);
  }

  useEffect(() => {
    async function fetchData() {
    try{
      for (let i = 0; i < 5; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        console.log(image)
        setavatar(data => [...data , buffer.toString("base64")]);
      }
      setIsLoading(false);
    }catch(err){
      setIsLoading(false);
      console.log(err);
    }
    }
      
    fetchData();
  }, []);
  
  console.log(image)
  
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
          <div className="avatars" id="avatars">
              {
                image.map((avatar ,index)=>{
                  return(
                    <div key={index}
                    className={`avatar ${
                      selectedImage ===index ? "selected" : ""}`}>
                        <img src={avatar}
                        alt="imagee" 
                        style={{borderRadius: "50%"}}
                        onClick={()=>setselectedImage(index)}
                        />
                      
                    </div>
                  )
                }
              )}
          </div>
          <input type="file" accept=".png, .jpg, .jpeg" className="input-btn" onChange={(e)=>previewHandler(e)} />
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
    @media screen and (max-width:600px){
      h1{

        font-size: 1.5rem;
      }
    }
  }

  .avatars {
    display: flex;
    flex-wrap: wrap;
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
      @media screen and (max-width:600px){
      img{
        height: 4rem;
      }
    }
      @media screen and (max-width:450px){
      img{
        height: 3rem;
      }
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
  .input-btn{
    background-color: red;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    width: 11rem;
    transition: 0.5s ease-in-out;
    
    &:hover {
      background-color: #4e0eff;
    }
  }
  .input-btn::before {
    content: 'Select From Device';
    
  }
  .input-btn::-webkit-file-upload-button{
    visibility: hidden;
  }
`;

export default SetAvatar;
