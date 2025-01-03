
interface GridViewProps {
  category: string
  items: number
  onItemClick: (id: number) => void
  renderItem: (id: number) => React.ReactNode
}

export function GridView({ category, items, onItemClick, renderItem }: GridViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} onClick={() => onItemClick(index + 1)}>
          {renderItem(index + 1)}
        </div>
      ))}
    </div>
  )
}