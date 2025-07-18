"use client"

import { useState } from "react"
import { Menu, X, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"

interface MobileNavigationProps {
  user?: any
  profile?: any
  onSignOut?: () => void
}

export function MobileNavigation({ user, profile, onSignOut }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="p-2">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between pb-4 border-b">
              <h2 className="text-lg font-semibold">Menu</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 py-6 space-y-4">
              {user ? (
                <>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <User className="h-8 w-8 text-gray-600" />
                    <div>
                      <div className="font-medium">
                        {profile?.first_name && profile?.last_name
                          ? `${profile.first_name} ${profile.last_name}`
                          : profile?.email}
                      </div>
                      <div className="text-sm text-gray-600">Signed in</div>
                    </div>
                  </div>

                  <nav className="space-y-2">
                    <Link
                      href="/dashboard"
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/profile"
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Profile Settings
                    </Link>
                  </nav>

                  <div className="pt-4 border-t">
                    <Button
                      onClick={() => {
                        onSignOut?.()
                        setIsOpen(false)
                      }}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-black hover:bg-gray-800 text-white">Login</Button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full text-white hover:opacity-90" style={{ backgroundColor: "#FA9937" }}>
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            <div className="pt-4 border-t text-center">
              <div className="text-xs text-gray-500">© 2024 Schengen Visa Calculator</div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
