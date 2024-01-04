"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { sample } from "lodash"

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
function indexToLetter(index: number) {
  return alphabet[index - 1]
}

enum TrainingType {
  Base = 'base',
  Around = 'around',
  All = 'all'
}

function newGuess(style: TrainingType) {
  switch (style) {
    case TrainingType.Base:
      return sample([0, 5, 10, 15, 20]) + 1
    case TrainingType.Around:
      return sample([0, 1, 4, 5, 6, 9, 10, 11, 14, 15, 16, 19, 20, 21]) + 1
    case TrainingType.All:
      return Math.floor(Math.random() * 26) + 1
  }
}

export default function Home() {
  const [index, setIndex] = useState(1)
  const [input, setInput] = useState('')
  const [difficulty, setDifficulty] = useState<TrainingType>(TrainingType.Base)
  const [color, setColor] = useState('')



  function submit() {
    const correct = Number(input) === index

    if (correct) {
      setIndex(newGuess(difficulty))
      setColor('green')
    } else {
      setColor('red')
    }

    setInput('')
  }

  console.log(color)

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-md flex justify-around mb-10">
        <Button onClick={() => setDifficulty(TrainingType.Base)} className={cn("bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded", difficulty === TrainingType.Base && 'shadow-inner border-2 border-green-700')}>Base</Button>
        <Button onClick={() => setDifficulty(TrainingType.Around)} className={cn("bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded", difficulty === TrainingType.Around && 'shadow-inner border-2 border-yellow-700')}>Around</Button>
        <Button onClick={() => setDifficulty(TrainingType.All)} className={cn("bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded", difficulty === TrainingType.All && 'shadow-inner border-2 border-red-700')}>All</Button>
      </div>
      <div className="text-9xl font-bold text-gray-900 dark:text-gray-100">{indexToLetter(index)}</div>
      <div className="mt-8">
        <form action={submit}>
          <Label htmlFor="input-box">What is it&apos;s position?</Label>
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            className={`mt-2 border-4 ${color ? (color === 'red' ? 'border-red-700' : 'border-green-700') : ''}`}
            id="input-box"
            placeholder="Enter a number..." />
        </form>
      </div>
    </main>
  )
}
