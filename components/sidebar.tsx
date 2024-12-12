import { LayoutGrid, ShoppingCart, Users, Settings, Package } from 'lucide-react'
import { cn } from "@/lib/utils"

export function Sidebar() {
  return (
    <div className="fixed left-0 h-screen w-[60px] bg-zinc-900 text-white">
      <div className="flex flex-col items-center gap-8 py-4">
        <div className="p-2">
          <LayoutGrid className="h-5 w-5" />
        </div>
        <nav className="flex flex-col gap-4">
          <a
            href="#"
            className={cn(
              "p-2 rounded-lg transition-colors",
              "bg-primary text-primary-foreground"
            )}
          >
            <ShoppingCart className="h-5 w-5" />
          </a>
          <a
            href="#"
            className="p-2 rounded-lg transition-colors hover:bg-zinc-800"
          >
            <Users className="h-5 w-5" />
          </a>
          <a
            href="#"
            className="p-2 rounded-lg transition-colors hover:bg-zinc-800"
          >
            <Package className="h-5 w-5" />
          </a>
          <a
            href="#"
            className="p-2 rounded-lg transition-colors hover:bg-zinc-800"
          >
            <Settings className="h-5 w-5" />
          </a>
        </nav>
      </div>
    </div>
  )
}

