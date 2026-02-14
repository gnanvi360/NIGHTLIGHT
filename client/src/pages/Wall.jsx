import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Hash, Filter, Plus, MessageCircle } from 'lucide-react'
import Button from '../components/ui/Button'

const Wall = () => {
    const [filter, setFilter] = useState('all')
    const [showInput, setShowInput] = useState(false)
    const [notes, setNotes] = useState([
        { id: 1, text: "The city lights look like code tonight.", tag: "thought", likes: 12, liked: false },
        { id: 2, text: "I just need someone to tell me it's okay to fail.", tag: "vent", likes: 45, liked: true },
        { id: 3, text: "Drifting in zero gravity.", tag: "mood", likes: 8, liked: false },
        { id: 4, text: "Why is 3AM the most honest hour?", tag: "thought", likes: 156, liked: false },
        { id: 5, text: "Sending virtual hugs to anyone reading this.", tag: "love", likes: 89, liked: true },
    ])
    const [newNote, setNewNote] = useState("")
    const [selectedTag, setSelectedTag] = useState("thought")

    const tags = ['thought', 'vent', 'mood', 'love']

    const handlePost = (e) => {
        e.preventDefault()
        if (!newNote.trim()) return

        const note = {
            id: Date.now(),
            text: newNote,
            tag: selectedTag,
            likes: 0,
            liked: false
        }

        setNotes([note, ...notes])
        setNewNote("")
        setShowInput(false)
    }

    const toggleLike = (id) => {
        setNotes(notes.map(note => {
            if (note.id === id) {
                return {
                    ...note,
                    likes: note.liked ? note.likes - 1 : note.likes + 1,
                    liked: !note.liked
                }
            }
            return note
        }))
    }

    const filteredNotes = filter === 'all' ? notes : notes.filter(n => n.tag === filter)

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Header and Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                        Anonymous Wall
                    </h2>
                    <p className="text-zinc-500">Encrypted thoughts from the collective.</p>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                    <Filter className="w-4 h-4 text-zinc-600 mr-2" />
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${filter === 'all' ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-zinc-300'}`}
                    >
                        All
                    </button>
                    {tags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setFilter(tag)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${filter === tag ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-zinc-300'}`}
                        >
                            {tag}
                        </button>
                    ))}
                    <Button onClick={() => setShowInput(!showInput)} className="ml-2 px-3 py-2">
                        <Plus className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {/* Input Area */}
            <AnimatePresence>
                {showInput && (
                    <motion.form
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        onSubmit={handlePost}
                        className="overflow-hidden bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm"
                    >
                        <textarea
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            placeholder="Broadcast your thought..."
                            maxLength={200}
                            className="w-full bg-transparent border-none text-lg text-zinc-100 placeholder-zinc-600 focus:ring-0 resize-none h-24"
                        />
                        <div className="flex items-center justify-between border-t border-zinc-800 pt-4 mt-2">
                            <div className="flex gap-2">
                                {tags.map(tag => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => setSelectedTag(tag)}
                                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${selectedTag === tag ? 'bg-violet-500/20 text-violet-300 border border-violet-500/50' : 'text-zinc-500 hover:text-zinc-300'}`}
                                    >
                                        #{tag}
                                    </button>
                                ))}
                            </div>
                            <Button type="submit" variant="primary" className="px-6 py-2 h-auto text-sm">
                                Transmit
                            </Button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>

            {/* Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {filteredNotes.map((note) => (
                        <motion.div
                            layout
                            key={note.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            whileHover={{ y: -5 }}
                            className="group relative flex flex-col justify-between p-6 bg-zinc-900/30 border border-white/5 rounded-2xl hover:bg-zinc-900/60 hover:border-white/10 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300"
                        >
                            <div className="mb-4">
                                <span className="inline-block px-2 py-1 mb-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500 border border-zinc-800 rounded bg-zinc-950">
                                    #{note.tag}
                                </span>
                                <p className="text-lg text-zinc-300 font-light leading-relaxed font-serif italic">
                                    "{note.text}"
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <div className="flex items-center gap-4 text-zinc-500 text-xs">
                                    <span className="flex items-center gap-1">
                                        <MessageCircle className="w-3 h-3" /> Anonymous
                                    </span>
                                </div>
                                <button
                                    onClick={() => toggleLike(note.id)}
                                    className={`flex items-center gap-1.5 text-xs font-medium transition-all ${note.liked ? 'text-rose-500' : 'text-zinc-600 hover:text-zinc-400'}`}
                                >
                                    <Heart className={`w-4 h-4 ${note.liked ? 'fill-rose-500' : ''}`} />
                                    {note.likes}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

export default Wall
