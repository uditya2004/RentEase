"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

const mockChatUsers: ChatUser[] = [
  {
    id: "1",
    name: "John Landlord",
    role: "landlord",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/38184074.jpg-M4vCjTSSWVw5RwWvvmrxXBcNVU8MBU.jpeg",
    lastSeen: new Date(Date.now() - 10 * 60 * 1000),
  },
  {
    id: "2",
    name: "Sarah Tenant",
    role: "tenant",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/375238645_11475210.jpg-lU8bOe6TLt5Rv51hgjg8NT8PsDBmvN.jpeg",
    lastSeen: new Date(Date.now() - 5 * 60 * 1000),
  },
]

export function ChatInterface() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(
    user?.role === "landlord"
      ? mockChatUsers.find((u) => u.role === "tenant") || null
      : mockChatUsers.find((u) => u.role === "landlord") || null,
  )
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chat List - Only show for landlords */}
        {user.role === "landlord" && (
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Tenants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockChatUsers
                  .filter((u) => u.role === "tenant")
                  .map((chatUser) => (
                    <div
                      key={chatUser.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedUser?.id === chatUser.id ? "bg-primary/10 border border-primary/20" : "hover:bg-muted"
                      }`}
                      onClick={() => setSelectedUser(chatUser)}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={chatUser.avatar || "/placeholder.svg"} alt={chatUser.name} />
                        <AvatarFallback>{chatUser.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{chatUser.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {chatUser.lastSeen && formatLastSeen(chatUser.lastSeen)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Chat Interface */}
        <Card className={user.role === "landlord" ? "lg:col-span-2" : "lg:col-span-3"}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-5 w-5" />
                <span>{selectedUser ? `Chat with ${selectedUser.name}` : "Select a conversation"}</span>
              </div>
              {selectedUser && (
                <Badge variant="outline">{selectedUser.lastSeen && formatLastSeen(selectedUser.lastSeen)}</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedUser ? (
              <div className="space-y-4">
                {/* Messages */}
                <div className="h-96 overflow-y-auto space-y-4 p-4 border rounded-lg">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === user.id ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
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

                {/* Message Input */}
                <div className="space-y-2">
                  {user.role === "tenant" && (
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={messageType === "message" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setMessageType("message")}
                      >
                        Message
                      </Button>
                      <Button
                        variant={messageType === "discrepancy" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setMessageType("discrepancy")}
                      >
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        Report Issue
                      </Button>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={
                        messageType === "discrepancy" ? "Describe the rent discrepancy..." : "Type your message..."
                      }
                      className="flex-1"
                    />
                    <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-96 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
