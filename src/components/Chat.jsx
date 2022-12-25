import { useContext, useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from './../index'
import { Container, Grid } from "@mui/material"
import preloader from './../img/preloader.svg'
import firebase from 'firebase/compat/app';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import ava from './../img/ava.png'
import { useRef } from 'react'

const Chat = () => {
    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth)
    const [value, setValue] = useState('')
    const [messages, loading] = useCollectionData(
        firestore.collection('messages').orderBy('createAt')
    )
    
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    
    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    if (loading) {
        return (
            <Container>
              <Grid container
                        style={{height: window.innerHeight - 50}}
                        alignItems={'center'}
                        justifyContent={'center'}
              >
                <img src={preloader} />
              </Grid>
            </Container>  
        ) 
    }

    async function sendMessage(e, value) {
        e.preventDefault()
        let correctValue = value.trim()
        if (correctValue != '') {
            firestore.collection('messages').add({
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                text: value,
                email: user.email,
                createAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            setValue('')
        }
    }

    return (
        <Container>
            <Grid container
                style={{height: window.innerHeight - 50, marginTop: 20}}
                justifyContent={'center'}>
                <section className="chatbox">
                    <section className="chat-window">
                        {messages.map((item, index) => {
                            return (
                                <article className="msg-container msg-remote" id="msg-0" key={index}>
                                    <div className="msg-box" style={user.uid === item.uid ? {float: 'right', backgroundColor: "#007539"} : {float: 'left'}}>
                                        <img className="user-img" id="user-0" src={item.displayName ? item.photoURL : ava} />
                                        <div className="flr">
                                            <div className="messages">
                                                <p className="msg" id="msg-0">
                                                    {item.text}
                                                </p>
                                            </div>
                                            <span className="timestamp"><span className="username">{item.displayName ? item.displayName : item.email}</span>&bull;<span className="posttime">{item.createAt != null ? (new Date((item.createAt.seconds) * 1000).toLocaleString()).substring(0, 17) : ''}</span></span>
                                        </div>
                                    </div>
                                </article>
                            )
                        })}
                        <div ref={messagesEndRef}></div>
                    </section>
                    <form className="chat-input">
                        <input onChange={(e) => {setValue(e.target.value)}} value={value} type="text" autoComplete="on" placeholder="Type a message" />
                        <button onClick={(e) => {sendMessage(e, value)}}>
                                <svg style={{width: "24px", height: "24px"}} viewBox="0 0 24 24"><path fill="rgba(0,0,0,.38)" d="M17,12L12,17V14H8V10H12V7L17,12M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L5,8.09V15.91L12,19.85L19,15.91V8.09L12,4.15Z" /></svg>
                        </button>
                    </form>
                </section>
            </Grid>
        </Container>
    )
}

export default Chat


