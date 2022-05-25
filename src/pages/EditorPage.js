import React, {useState} from 'react';
import "./Home.css";
import "./EditorPage.css";
import Logo from "../components/Logo";
import Client from "../components/Client";
import Editor from "../components/Editor";

const EditorPage = () => {
  const [clients, setClients] = useState(
    [
      {socketId: 1, username: "Rakesh K"},
      {socketId: 2, username: "Amrit Anand"},
      {socketId: 3, username: "Milind Kumar Roy"},
      {socketId: 4, username: "John Doe"},
      {socketId: 5, username: "Radhe Krishna"},
      {socketId: 6, username: "Nidhi kri"},
    ]
  );
  return (
    <div className="editorPageWrapper">
     <div className="pageWrapper">
       <div className="aside">
         <div className="asideInner">
           <div className="logo">
             <Logo />
           </div>
           <h3 style={{paddingBottom: "0.5rem", fontWeight: "400"}}>Connected</h3>
           <div className="clientsList">
             {
               clients.map(client => (
                 <Client key={client.id} username={client.username} />
               ))
             }
             {
               clients.map(client => (
                 <Client key={client.id} username={client.username} />
               ))
             }
           </div>
         </div>
         <div>
           <button style={{width: "100%", color: "black", background: "white", }} className="btn">Copy ROOM ID</button>
           <button style={{width: "100%"}} className="btn">Leave</button>
         </div>
       </div>
       <div className="editorWrap">
             <Editor/>
       </div>
     </div>
    </div>
  );
};

export default EditorPage;
