import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RESET_MODAL_MESSAGE } from '../redux/constants';

export default function ModalComponent() {
  const modalMessage = useSelector((state)=>state.modalMessage);
  const [displayModal,setDisplayModal]=useState(false);
  const [message,setMessage] = useState("");
  const [messageHeader,setMessageHeader] = useState();
  const dispatch = useDispatch();
  useEffect(()=>{
    if(modalMessage.messageType=="ERROR" || modalMessage.messageType=="INFO") {
      setMessage(modalMessage.message);
      setMessageHeader(modalMessage.messageType);
      setDisplayModal(true);
      dispatch({type:RESET_MODAL_MESSAGE});
    }
  },[modalMessage])
  return (
    <>
      {displayModal && (
        <div className="modal-overlay">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{messageHeader}</h5>
                <button type="button" className="close" onClick={()=>{setDisplayModal(false)}}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {message}
              </div>
            </div>
          </div>
        </div>
      )}
  </>
  )
}
