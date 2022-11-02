import React, { useState } from 'react'
import InboxOutlinedIcon from '@material-ui/icons/InboxOutlined';
import './css/Sidebar.css'
import Modal from 'react-modal'
import CloseIcon from '@material-ui/icons/Close';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db, { auth } from '../firebase';
import firebase from 'firebase'
import axios from 'axios'
import { AddCircleOutline } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import VideocamIcon from '@material-ui/icons/Videocam';
import { Link, Routes } from 'react-router-dom';

Modal.setAppElement('#root')

function Sidebar() {
    const user = useSelector(selectUser)
    const [modalOpen, setModalOpen] = useState(false)
    const [focus, setFocus] = useState(false)
    const [recipient, setRecipient] = useState("")
    const [subject, setSubject] = useState("")
    const [content, setContent] = useState("")
    const sender = user.email
    const shareMeet = () => {
        if (user.emailVerified) {
            window.open('https://meet.google.com/getalink?hs=202')
        }
        else {
            alert('Please sign in using google account to access this feature')
            if (window.confirm('Would you like to continue with google account')) {
                auth.signOut()
            }
        }
    }
    const sendMail = async (e) => {
        e.preventDefault()
        if (recipient && subject && content !== "") {
            db.collection('sentMails').add({
                from: user.email,
                to: recipient,
                subject: subject,
                content: content,
                user: user,
                sent: true,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            setModalOpen(false)
            alert('Mail Sent Successfully...')
            console.log({ recipient, content, subject, sender })
            const body = {
                sender,
                recipient,
                subject,
                content,
            }
            await axios.post('/mail', body, {
                headers: {
                    'Content-type': 'application/json'
                }
            }).then((res) => {
                alert('Email delievered successfully')
            }).catch((e) => {
                console.log(e)
            })
            setContent("")
            setRecipient("")
            setSubject("")
        }
    }
    function openModal() {
        setModalOpen(true)
    }
    function closeModal() {
        setModalOpen(false)
    }

    return (
        <div className="sidebar">
            <div className="sidebarOptionsTop">
                <div className="sidebarOption">
                    <AddCircleOutline onClick={openModal}
                    />
                    <Modal
                        isOpen={modalOpen}
                        onRequestClose={() => setModalOpen(false)}
                        shouldCloseOnOverlayClick={false}
                        style={{
                            overlay: {
                                width: 680,
                                height: "auto",
                                backgroundColor: "rgba(0,0,0,0.6)",
                                zIndex: "1000",
                                top: "50%",
                                left: "50%",
                                marginTop: "-250px",
                                marginLeft: "-350px",
                                borderRadius: "none"
                            },
                            content: {
                                margin: 0,
                                padding: 0,
                                border: "none"
                            }
                        }}
                    >
                        <div className="modalContainer">
                            <div className="modalContainerTop">
                                <div className="modalHeader">
                                    <p>New Message</p>
                                    <div
                                        className="modalHeaderIcons">
                                        <IconButton onClick={closeModal}>
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                </div>
                                <div onClick={() => setFocus(true)} className="modalRecipient">
                                    <input
                                        style={{
                                            display: "none"
                                        }}
                                        id="sender"
                                        value={sender}
                                    />
                                    <p>{focus ? "To" : "Recipients"}</p>
                                    <input
                                        id="recipient"
                                        value={recipient}
                                        onChange={(e) => setRecipient(e.target.value)}
                                        type="text"
                                    />
                                </div>
                                <div className="modalRecipient">
                                    <input
                                        id="subject"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        type="text"
                                        placeholder="Subject"
                                    />
                                </div>
                                <div className="quill">
                                    <ReactQuill
                                        id="content"
                                        value={content}
                                        onChange={(value) => setContent(value)}
                                        placeholder="Compose Your mail..."
                                    />
                                </div>
                            </div>
                            <div className="modalContainerBottom">
                                <div className="modalBottom">
                                    <button onClick={sendMail}>Send</button>
                                </div>
                            </div>
                        </div>

                    </Modal>
                </div>
                <Link to='primaryId'>
                    <div className="sidebarOptionIcon">
                        <InboxOutlinedIcon />
                    </div>
                </Link>
                <Link to='sentbox'>
                    <div className="sidebarOptionIcon">
                        <SendIcon />
                    </div>
                </Link>
                <Link to='/about'>
                    <div className="sidebarOptionIcon">
                        <SendIcon />
                    </div>
                </Link>
                <div onClick={shareMeet} className="sidebarOptionIcon">
                    <VideocamIcon />
                </div>
            </div>
        </div>
    )
}

export default Sidebar
