'use client';

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import { CalendarIcon, Filter, Plus } from 'lucide-react'
import { format } from "date-fns"


export function OrdersTable() {  
  const [date, setDate] = useState<Date>()

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Inventory</h1>
        <div className="flex gap-2">     
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Items
          </Button>
        </div>
      </div>
      
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <Input placeholder="Search by Name..." />
        </div>        
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input type="checkbox" className="rounded border-gray-300" />
              </TableHead>
              <TableHead>Product Name</TableHead>              
              <TableHead>Type</TableHead>             
              <TableHead>Items</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Last Order</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <input type="checkbox" className="rounded border-gray-300" />
                </TableCell>
                <TableCell>Asahi</TableCell>                
                <TableCell>Alcohol</TableCell>                
                <TableCell>3</TableCell>
                <TableCell>
                  <Badge variant={i === 1 ? "lowStock" : "inStock"}>
                    {i === 1 ? "Low Stock" : "In Stock"}
                  </Badge>
                </TableCell>        
                <TableCell>          
                <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <CalendarIcon className="w-4 h-4 mr-2" />
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
         </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

