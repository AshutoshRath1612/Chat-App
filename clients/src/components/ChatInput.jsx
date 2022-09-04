import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

const ChatInput = ({handleSendMsg}) => {
  const [showEmojiPicker, setEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () => {
    setEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emoji) => {
    setMsg(msg + emoji.emoji);
  };

  const sendChat =(e)=>{
    e.preventDefault();
    if(msg.length >0){
      handleSendMsg(msg);
      setMsg('');
    }
  }

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill
            onClick={() => {
              handleEmojiPickerHideShow();
            }}
          />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form  onSubmit={(e)=>sendChat(e)} className="input-container">
        <input
          type="text"
          placeholder="Enter your text here"
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  height: 4rem;
  align-items: center;
  background: linear-gradient(179deg, #1c112a ,#242444, #1c112a);
  padding: 1rem 2rem;
  padding-bottom: 0.3rem;
  @media screen and (max-width:1072px){
    padding-bottom: 2rem;
  }
  @media screen and (max-width:710px){
    height:2rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: greenyellow;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px lightblue;
        border-color: lightblue;
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: lightblue;
          box-shadow: -1px 1px 6px 0px lightblue;
          margin-bottom: 7px;
        }
        .emoji-group::before {
          background-color: #080420;
        }
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #0b0b2c;
          width: 5px;
          &-thumb {
            background-color: purple;
          }
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-content: center;
    gap: 2rem;
    background-color: #242424;
    input {
      width: 90%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: lightblue;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      background-color: #9a86f3;
      cursor: pointer;
      svg {
        font-size: 2rem;
        color: white;
      }
    }
    @media screen and (max-width:710px){
      input{
        width: 105%;
      }
      button{
        padding: 0rem 0.5rem;
      }
    }
  }
`;

export default ChatInput;
