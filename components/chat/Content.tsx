import React from "react";
import { Message } from "@/data";
import Avatar from "@/components/chat/Avatar";

interface ChatContentProps {
  messages: Message[];
}

const ChatContent = ({ messages }: ChatContentProps) => {
  return (
    <div className="max-h-64 h-64 px-6 py-1 overflow-auto">
      {messages.map((message: Message, index: number) => (
        <div
          key={index}
          className={`py-2 flex flex-row w-full ${
            message.isChatOwner ? "justify-end" : "justify-start"
          }`}
        >
          <div className={`${message.isChatOwner ? "order-2" : "order-1"}`}>
            <Avatar/>
          </div>
          <div
            className={`px-2 w-fit py-3 flex flex-col bg-purple-500 rounded-lg text-white ${
              message.isChatOwner ? "order-1 mr-2" : "order-2 ml-2"
            }`}
          >
            <span className="text-xs text-gray-200">
              {message.sentBy}&nbsp;-&nbsp;
              {new Date(message.sentAt).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit"
              })}
            </span>
            <span className="text-md">{message.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatContent;
