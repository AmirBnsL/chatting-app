"use client";
import { collection, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import React from "react";
import { db } from "@/app/(firebase)/firebase";
import { AuthContext } from "@/app/(firebase)/AuthContext";

const SentMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex justify-end h-fit">
      <div className="bg-gray-950 p-4 rounded-lg">
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};
const ReceivedMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex justify-start h-fit">
      <div className="bg-gray-950 p-4 rounded-lg">
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

function ChatBox() {
  const [messages, setMessages] = React.useState([]);
  React.useEffect(() => {
    /* const message = getDocs(collection(db, "chats")).then((querySnapshot) => {
      const messagesArr = querySnapshot.docs.map((doc) => doc.data());
      console.log("message", messagesArr);
      messagesArr.map
      setMessages(messagesArr);
    }); */
    onSnapshot(collection(db, 'chats'),(snapshot)=> {
      const messagesArr = snapshot.docs.map((doc) => doc.data());
      const filteredMessages = messagesArr.filter((message) => message.from === currentUser.user.email || message.to === currentUser.user.email);
       filteredMessages.sort((a,b) => a.timestamp - b.timestamp);
 
  console.log("message", messagesArr);
      setMessages(filteredMessages);
    })
  }, []);

  const currentUser = React.useContext(AuthContext);

  React.useEffect(() => {
    console.log("messages", messages);
  }, [messages]);

  return (
    <div className="flex grow gap-2 w-full flex-col overflow-scroll px-4">
      {messages.map((message,index) => {
        if (message.from === currentUser.user.email) {
          return <SentMessage key={index} message={message.message} />;
        } else {
          return <ReceivedMessage key={index} message={message.message} />;
        }
      })}
    </div>
  );
}

export default ChatBox;
