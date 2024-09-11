import React, { FC, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppStateType } from '../../redux/redux-store'
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/chat-reducer'
import { ChatMessageAPIType, StatusType } from '../../api/chat-api'


const ChatPage: FC = () => {
    return (
        <div>
            <Chat />
        </div>
    )
}

const Chat: FC = () => {
    const status = useSelector((state: AppStateType) => state.chat.status);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return <div>
        {status === 'error' && <div>Some error occured. Please refresh the page</div>}
        <Messages />
        <AddMessageForm status={status} />

    </div>
}

const Messages: FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages);
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    const scrolHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let element = e.currentTarget
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    return <div style={{ height: '400px', overflowY: 'auto' }}
        onScroll={scrolHandler}>
        {messages.map((m, index) => <Message key={m.id} message={m} />)}
        <div ref={messagesAnchorRef}></div>
    </div>
}
const Message: FC<{ message: ChatMessageAPIType }> = React.memo(({ message }) => {

    return <div>
        <img src={message.photo} style={{ width: '10%' }} /> <b>{message.userName}</b>
        <br />
        {message.message}
        <hr />
    </div>
})

const AddMessageForm: FC<{ status: StatusType }> = ({ status }) => {
    const [message, setMessage] = useState('')

    const dispatch: AppDispatch = useDispatch();

    const sendMessageHandler = () => {
        if (!message) return
        dispatch(sendMessage(message));
        setMessage('');
    }

    return <div>
        <div>
            <textarea name="" id="" onChange={e => setMessage(e.currentTarget.value)} value={message} ></textarea>
        </div>
        <div>
            <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
        </div>
    </div>
}

export default ChatPage