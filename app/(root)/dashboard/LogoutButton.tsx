'use client'
import { LogOutIcon } from 'lucide-react'
import { logOut } from '@/lib/actions/auth.actions'
import React from 'react'

const LogoutButton = () => {
  return (
    <div>
      <button
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-all hover:text-gray-900"
        onClick={async () => {
          await logOut();
        }}
      >
        <LogOutIcon className="h-4 w-4" />
        Logout
      </button>
    </div>
  )
}

export default LogoutButton
