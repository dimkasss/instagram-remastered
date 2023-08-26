import React from "react";

const Messenger = () => {
  const [conn, setConn] = React.useState<WebSocket>();
  const [chatroom] = React.useState("general")
  const newchat = React.useRef(null)
  const newmessage = React.useRef<HTMLInputElement>(null)

  class Event {
    type: string | undefined;
    payload: unknown;
    constructor(type?: string, payload?: unknown) {
      this.type = type
      this.payload = payload
    }
  }

  const routeEvent = (event: any) => {
    if (event.type === undefined) {
      alert("no type field in the event")
    }

    switch(event.type) {
      case "new_message":
        console.log("new message")
        break
      default:
        alert("unsupported message type")
        break
    }
  }

  const sendEvent = (eventName: string, payload: unknown) => {
    const event = new Event(eventName, payload)
    conn?.send(JSON.stringify(event))
  }

  window.onload = () => {
    setConn(new WebSocket("ws://localhost:8080/ws"))
    
  }

  React.useEffect(() => {
    if(window["WebSocket"]) {
      console.log("supports websockets");
      if (conn != undefined) {
        conn.onmessage = (e: MessageEvent) => {
          const eventData = JSON.parse(e.data)

          const event = Object.assign(new Event, eventData)
          routeEvent(event)
        }
      }
    } else {
      alert("Browser does not support websockets")
    }
  }, [conn])

  const changeChatRoom = () => {
    if (newchat != null && newchat.current != chatroom) {
      console.log(newchat)
    }
    return false
  }

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (conn != undefined && newmessage != null && newmessage.current != null) {
      sendEvent("send_message", newmessage.current)
      newmessage.current.value = ""
    }
    return false
  }

  return ( 
    <div className="[&>*]:p-2">
      <h1>Messenger</h1>
      <h3>Currently in chat: general</h3>

      <form id="chatroom-selection" onSubmit={changeChatRoom}>
        <label htmlFor="chatroom">Chatroom:</label>
        <input className="border" type="text" name="chatroom" ref={newchat} id="chatroom" />
        <input className="border hover:cursor-pointer p-1" type="submit" value="Change chatroom" onClick={changeChatRoom}/>
      </form>
      <br />
      <textarea className="border" name="chatmessages" id="chatmessages" cols={30} rows={4} readOnly placeholder="Welcome to chatroom"></textarea>
      <br />

      <form id="chatroom-message" onSubmit={sendMessage}>
        <label htmlFor="message">Message:</label>
        <input ref={newmessage} type="text" className="border" name="message" placeholder="Enter your msg"/>
        <input className="border hover:cursor-pointer p-1" type="submit" value="Send message"/>
      </form>
    </div>
   );
}
 
export default Messenger;