import {BrowserRouter, Switch, Route, Routes} from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import EditorPage from "./pages/EditorPage";
import {Toaster} from "react-hot-toast";

function App() {
  return (
    <div>
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              theme: {
                primary: "#5ee3a8"
              }
            }
          }}
        ></Toaster>
      </div>
     <BrowserRouter>
       <Routes>
         <Route path="/" element={<Home />}></Route>
         <Route path="/editor/:roomId" element={<EditorPage />} ></Route>
       </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
