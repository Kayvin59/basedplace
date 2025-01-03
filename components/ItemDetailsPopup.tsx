import { useState } from "react"

import { ChevronLeft, ChevronRight, Heart } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"


interface ItemDetailsPopupProps {
  isOpen: boolean
  onClose: () => void
  items: { id: number; category: string }[]
  initialIndex: number
  votes: Record<string, number>
  onVote: (category: string, id: number) => void
}

export function ItemDetailsPopup({ isOpen, onClose, items, initialIndex, votes, onVote }: ItemDetailsPopupProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0))
  }

  const currentItem = items[currentIndex]
  const voteKey = `${currentItem.category}-${currentItem.id}`

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{currentItem.category} Item {currentItem.id}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <Button variant="outline" size="icon" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1 text-center">
            {/* Item details go here */}
            <p>Details for {currentItem.category} Item {currentItem.id}</p>
            <div className="flex items-center justify-center mt-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onVote(currentItem.category, currentItem.id)}
              >
                <Heart className={cn("h-6 w-6", votes[voteKey] ? "fill-red-500 text-red-500" : "")} />
              </Button>
              <span className="ml-2 text-sm font-semibold">{votes[voteKey] || 0} votes</span>
            </div>
          </div>
          <Button variant="outline" size="icon" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}