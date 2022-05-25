import React, {useState} from 'react';
import Logo from "../components/Logo";
import "./Home.css";
import {v4 as uuidV4} from "uuid";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const createNewRoomHandler = () => {
    const id = uuidV4();
    setRoomId(id);
    toast.success("Created a new Room")
  }

  const joinRoomHandler = () => {
    if (!roomId || !userName) {
      toast.error("Room ID and User Name is Required");
      return;
    }

    navigate(`/editor/${roomId}`, {
      state: {
        userName
      }
    })
  }

  const handleInputEnter = (e) => {
    if(e.code === "Enter")
    {
      joinRoomHandler();
    }
  }

  return (
    <div className="homePageWrapper">
      {/*<div  className="flex justify-between">*/}
      {/*<div style={{border: "1px solid red", width: "48%", height: "48%"}}>*/}
      {/*  <img src="/image/homeImage.jpg" width="100%"  height="100%" />*/}
      {/*</div>*/}
      <div className="formWrapper">
        <div className="formContainer">
          <Logo/>
          <p style={{marginTop: "0.8rem", marginBottom: "0.8rem", fontSize: "16px", fontWeight: "400"}}>Paste Invitation
            Room ID</p>
          <div className="flex col box">
            <label className="label">Room ID</label>
            <input
              value={roomId}
              onChange={(e) => {
                setRoomId(e.target.value)
              }}
              className="input"
              type="text"
              placeholder="Enter Room ID"
              onKeyUp={handleInputEnter}
            />
          </div>
          <div className="flex col box">
            <label className="label">User Name</label>
            <input
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value)
              }}
              className="input"
              type="text"
              placeholder="Enter Your Name"
              onKeyUp={handleInputEnter}
            />
          </div>
          <div className="flex justify-between align-center">
            <div className="flex align-end" style={{fontSize: "13px", color: "#E7E7E7"}}>
              <p>If you don't have an invite then create <span className="new-room" onClick={createNewRoomHandler}>New Room</span>
              </p>
            </div>
            <button onClick={joinRoomHandler} className="btn">Join</button>
          </div>

        </div>
      </div>
      {/*</div>*/}
    </div>
  );
};

export default HomePage;
