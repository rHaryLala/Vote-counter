"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Confetti } from "./Confetti"
import { PlusCircle, Vote, RotateCcw, CheckCircle2, Trophy } from "lucide-react"
import { addCandidate, getCandidates, voteForCandidate, resetVotes, endVoting } from "./actions"

interface Candidate {
  id: number
  name: string
  votes: number
}

export default function VoteCounter() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [newCandidate, setNewCandidate] = useState("")
  const [isVotingClosed, setIsVotingClosed] = useState(false)
  const [winner, setWinner] = useState<Candidate | null>(null)

  useEffect(() => {
    const fetchCandidates = async () => {
      const fetchedCandidates = await getCandidates()
      setCandidates(fetchedCandidates)
    }
    fetchCandidates()
  }, [])

  const handleAddCandidate = async () => {
    if (newCandidate.trim() !== "") {
      await addCandidate(newCandidate)
      const updatedCandidates = await getCandidates()
      setCandidates(updatedCandidates)
      setNewCandidate("")
    }
  }

  const handleVote = async (id: number) => {
    await voteForCandidate(id)
    const updatedCandidates = await getCandidates()
    setCandidates(updatedCandidates)
  }

  const handleEndVoting = async () => {
    const result = await endVoting()
    setIsVotingClosed(true)
    setWinner(result)
  }

  const handleResetVotes = async () => {
    await resetVotes()
    const updatedCandidates = await getCandidates()
    setCandidates(updatedCandidates)
    setIsVotingClosed(false)
    setWinner(null)
  }

  return (
    <div className="container mx-auto p-8 min-h-screen bg-gray-50">
      <motion.h1
        className="text-4xl font-light mb-12 text-center text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Nom de la promotion 2025
      </motion.h1>

      <motion.div
        className="mb-12 flex gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Input
          type="text"
          value={newCandidate}
          onChange={(e) => setNewCandidate(e.target.value)}
          placeholder="Nom du candidat"
          className="max-w-sm border-gray-300"
        />
        <Button
          onClick={handleAddCandidate}
          className="bg-gray-800 hover:bg-gray-700 text-white transition-colors duration-200"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Ajouter
        </Button>
      </motion.div>

      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <AnimatePresence>
          {candidates.map((candidate) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardHeader className="bg-gray-100 p-4">
                  <CardTitle className="text-gray-800 text-lg font-medium">{candidate.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 bg-white">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <Input
                      type="number"
                      value={candidate.votes}
                      readOnly
                      className="w-20 text-center font-medium border-gray-300"
                    />
                    <span className="text-sm font-medium text-gray-600">votes</span>
                  </div>
                  <Button
                    onClick={() => handleVote(candidate.id)}
                    disabled={isVotingClosed}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors duration-200"
                  >
                    <Vote className="mr-2 h-4 w-4" /> Voter
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="mt-12 flex gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Button
          onClick={handleEndVoting}
          disabled={isVotingClosed || candidates.length === 0}
          className="bg-gray-800 hover:bg-gray-700 text-white transition-colors duration-200"
        >
          <CheckCircle2 className="mr-2 h-4 w-4" /> Terminer
        </Button>
        <Button
          onClick={handleResetVotes}
          variant="outline"
          disabled={isVotingClosed}
          className="border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors duration-200"
        >
          <RotateCcw className="mr-2 h-4 w-4" /> Réinitialiser
        </Button>
      </motion.div>

      <AnimatePresence>
        {isVotingClosed && winner && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-12"
          >
            <Card className="overflow-hidden shadow-lg bg-white border-2 border-gray-800">
              <CardHeader className="bg-gray-800 text-white p-6">
                <CardTitle className="text-center text-3xl font-light flex items-center justify-center">
                  <Trophy className="mr-2 h-6 w-6" /> Résultat du vote
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <motion.p
                  className="text-gray-800 text-center"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Le gagnant est :
                  <motion.strong
                    className="text-4xl block mt-4 mb-2 font-bold text-gray-900"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {winner.name}
                  </motion.strong>
                  <motion.span
                    className="block text-2xl font-medium text-gray-700"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    avec {winner.votes} votes
                  </motion.span>
                </motion.p>
              </CardContent>
            </Card>
            <Confetti />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

