import React ,{useState} from "react";
import Tilty from "react-tilty";
import styled from "styled-components";
import { Link } from "react-router-dom";


function Login() {
  const [values,setValues] = useState({
    username : "",
    password: "",
})
const handleSubmit = (e)=>{
  e.preventDefault();
}
const handleChange = (e)=>{
  setValues({...values , [e.target.name] : e.target.value});
}

  return (
    <>
    <LoginForm>
      <div class="formContainer">
          <div class="background">
            <div class="shape"></div>
            <div class="shape"></div>
          </div>
        <Tilty  reverse axis="x" scale={1.1} perspective={900} reset={true}>
          <form onSubmit={(e)=>handleSubmit(e)}>
            <h3>Login Here</h3>

            <label for="username">Username</label>
            <input type="text" placeholder="Email or Phone" name="username" id="username" onChange={(e)=> handleChange(e)} />

            <label for="password">Password</label>
            <input type="password" placeholder="Password" id="password" name="password" onChange={(e)=> handleChange(e)}  />

            <button type="submit">Log In</button>
            <div className="details">
                <div className="registerr"><span>Not a User?</span> <Link to="/register">Register Here</Link></div>
                <div className="resetPass"> <Link to="/newPassword">Forgot Password</Link></div>
                </div>
          </form>
        </Tilty>
      </div>
    </LoginForm>
    </>
  );
}

const LoginForm = styled.div`
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
    transform: translate(10px, 430px);
  }
  .background {
    width: 430px;
    height: 520px;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
  }
  .background .shape {
    height: 200px;
    width: 200px;
    position: absolute;
    border-radius: 50%;
  }
  .shape:first-child {
    background: linear-gradient(#1845ad, #23a2f6);
    left: -80px;
    top: -80px;
  }
  .shape:last-child {
    background: linear-gradient(to right, #ff512f, #f09819);
    right: -30px;
    bottom: -80px;
  }
  form {
    height: 520px;
    width: 400px;
    background-color: rgba(255, 255, 255, 0.13);
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
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
    margin-top: 50px;
    width: 100%;
    background-color: #ffffff;
    color: #080710;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
  }
  .details{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    margin: 20px 0px
  }
  .registerr{
    width:150px;
  }
  .registerr a{
    margin-top:10px;
  }
  .details span{
    color: black;
    /* margin-bottom: 0px; */
    font-weight: bold;
  }
`;
export default Login;
