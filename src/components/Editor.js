import React, {useEffect} from 'react';
import CodeMirror from "codemirror";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "../App.css";

const Editor = () => {

  useEffect(() => {
    async function init() {
      CodeMirror.fromTextArea(document.getElementById('realtimeEditor'), {
        mode: {
          name: "javascript",
          json: true
        },
        theme: 'dracula',
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
        tabMode: "indent"
      })
    }
    init();
  }, []);

  return (
    <div style={{position: "relative", height: "90px", width: "100%"}}>
      <textarea style={{width: "100%", height: "99vh"}} id="realtimeEditor"></textarea>
    </div>
  );
};

export default Editor;
