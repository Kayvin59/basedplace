"use client"

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useDashboardStats } from "@/hooks/useDashboardStats";

export default function Dashboard() {
    const { dashboardStats, isLoading, error } = useDashboardStats();

    if (error) {
      return <div>Error loading dashboard stats: {error.message}</div>;
    }

    return (
      <>
        <h2 className='p-6 text-2xl font-secondary'>Dashboard</h2>
        <Table className="border-none text-base">
            <TableHeader className="mx-6">
              <TableRow className="border-y bg-background hover:bg-background">
                  <TableHead className="w-[100px] px-6 text-foreground font-bold border-foreground">Address</TableHead>
                  <TableHead className="text-foreground font-bold">Rank</TableHead>
                  <TableHead className="text-foreground font-bold">Boost</TableHead>
                  <TableHead className="text-right text-foreground font-bold px-6">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {isLoading ? (
              Array(5).fill(0).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-4 w-[100px] ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : (
              dashboardStats?.userStats.map((item, index) => (
                <TableRow key={item.address} className="border-y hover:bg-footer hover:text-white">
                    <TableCell className="p-6 font-medium">{item.address}</TableCell>
                    <TableCell>{(index + 1).toString().padStart(4, '0')}</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell className="p-6 text-right">{item.points}</TableCell>
                </TableRow>
              ))
            )}
            </TableBody>
            <TableFooter>
              <TableRow>
                  <TableCell className="px-6 py-4" colSpan={3}>Total</TableCell>
                  <TableCell className="p-6 text-right">
                    {isLoading ? (
                      <Skeleton className="h-4 w-[100px] ml-auto" />
                    ) : (
                      dashboardStats?.totalPoints
                    )}
                  </TableCell>
              </TableRow>
            </TableFooter>
        </Table>
      </>
    )
}