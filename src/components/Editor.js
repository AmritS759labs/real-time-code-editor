import React, {useEffect, useRef} from 'react';
import CodeMirror from "codemirror";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "../App.css";
import ACTIONS from '../Actions';

const Editor = ({socketRef, roomId, onChangeCode}) => {
  const editorRef = useRef();
  const isMounted = useRef();

  useEffect(() => {
    if (isMounted.current) return;

    async function init() {
      editorRef.current = CodeMirror.fromTextArea(document.getElementById('realtimeEditor'), {
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

      editorRef?.current?.on('change', (instance, changes) => {
        const {origin} = changes;
        const code = instance.getValue();
        onChangeCode(code);
        if (origin !== 'setValue') {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code
          })
        }
      });

    }

    init();
    isMounted.current = true;

  }, []);


  useEffect(() => {
    if (socketRef.current) {
      socketRef.current?.on(ACTIONS.CODE_CHANGE, ({code}) => {
        if (code != null) {
          editorRef.current.setValue(code);
        }
      })
      editorRef.current.setValue("//write your code here");

      return () => {
        socketRef?.current?.off(ACTIONS.CODE_CHANGE);
      }
    }

  }, socketRef.current);

  return (
    <div style={{position: "relative", height: "90px", width: "100%"}}>
      <textarea style={{width: "100%", height: "99vh"}} id="realtimeEditor"></textarea>
    </div>
  );
};

export default Editor;
