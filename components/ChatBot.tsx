'use client'

import { useContext, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UrlConfig } from "@/util/config"
import LayoutContext from "@/layouts/context/layoutContext"

export default function ChatBot(props) {
  const [messageInput, setMessageInput] = useState("")
  const [messages, setMessages] = useState([])
  const [currentResponse, setCurrentResponse] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const { user, setUser } = useContext(LayoutContext)

  useEffect(() => {
    const chatBotMessage = localStorage.getItem("message_chat_bot")
    if (chatBotMessage) {
      setMessages(JSON.parse(chatBotMessage))
    }
  }, [])

  useEffect(() => {
    if (isTyping) {
      const typingInterval = setInterval(() => {
        if (messages[messages.length - 1].message.length != null) {
          if (currentResponse.length < messages[messages.length - 1].message.length) {
            setCurrentResponse(messages[messages.length - 1].message.substring(0, currentResponse.length + 1))
          } else {
            clearInterval(typingInterval)
            setIsTyping(false)
          }
        }
      }, 50)

      return () => clearInterval(typingInterval)
    }
  }, [isTyping, currentResponse, messages])

  const sendMessage = (e) => {
    e.preventDefault()
    const messageCopy = [...messages]
    messageCopy.push({ type: 0, message: messageInput })
    setMessages(messageCopy)
    localStorage.setItem("message_chat_bot", JSON.stringify(messageCopy))

    fetch(`${UrlConfig.apiBaseUrl}/api/chatbot/prompt/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: messageInput })
    })
      .then(res => res.json())
      .then(data => {
        messageCopy.push({ type: 1, message: data.response })
        setMessages(messageCopy)
        localStorage.setItem("message_chat_bot", JSON.stringify(messageCopy))
        setIsTyping(true)
      })
      .catch((error) => {
        console.log(error)
      })
    setMessageInput("")
  }

  const renderMessageWithLinks = (text) => {
    const linkRegexHttp = /\[([^\]]+)\]$$(https?:\/\/[^\s]+)$$/g
    if (text) {
      const parts = text.split(linkRegexHttp)
      return parts.map((part, index) => {
        if (index % 3 === 1) {
          const link = parts[index + 1]
          return <a className="text-blue-500 hover:underline" key={index} href={link} target="_blank" rel="noopener noreferrer">{part}</a>
        }
        if (index % 3 === 2) {
          return null
        }
        return part
      })
    }
    return null
  }

  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <Image
              width={50}
              height={50}
              src="/images/logo-aftrip.png"
              alt="Logo"
            />
            <h2 className="text-lg font-semibold">ChatBot</h2>
          </div>
        </DialogHeader>
        <ScrollArea className="h-[300px] w-full pr-4">
          {user && messages.map((message, index) => (
            <div key={index} className={`mb-4 ${message.type === 0 ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-2 rounded-lg ${message.type === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                {isTyping && index === messages.length - 1 ? currentResponse : renderMessageWithLinks(message.message)}
              </div>
            </div>
          ))}
        </ScrollArea>
        <DialogFooter>
          {user ? (
            <form onSubmit={sendMessage} className="flex w-full space-x-2">
              <Input
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Your prompt"
                className="flex-grow"
              />
              <Button type="submit">
                Send
              </Button>
            </form>
          ) : (
            <p className="text-sm text-gray-500">
              Please <Link href="/users/login" className="text-blue-500 hover:underline">login</Link> or <Link href="/users/register" className="text-blue-500 hover:underline">register</Link> before using the ChatBot.
            </p>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

