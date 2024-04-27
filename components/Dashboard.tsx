import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

const rewards = [
    {
      address: "0x24090b6A8eD5eE33dB5D7B34ebAa5899b4920001",
      rank: "0001",
      boost: "1.5x",
      points: "2500",
    },
    {
      address: "0x24090b6A8eD5eE33dB5D7B34ebAa5899b4920001",
      rank: "0025",
      boost: "1.5x",
      points: "1500",
    },
    {
      address: "0x24090b6A8eD5eE33dB5D7B34ebAa5899b4920001",
      rank: "0254",
      boost: "1.5x",
      points: "350",
    },
    {
      address: "0x24090b6A8eD5eE33dB5D7B34ebAa5899b4920001",
      rank: "0185",
      boost: "1.5x",
      points: "450",
    },
    {
      address: "0x24090b6A8eD5eE33dB5D7B34ebAa5899b4920001",
      rank: "0101",
      boost: "1.5x",
      points: "550",
    },
]

export default function Dashboard() {
    return (
        <Table className="border-none text-base">
            <TableHeader className="mx-6">
              <TableRow className="border-y bg-white">
                  <TableHead className="w-[100px] px-6 text-foreground font-bold border-foreground">Address</TableHead>
                  <TableHead className="text-foreground font-bold">Rank</TableHead>
                  <TableHead className="text-foreground font-bold">Boost</TableHead>
                  <TableHead className="text-right text-foreground font-bold px-6">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {rewards.map((item) => (
                <TableRow key={item.address} className="border-y hover:bg-footer">
                    <TableCell className="p-6 font-medium">{item.address}</TableCell>
                    <TableCell>{item.rank}</TableCell>
                    <TableCell>{item.boost}</TableCell>
                    <TableCell className="p-6 text-right">{item.points}</TableCell>
                </TableRow>
            ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                  <TableCell className="px-6 py-4 " colSpan={3}>Total</TableCell>
                  <TableCell className="p-6 text-right">5350</TableCell>
              </TableRow>
            </TableFooter>
        </Table>
    )
}
