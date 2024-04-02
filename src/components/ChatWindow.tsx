// src/Chat.tsx
import { CircularProgress } from "@mui/material";
import { Badge } from "components/ui/badge";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { api } from "~/utils/api";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

export function ChatWindow({ isOnChatRoute }: { isOnChatRoute?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  // const chatCompletion = api.openAI.chatCompletion.useMutation();
  // api.useContext();
  // const getEC2Instances = api.aws.getEC2Instances;

  // const handleSendMessage = async () => {
  //   if (!inputText.trim()) return;

  //   const newMessage: Message = {
  //     id: Date.now(),
  //     text: inputText,
  //     sender: "user",
  //   };

  //   const newMessages = [...messages, newMessage];

  //   console.log("messages", newMessages);
  //   const chatCompletionResponse = await chatCompletion.mutateAsync({
  //     conversationHistory: newMessages.map((message) => ({
  //       role: message.sender,
  //       content: message.text,
  //     })),
  //   });

  //   console.log(chatCompletionResponse);

  //   const botResponse: Message = {
  //     id: Date.now() + 1,
  //     text: chatCompletionResponse ?? "",
  //     sender: "bot",
  //   };

  //   setMessages([...newMessages, botResponse]);

  //   // const botResponse: Message = {
  //   //   id: Date.now() + 1,
  //   //   text: `Echo: ${inputText}`,
  //   //   sender: "bot",
  //   // };

  //   // setTimeout(() => setMessages((prev) => [...prev, botResponse]), 500);

  //   setInputText("");
  // };

  // "Tell me more about optimizing my EBS volumes."

  // const userMessages = ["Tell me more about optimizing my EBS volumes"];

  // const botMessages = [
  //   "You have 5 EBS volumes, totaling 200 GB, that have been unattached for over 60 days, leading to unnecessary costs. Deleting these can save you approximately $50/month.",
  // ];

  const stubbedMessages = {
    "Tell me more about downsizing my EC2":
      "Currently, your m5.large instance is underutilized, with CPU and memory usage consistently below 40%. By switching to a t3.medium, you're projected to reduce your monthly EC2 cost by upwards of 50% while still meeting your performance needs. Additionally, t3.medium instances benefit from burstable performance, giving you flexibility for sporadic workload increases.",
    "What will my spend look like if I shift to t3.medium?":
      "Here is a visual.",
  } as const;

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    setLoading(true);

    const newMessage: Message = {
      id: Date.now(),
      text: message,
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    console.log("messages", newMessages);
    //fake response with stubbed data

    // const chatCompletionResponse =
    //   "You have 5 EBS volumes, totaling 200 GB, that have been unattached for over 60 days, leading to unnecessary costs. Deleting these can save you approximately $50/month.";

    const chatCompletionResponse =
      stubbedMessages[message as keyof typeof stubbedMessages];
    console.log(chatCompletionResponse);

    // const botResponse: Message = {
    //   id: Date.now() + 1,
    //   text: chatCompletionResponse ?? "",
    //   sender: "bot",
    // };

    setMessages([...newMessages]);

    // const botResponse: Message = {
    //   id: Date.now() + 1,
    //   text: `Echo: ${inputText}`,
    //   sender: "bot",
    // };

    // setTimeout(() => setMessages((prev) => [...prev, botResponse]), 500);

    // lets await 2000ms to simulate a bot response
    setInputText("");

    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: chatCompletionResponse,
        sender: "bot",
      };
      setMessages([...newMessages, botResponse]);
      setLoading(false);
    }, 2000);
  };

  const handleBadgeClick = (message: string) => {
    handleSendMessage(message);
  };

  return (
    <div className="borderp- flex h-full flex-col  overflow-auto">
      <div className="flex flex-grow flex-col gap-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[60%] rounded-lg p-2 ${
              message.sender === "user"
                ? "ml-auto bg-[#A1B5C7] text-white"
                : "mr-auto bg-gray-100 text-black"
            }`}
          >
            <div className="flex flex-col gap-2">
              {message.text}
              {message.text === "Here is a visual." ? (
                <img src="/CostChart.png" alt="chart" className="w-[700px]" />
              ) : null}
            </div>
          </div>
        ))}
        <div className="flex h-full items-center justify-center gap-2">
          {/* {isOnChatRoute && messages.length === 0 ? (
            <div className="flex justify-center gap-2">
              {Object.keys(stubbedMessages).map((message) => (
                <Badge
                  key={message}
                  variant="outline"
                  onClick={() => handleBadgeClick(message)}
                  className="text-md cursor-pointer"
                >
                  {message}
                </Badge>
              ))}
            </div>
          ) : null} */}
        </div>
      </div>
      <div className="m-2 mt-4 flex text-black">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputText)}
          className="mr-2 flex-1 rounded-lg border border-gray-300 p-2"
        />
        <button
          onClick={() => handleSendMessage(inputText)}
          className="flex w-20 items-center justify-center rounded-lg border  bg-[#A1B5C7] p-2 text-white hover:bg-slate-100/80"
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Send"}
        </button>
      </div>
    </div>
  );
}
