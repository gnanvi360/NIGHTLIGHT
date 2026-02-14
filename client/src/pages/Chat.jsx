import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles, Brain, Heart, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../components/ui/Button'
import { twMerge } from 'tailwind-merge'

const personas = [
    { id: 'empathetic', name: 'Luna', icon: Heart, description: 'Empathetic & Gentle', color: 'text-rose-400', bg: 'bg-rose-500/10' },
    { id: 'logical', name: 'Atlas', icon: Brain, description: 'Logical & Direct', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { id: 'creative', name: 'Muse', icon: Sparkles, description: 'Creative & Abstract', color: 'text-violet-400', bg: 'bg-violet-500/10' },
]

const Chat = () => {
    const [selectedPersona, setSelectedPersona] = useState(personas[0])
    const [messages, setMessages] = useState([
        { id: 1, text: "Systems online. Monitoring emotional frequencies. How can I assist you tonight?", sender: 'ai', persona: personas[1] } // Start with Atlas just for fun variation
    ])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages, isTyping])

    const handleSend = (e) => {
        e.preventDefault()
        if (!input.trim()) return

        const userMsg = { id: Date.now(), text: input, sender: 'user' }
        setMessages(prev => [...prev, userMsg])
        setInput('')
        setIsTyping(true)

        // Simulate AI response
        setTimeout(() => {
            const aiMsg = {
                id: Date.now() + 1,
                text: getResponse(input, selectedPersona.id),
                sender: 'ai',
                persona: selectedPersona
            }
            setMessages(prev => [...prev, aiMsg])
            setIsTyping(false)
        }, 1500 + Math.random() * 1000)
    }

    const getResponse = (input, personaId) => {
        const responses = {
            empathetic: [
                "I can feel that this is important to you. I'm here.",
                "That sounds incredibly heavy. You're safe sharing more here.",
                "Take a breath. You're doing the best you can.",
                "I wish I could offer a hug, but I offer my full attention."
            ],
            logical: [
                "Analyzing the situation. Have you considered breaking this down into smaller steps?",
                "That is a valid observation. Let's look at the variables.",
                "Logic suggests that this feeling is temporary, though valid.",
                "Effective coping strategy detected. Proceed."
            ],
            creative: [
                "Imagine your worry as a cloud passing through a vast sky.",
                "That reminds me of a storm... chaotic but necessary for growth.",
                "Let's paint a new perspective on this.",
                "What color is this emotion for you right now?"
            ]
        }
        const pool = responses[personaId]
        return pool[Math.floor(Math.random() * pool.length)]
    }

    return (
        <div className="grid h-[calc(100vh-8rem)] gap-6 lg:grid-cols-[280px_1fr]">
            {/* Persona Selector - Hidden on mobile initially for simplicity, but let's make it visible */}
            <div className="hidden lg:flex flex-col gap-4">
                <h2 className="text-xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-400" /> Neural Link
                </h2>
                <div className="flex flex-col gap-2">
                    {personas.map((persona) => (
                        <button
                            key={persona.id}
                            onClick={() => setSelectedPersona(persona)}
                            className={twMerge(
                                "group flex items-center gap-4 rounded-xl border border-transparent p-4 text-left transition-all",
                                selectedPersona.id === persona.id
                                    ? "bg-zinc-800 border-zinc-700 shadow-lg"
                                    : "hover:bg-zinc-900 hover:border-zinc-800"
                            )}
                        >
                            <div className={twMerge("flex h-10 w-10 items-center justify-center rounded-lg", persona.bg, persona.color)}>
                                <persona.icon className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="font-bold text-zinc-200">{persona.name}</div>
                                <div className="text-xs text-zinc-500">{persona.description}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                {/* Mobile Persona Header (Simplified) */}
                <div className="flex items-center gap-3 border-b border-zinc-800 p-4 lg:hidden">
                    <Bot className="h-6 w-6 text-cyan-400" />
                    <span className="font-bold">Active: {selectedPersona.name}</span>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800">
                    <AnimatePresence initial={false}>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                            >
                                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.sender === 'user' ? 'bg-zinc-700' : (msg.persona?.bg || 'bg-cyan-500/20')
                                    }`}>
                                    {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className={`h-4 w-4 ${msg.persona?.color || 'text-cyan-400'}`} />}
                                </div>

                                <div className={`max-w-[80%] space-y-1`}>
                                    <div className={`flex items-baseline gap-2 text-xs ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <span className="font-bold text-zinc-300">
                                            {msg.sender === 'user' ? 'You' : msg.persona?.name || 'NightLight'}
                                        </span>
                                        <span className="text-zinc-600">
                                            {new Date(msg.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <div className={`rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm ${msg.sender === 'user'
                                            ? 'bg-zinc-800 text-zinc-100 rounded-tr-none'
                                            : 'bg-zinc-950/80 border border-zinc-800 text-zinc-300 rounded-tl-none'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex gap-4"
                            >
                                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${selectedPersona.bg}`}>
                                    <Bot className={`h-4 w-4 ${selectedPersona.color}`} />
                                </div>
                                <div className="flex items-center gap-1 rounded-2xl rounded-tl-none bg-zinc-950/80 px-5 py-3 border border-zinc-800">
                                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500"></span>
                                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500 delay-100"></span>
                                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500 delay-200"></span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t border-zinc-800 p-4">
                    <form onSubmit={handleSend} className="relative flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={`Message ${selectedPersona.name}...`}
                            className="flex-1 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-zinc-200 placeholder-zinc-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all font-mono text-sm"
                        />
                        <Button
                            type="submit"
                            disabled={!input.trim() || isTyping}
                            className="px-4"
                        >
                            <Send className="h-5 w-5" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Chat
