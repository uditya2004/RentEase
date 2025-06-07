"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, AlertTriangle, MessageSquare } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: Date
  type: "message" | "discrepancy"
}

interface ChatUser {
  id: string
  name: string
  role: "landlord" | "tenant"
  avatar?: string
  lastSeen?: Date
}

const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "1",
    senderName: "John Landlord",
    content: "Hi Sarah, I've updated your January rent calculation. Please review it.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    type: "message",
  },
  {
    id: "2",
    senderId: "2",
    senderName: "Sarah Tenant",
    content: "Thank you! I noticed the electricity reading seems higher than usual. Could you please check?",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    type: "discrepancy",
  },
  {
    id: "3",
    senderId: "1",
    senderName: "John Landlord",
    content: "I'll double-check the meter reading and get back to you by tomorrow.",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    type: "message",
  },
]

const mockChatUser: ChatUser = {
  id: "1",
  name: "John Landlord",
  role: "landlord",
  avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/38184074.jpg-M4vCjTSSWVw5RwWvvmrxXBcNVU8MBU.jpeg",
  lastSeen: new Date(Date.now() - 10 * 60 * 1000),
}

export function ChatInterface() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [selectedUser] = useState<ChatUser | null>(mockChatUser)
  const [messageType, setMessageType] = useState<"message" | "discrepancy">("message")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedUser || !user) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      senderName: user.name,
      content: newMessage,
      timestamp: new Date(),
      type: messageType,
    }

    setMessages([...messages, message])
    setNewMessage("")
    setMessageType("message")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatLastSeen = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Active now"
    if (diffInMinutes < 60) return `Active ${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `Active ${Math.floor(diffInMinutes / 60)}h ago`
    return `Active ${Math.floor(diffInMinutes / 1440)}d ago`
  }

  if (!user) return null

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Chat Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-4 border-b bg-background">
        <div className="flex items-center space-x-3">
          <MessageSquare className="h-5 w-5" />
          <span className="text-base sm:text-lg font-semibold truncate">
            {selectedUser ? `Chat with ${selectedUser.name}` : "Select a conversation"}
          </span>
        </div>
        {selectedUser && (
          <Badge variant="outline" className="self-start sm:self-center">
            {selectedUser.lastSeen && formatLastSeen(selectedUser.lastSeen)}
          </Badge>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        {selectedUser ? (
          <div className="h-full flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === user.id ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[280px] sm:max-w-xs lg:max-w-md px-3 sm:px-4 py-2 rounded-lg ${
                      message.senderId === user.id ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      {message.type === "discrepancy" && <AlertTriangle className="h-3 w-3 text-yellow-500" />}
                      <span className="text-xs opacity-70">{message.senderName}</span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">{formatTime(message.timestamp)}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <div className="text-center px-4">
              <MessageSquare className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm sm:text-base">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* Input Area - Fixed at bottom */}
      {selectedUser && (
        <div className="border-t bg-background p-4 sm:p-4 space-y-4 sm:space-y-3">
          {/* Message Type Buttons */}
          {user.role === "tenant" && (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
              <Button
                variant={messageType === "message" ? "default" : "outline"}
                size="default"
                onClick={() => setMessageType("message")}
                className="flex-1 sm:flex-initial h-12 sm:h-10 text-base sm:text-sm font-medium"
              >
                Message
              </Button>
              <Button
                variant={messageType === "discrepancy" ? "default" : "outline"}
                size="default"
                onClick={() => setMessageType("discrepancy")}
                className="flex-1 sm:flex-initial h-12 sm:h-10 text-base sm:text-sm font-medium"
              >
                <AlertTriangle className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Report Issue</span>
                <span className="sm:hidden">Report</span>
              </Button>
            </div>
          )}

          {/* Message Input */}
          <div className="flex gap-3 sm:gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                messageType === "discrepancy" ? "Describe the rent discrepancy..." : "Type your message..."
              }
              className="flex-1 h-12 sm:h-10 text-base sm:text-sm px-4 sm:px-3"
            />
            <Button 
              onClick={sendMessage} 
              disabled={!newMessage.trim()}
              className="h-12 sm:h-10 px-4 sm:px-3 min-w-[48px] sm:min-w-[40px]"
            >
              <Send className="h-5 w-5 sm:h-4 sm:w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
      )}
    </div>
    )
  }
