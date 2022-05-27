import React, {useEffect, useRef, useState} from 'react';
import "./Home.css";
import "./EditorPage.css";
import Logo from "../components/Logo";
import Client from "../components/Client";
import Editor from "../components/Editor";
import {initSocket} from "../components/Socket";
import ACTIONS from "../Actions";
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import {toast} from "react-hot-toast";

const EditorPage = () => {
  const socketRef = useRef(null);
  const location = useLocation();
  const {roomId} = useParams();
  const codeRef = useRef(null);
  const reactNavigator = useNavigate();
  const [defaultStyle, setDefaultStyle] = useState(false);
  const isMounted = useRef(false);
  const [clients, setClients] = useState(
    []
  );

  useEffect(() => {
    if (isMounted.current) return;
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));

      function handleErrors(err) {
        console.log('socket error ', err);
        toast.error('Socket connection failed, try again later');
        reactNavigator('/');
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId: roomId,
        userName: location.state?.userName
      });


      //Listening for joined event
      socketRef.current.on(ACTIONS.JOINED, ({clients, userName, socketId}) => {
        if (userName !== location.state?.userName) {
          toast.success(`${userName} joined the room`);
          console.log(`${userName} joined the room`);
        }
        setClients(clients);
        socketRef.current.emit(ACTIONS.SYNC_CODE, {
          code: codeRef?.current,
          socketId
        })
      })

      //Listening for disconnected event
      socketRef.current?.on(ACTIONS.DISCONNECTED, ({socketId, userName}) => {
        toast.success(`${userName} left the room.`);
        setClients((prev) => {
          return prev.filter(client => client.socketId !== socketId);
        })
      })
    }
    init();

    isMounted.current = true;

  }, []);

  useEffect(() => {
    if (socketRef.current) {
      return () => {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
      }
    }
  }, [socketRef.current]);

  const copyRoomIdHandler = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success(`Room ID has been copied to your clipboard`)
    } catch (err) {
      toast.error(`Could not copy the room ID`);
    }
  }

  const leaveRoom = () => {
    reactNavigator('/');
  }

  const viewJoinedMembersListHandler = () => {
    setDefaultStyle(!defaultStyle);
  }

  if (!location.state) {
    return <Navigate to="/"/>
  }

  return (
    <div className="editorPageWrapper">
      <div className="pageWrapper">
        <div className={`aside ${!defaultStyle ? "display-none" : "display-block"}`}>
          <div className="asideInner">
            <div className="logo">
              <Logo/>
            </div>
            <h3 style={{paddingBottom: "0.5rem", fontWeight: "400"}}>Connected</h3>
            <div className="clientsList">
              {
                clients.map(client => (
                  <Client key={client.socketId} userName={client.userName}/>
                ))
              }
            </div>
          </div>
          <div>
            <button onClick={copyRoomIdHandler} style={{width: "100%", color: "black", background: "white",}}
                    className="btn">Copy ROOM ID
            </button>
            <button onClick={leaveRoom} style={{width: "100%"}} className="btn">Leave</button>
          </div>
        </div>
        <div className={`editorWrap ${!defaultStyle ? "display-block" : "display-none"}`}>
          <Editor socketRef={socketRef} roomId={roomId} onChangeCode={(code) => {
            codeRef.current = code
          }}/>
        </div>
      </div>

      <div className="bottomPart">
        <div onClick={viewJoinedMembersListHandler} className={"bottomBtn"}>
          {defaultStyle ? "View CodePad" : "View Joined Members"}
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
