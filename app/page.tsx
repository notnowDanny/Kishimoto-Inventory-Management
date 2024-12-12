import Image from 'next/image'
import { Sidebar } from "@/components/sidebar"
import { OrdersTable } from "@/components/orders-table"
import kishimotoImage from './kishimoto.jpg'

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-[60px]">
        {/* Restaurant Image Header */}
        <div className="bg-black w-full flex justify-center mb-4">
          <Image 
            src={kishimotoImage} 
            alt="Kishimoto Restaurant" 
            priority 
          />
        </div>
        <main className="container mx-auto py-4">
          <OrdersTable />
        </main>
      </div>
    </div>
  )
}