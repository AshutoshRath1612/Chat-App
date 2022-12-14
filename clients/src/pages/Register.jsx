import React, { useState, useEffect } from "react";
import Tilty from "react-tilty";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {registerRoute} from "../utils/APIRoutes";


function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name:"",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidate()) {
      const { password, email, username ,name } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
        name
      });
      if(data.status===false){
        toast.error(data.msg,toastOptions)
      }
      if(data.status===true){
        localStorage.setItem('jwt',data.token)
        sessionStorage.setItem('chat-app-user', JSON.stringify(data.user));
         navigate('/');
      }
    }
  };
  useEffect(()=>{
    if(localStorage.getItem('chat-app-user')){
      navigate('/')
    }
  },[])
  const toastOptions = {
    theme: "dark",
    draggable: "true",
    position: "top-right",
    autoClose: "5000",
    hideProgressBar: "false",
  };
  const handleValidate = () => {
    const { password, email, confirmPassword, username ,name } = values;

    if (name==="" &&email === "" && password === "" && username === "") {
      toast.warning("Please Fill this up to register");
      return false;
    }
    if (name===""||email === "" || password === "" || username === "") {
      if (email === "") toast.warning("Please enter a email", toastOptions);

      if (password === "")
        toast.warning("Please enter a password", toastOptions);

      if (username === "")
        toast.warning("Please enter a username", toastOptions);

      if (name === "")
        toast.warning("Please enter a name", toastOptions);

      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password didnt match", toastOptions);
      console.log("Error");
      return false;
    } else if (username.length < 4) {
      toast.error("Username must be atleast of 4 character long", toastOptions);
      return false;
    } else if (name.length < 4) {
      toast.error("Name must be atleast of 4 character long", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password must be 8 character long", toastOptions);
      return false;
    }
    return true;
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <FormContainer>
        <div className="formContainer">
          <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
          </div>
          <Tilty reverse axis="x" scale={1.01} perspective={900} reset={true}>
            <form onSubmit={(e) => handleSubmit(e)}>
              <h3>Sign Up Here</h3>

              <label htmlFor="username">Name</label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                id="name"
                onChange={(event) => handleChange(event)}
              />
              <label htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Username"
                name="username"
                id="username"
                onChange={(event) => handleChange(event)}
              />
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                id="email"
                onChange={(event) => handleChange(event)}
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                id="password"
                onChange={(event) => handleChange(event)}
              />

              <label htmlFor="password">Confirm Password</label>
              <input
                type="text"
                placeholder="Confirm Password"
                name="confirmPassword"
                id="Confirmpassword"
                onChange={(event) => handleChange(event)}
              />

              <button type="submit">Sign Up</button>
              <div className="details">
                <div className="loginn">
                  <span>Already a User?</span>{" "}
                  <Link to="/login">Login Here</Link>
                </div>
              </div>
            </form>
          </Tilty>
        </div>
      </FormContainer>

      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  *,
  *:before,
  *:after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  body {
    background-color: #080710;
    overflow: hidden;
  }
  .formContainer {
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    justify-content: center;
    align-items: center;
  }
  .background {
    display: flex;
    width: 430px;
    height: 850px;
    position: absolute;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .background .shape {
    height: 200px;
    width: 200px;
    border-radius: 50%;
  }
  .shape:first-child {
    background: linear-gradient(#1845ad, #23a2f6);
  }
  .shape:last-child {
    background: linear-gradient(to right, #ff512f, #f09819);
    margin-left: 15rem;
  }
  form {
    display: block;
    margin: 2rem auto;
    width: 400px;
    background-color: rgba(255, 255, 255, 0.13);
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
    padding: 50px 35px;
  }
  form * {
    font-family: "Poppins", sans-serif;
    color: #ffffff;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
  }
  form h3 {
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
  }

  label {
    display: block;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
  }
  input {
    display: block;
    height: 50px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.07);
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
  }
  ::placeholder {
    color: #e5e5e5;
  }
  button {
    margin-top: 15px;
    width: 100%;
    background-color: #ffffff;
    color: #080710;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
  }
  .details {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    margin: 20px 0px;
  }
  .details span {
    color: black;
    /* margin-bottom: 0px; */
    font-weight: bold;
  }
  .details a {
    color: violet;
  }
  @media screen and (max-width: 400px){
    .formContainer{
      margin-left: 2rem;
    }
    .background .shape {
    height: 150px;
    width: 150px;
  }
  form{
    width: 300px;
  }
  }
`;

export default Register;
