import { ShieldCheck } from 'lucide-react'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex flex-col min-h-screen bg-background">
            <div> {children}</div>
            <footer className="border-t py-6">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2 opacity-60">
                        <ShieldCheck className="h-4 w-4" />
                        <span>IslandLink Secure Checkout</span>
                    </div>
                    <span>&copy; {new Date().getFullYear()} IslandLink ISDMS</span>
                </div>
            </footer>
        </main>
    )
}

export default layout