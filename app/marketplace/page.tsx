"use client"

import { useState } from "react"

import { FileText, Grid, Heart, Image, Package, Plus, Sliders } from 'lucide-react'

import { GridView } from "@/components/GridView"
import { ItemDetailsPopup } from "@/components/ItemDetailsPopup"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"


const categories = [
  { name: "NFT", icon: Image },
  { name: "Articles", icon: FileText },
  { name: "Other", icon: Package }
]

export default function MarketplacePage() {
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel")
  const [selectedItem, setSelectedItem] = useState<{ category: string; id: number } | null>(null)
  const [votes, setVotes] = useState<Record<string, number>>({})

  const handleItemClick = (category: string, id: number) => {
    setSelectedItem({ category, id })
  }

  const handleVote = (category: string, id: number) => {
    const key = `${category}-${id}`
    setVotes((prev) => ({ ...prev, [key]: (prev[key] || 0) + 1 }))
  }

  const allItems = categories.flatMap((category) =>
    Array.from({ length: 5 }, (_, index) => ({ id: index + 1, category: category.name }))
  )

  const ItemCard = ({ category, id }: { category: string; id: number }) => (
    <Card className="relative">
      <CardContent className="flex aspect-square items-center justify-center p-6">
        <span className="text-3xl font-semibold">{category} {id}</span>
      </CardContent>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 group"
        onClick={(e) => {
          e.stopPropagation()
          handleVote(category, id)
        }}
      >
        <Heart className={cn(
          "h-4 w-4 group-hover:text-red-500",
          votes[`${category}-${id}`] ? "fill-red-500 text-red-500" : ""
        )} />
      </Button>
      {votes[`${category}-${id}`] && (
        <span className="absolute bottom-2 left-2 text-sm font-semibold">
          {votes[`${category}-${id}`]}
        </span>
      )}
      <Button
        variant="ghost"
        size="icon"
        className="absolute bottom-2 right-2"
        onClick={() => handleItemClick(category, id)}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </Card>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setViewMode(viewMode === "carousel" ? "grid" : "carousel")}
        >
          {viewMode === "carousel" ? <Grid className="h-4 w-4" /> : <Sliders className="h-4 w-4" />}
        </Button>
      </div>
      
      {categories.map((category) => (
        <div key={category.name} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <category.icon className="mr-2" />
            {category.name}
          </h2>
          {viewMode === "carousel" ? (
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <ItemCard category={category.name} id={index + 1} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ) : (
            <GridView
              category={category.name}
              items={5}
              onItemClick={(id: number) => handleItemClick(category.name, id)}
              renderItem={(id: number) => <ItemCard category={category.name} id={id} />}
            />
          )}
        </div>
      ))}

      {selectedItem && (
        <ItemDetailsPopup
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          items={allItems}
          initialIndex={allItems.findIndex(
            (item) => item.category === selectedItem.category && item.id === selectedItem.id
          )}
          votes={votes}
          onVote={handleVote}
        />
      )}
    </div>
  )
}