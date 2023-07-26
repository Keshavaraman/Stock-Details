import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RESET_MODAL_MESSAGE } from '../redux/constants';

const Toast = () => {
  const [visible, setVisible] = useState(false);
  const [message,setMessage] = useState("");

  const modalmessage = useSelector(state => state.modalMessage);
  const dispatch = useDispatch();
  

  useEffect(() => {
    if(modalmessage.messageType=="SUCCESS") { 
      console.log("TOAST");
      setVisible(true); 
      setMessage(modalmessage.message);
      dispatch({type:RESET_MODAL_MESSAGE});
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  }
  }, [modalmessage]);

  const handleClose = () => {
    setVisible(false);
  };

  return (
        <div className={visible?"top-toast-container show":"top-toast-container hide"}>
          <div className="top-toast-content">
            <span>{message}</span>
            <button className="close-btn" onClick={handleClose}>&times;</button>
          </div>
        </div>
  )
};

export default Toast;