"use client";
import {
  DocumentData,
  QuerySnapshot,
  collection,
  onSnapshot,
} from "firebase/firestore";
import React from "react";
import { db } from "@/app/(firebase)/firebase";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/redux/store";

const SentMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex justify-end items-center gap-1">
      <div className="bg-gray-950 px-3 p-2 rounded-lg">
        <p className="text-gray-600">{message}</p>
      </div>
      <div className="h-full aspect-square rounded-full overflow-hidden relative">
        <Image
          src={"/images/no-profile-picture-icon.svg"}
          alt="some picture"
          fill={true}
        ></Image>
      </div>
    </div>
  );
};
const ReceivedMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex justify-start items-center h-fit gap-1">
      <div className="h-full aspect-square rounded-full overflow-hidden relative">
        <Image
          src={"/images/no-profile-picture-icon.svg"}
          alt="some picture"
          fill={true}
        ></Image>
      </div>
      <div className="bg-gray-950 px-3 p-2 rounded-lg">
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};

function ChatBox() {
  const [messages, setMessages] = React.useState<DocumentData[]>([]);
  const currentChat = useSelector(
    (state: RootState) => state.context.currentChat
  );

  React.useEffect(() => {
    const handleOnSnapshot = (
      snapshot: QuerySnapshot<DocumentData, DocumentData>
    ) => {
      function addMessages() {
        const messagesArr = snapshot.docs.map((doc) => doc.data());
        const filteredMessages = messagesArr.filter(
          (message) =>
            (message.from === currentChat?.email &&
              message.to === currentUser?.email) ||
            (message.from === currentUser?.email &&
              message.to === currentChat?.email)
        );
        filteredMessages.sort((a, b) => a.timestamp - b.timestamp);
        setMessages(filteredMessages);
      }
      async function pushNotification() {
        const permision = await Notification.requestPermission();
        if (permision === "granted") {
          const notification = new Notification("New Message", {
            body: "You have a new message",
            icon: "/images/no-profile-picture-icon.svg",
          });

          notification.addEventListener("click", () => {
            window.open("http://localhost:3000");
          });
          notification.addEventListener("error", (err) => {
            alert(err);
          });
        }
      }
      addMessages();
      pushNotification();
    };
    onSnapshot(collection(db, "chats"), handleOnSnapshot);
  }, []);

  const currentUser = useSelector((state: RootState) => state.context.user); //it has currentUser.uid , currentUser.email , currentUser.displayName inside user object inside it

  React.useEffect(() => {
    console.log("messages", messages);
  }, [messages]);

  return (
    <div className="flex grow gap-2 w-full flex-col overflow-scroll px-4">
      {messages.map((message, index) => {
        if (message.from === currentUser?.email) {
          return <SentMessage key={index} message={message.message} />;
        } else {
          return <ReceivedMessage key={index} message={message.message} />;
        }
      })}
    </div>
  );
}

export default ChatBox;
