"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Confetti } from './Confetti'

interface Candidate {
  name: string
  votes: number
}

export default function VoteCounter() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [newCandidate, setNewCandidate] = useState('')
  const [isVotingClosed, setIsVotingClosed] = useState(false)
  const [winner, setWinner] = useState<Candidate | null>(null)

  const addCandidate = () => {
    if (newCandidate.trim() !== '') {
      setCandidates([...candidates, { name: newCandidate, votes: 0 }])
      setNewCandidate('')
    }
  }

  const vote = (index: number) => {
    const updatedCandidates = [...candidates]
    updatedCandidates[index].votes += 1
    setCandidates(updatedCandidates)
  }

  const setVotes = (index: number, votes: number) => {
    const updatedCandidates = [...candidates]
    updatedCandidates[index].votes = Math.max(0, votes)
    setCandidates(updatedCandidates)
  }

  const endVoting = () => {
    setIsVotingClosed(true)
    const winningCandidate = candidates.reduce((prev, current) => 
      (prev.votes > current.votes) ? prev : current
    )
    setWinner(winningCandidate)
  }

  const resetVotes = () => {
    setCandidates(candidates.map(candidate => ({ ...candidate, votes: 0 })))
    setIsVotingClosed(false)
    setWinner(null)
  }

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center text-blue-600"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Nom de la promotion 2025
      </motion.h1>
      
      <motion.div 
        className="mb-8 flex gap-2 justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Input
          type="text"
          value={newCandidate}
          onChange={(e) => setNewCandidate(e.target.value)}
          placeholder="Nom du candidat"
          className="max-w-sm"
        />
        <Button onClick={addCandidate} className="bg-blue-500 hover:bg-blue-600">Ajouter un nom</Button>
      </motion.div>

      <motion.div 
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <AnimatePresence>
          {candidates.map((candidate, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500">
                  <CardTitle className="text-white">{candidate.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Input
                      type="number"
                      value={candidate.votes}
                      onChange={(e) => setVotes(index, parseInt(e.target.value))}
                      disabled={isVotingClosed}
                      className="w-24"
                    />
                    <span className="text-lg font-semibold">votes</span>
                  </div>
                  <Button 
                    onClick={() => vote(index)} 
                    disabled={isVotingClosed}
                    className="w-full bg-purple-500 hover:bg-purple-600"
                  >
                    Voter
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <motion.div 
        className="mt-8 flex gap-4 justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Button 
          onClick={endVoting} 
          disabled={isVotingClosed || candidates.length === 0}
          className="bg-green-500 hover:bg-green-600"
        >
          Terminer le vote
        </Button>
        <Button 
          onClick={resetVotes} 
          variant="outline" 
          disabled={isVotingClosed}
          className="border-red-500 text-red-500 hover:bg-red-50"
        >
          Réinitialiser les votes
        </Button>
      </motion.div>

      <AnimatePresence>
        {isVotingClosed && winner && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500">
              <CardHeader>
                <CardTitle className="text-white text-center text-2xl">Résultat du vote</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-white text-center text-xl">
                  Le gagnant est : <strong className="text-2xl">{winner.name}</strong> avec {winner.votes} votes
                </p>
              </CardContent>
            </Card>
            <Confetti />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

