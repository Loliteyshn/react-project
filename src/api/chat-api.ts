let subscribers = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChaingedSubscriberType[]
}
let ws: WebSocket | null = null
type EventsName = 'messages-received' | 'status-changed'

const closeHandler = () => {
    console.log('CLOSE WS')
    notifySubscribersAboutStatus('pending')
    setTimeout(connect, 3000)
}

let messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers["messages-received"].forEach(s => s(newMessages))
}

let openHandler = () => {
    notifySubscribersAboutStatus('ready')
}

let errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.log('Refresh page');
}

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
    ws?.close()
}

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers["status-changed"].forEach(s => s(status))
}

function connect() {
    cleanUp()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatus('pending')
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}

export const chatAPI = {
    start() {
        connect()
    },
    stop() {
        subscribers["messages-received"] = []
        subscribers["status-changed"] = []
        cleanUp()
        ws?.close()
    },
    subscribe(eventName: EventsName, callback: MessagesReceivedSubscriberType | StatusChaingedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventsName, callback: MessagesReceivedSubscriberType | StatusChaingedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message);

        // if (ws?.readyState === WebSocket.OPEN) {
        // } else {
        //     console.error("WebSocket connection is not open");
        // }
    }
}

type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void
type StatusChaingedSubscriberType = (status: StatusType) => void
export type ChatMessageAPIType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}
export type StatusType = 'pending' | 'ready' | 'error'
