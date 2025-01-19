'use client'

import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'

export default function AttemptQuizButton({ courseId, userId }: { courseId: string; userId: string }) {
  const [score, setScore] = useState<number | null>(null) // To store the user's score or null if no score exists
  const [isHovered, setIsHovered] = useState(false) // To manage the tooltip visibility

  // Fetch score when component mounts
  useEffect(() => {
    const fetchScore = async () => {
      try {
        const response = await fetch(`https://techrise-quiz.vercel.app/api/get_score?courseId=${courseId}&userId=${userId}`, {
          method: 'GET',
        })

        if (response.ok) {
          const data = await response.json()
          if (data.score === null) {
            setScore(null) // If score is null, we render the "Attempt Quiz" button
          } else {
            setScore(data.score) // Set score if a valid score is returned
          }
        } else {
          console.log(response)
          toast.error('Failed to fetch score. Please try again.')
        }
      } catch (error) {
        toast.error('Error occurred while fetching the score.')
      }
    }

    fetchScore()
  }, [courseId, userId]) // Run the effect when courseId or userId changes

  // Handler for clicking the button
  const handleAttemptQuiz = async () => {
    try {
      // Send GET request to fetch score again when clicking the button (optional, in case it's needed)
      const response = await fetch(`https://techrise-quiz.vercel.app/api/get_score?courseId=${courseId}&userId=${userId}`, {
        method: 'GET',
      })

      if (response.ok) {
        // Store courseId and userId in localStorage
        localStorage.setItem('courseId', courseId)
        localStorage.setItem('userId', userId)

        // Redirect to quiz platform
        window.location.href = 'https://techrise-quiz.vercel.app'
      } else {
        toast.error('Failed to fetch score. Please try again.')
      }
    } catch (error) {
      toast.error('Error occurred while attempting the quiz.')
    }
  }

  return (
    <div className="relative">
      {score === null ? (
        <Button
          className="flex items-center space-x-2 border border-black bg-white text-black hover:bg-gray-100"
          onClick={handleAttemptQuiz}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span>Attempt Quiz</span>

          {isHovered && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-black text-white text-sm rounded shadow-lg">
              Only attempt the quiz if you&apos;re confident that you understand the material covered.
            </div>
          )}
        </Button>
      ) : (
        <div className="text-xl font-semibold">
          Your Score: {score}
        </div>
      )}
    </div>
  )
}
