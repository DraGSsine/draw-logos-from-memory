import { Button } from '@/components/Button'
import { ArrowLeft, Clock, Star, Trophy } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <Link href="/">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>

      <div
        className="glass-panel p-8 text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Trophy className="h-16 w-16 text-primary" />
            <div className="absolute -top-2 -right-2 bg-primary/20 p-1 rounded-full">
              <Star className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>

        <h1 className="heading-lg mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          Leaderboard Coming Soon
        </h1>

        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          We&apos;re working hard to track the best logo artists! Soon you&apos;ll be able
          to compete with players worldwide and see who has the sharpest memory
          for brand identities.
        </p>

        <div className="flex justify-center gap-6 mb-8">
          <div className="flex flex-col items-center p-4 rounded-lg bg-primary/5 w-28">
            <Clock className="h-6 w-6 text-primary mb-2" />
            <span className="text-sm text-muted-foreground">Coming in</span>
            <span className="font-bold">7 days</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg bg-primary/5 w-28">
            <Trophy className="h-6 w-6 text-primary mb-2" />
            <span className="text-sm text-muted-foreground">Top Players</span>
            <span className="font-bold">100</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg bg-primary/5 w-28">
            <Star className="h-6 w-6 text-primary mb-2" />
            <span className="text-sm text-muted-foreground">Categories</span>
            <span className="font-bold">5+</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default page