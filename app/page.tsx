import Image from 'next/image'
import { Sidebar } from "@/components/Sidebar"
import { InventoryTable } from "@/components/InventoryTable"
import kishimotoImage from './kishimoto.jpg'

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-[60px]">       
        <div className="bg-black w-full flex justify-center mb-4">
          <Image 
            src={kishimotoImage} 
            alt="Kishimoto Restaurant" 
            priority 
          />
        </div>
        <main className="container mx-auto py-4">
          <InventoryTable />
        </main>
      </div>
    </div>
  )
}