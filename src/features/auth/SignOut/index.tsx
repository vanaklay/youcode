'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { signOut } from 'next-auth/react'

type SignOutProps = {
  user:
    | ({
        name?: string | null | undefined
        email?: string | null | undefined
        image?: string | null | undefined
      } & {
        id?: string | undefined
      })
    | undefined
}
export const SignOut = ({ user }: SignOutProps) => {
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(false)
  return (
    <AlertDialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Profile</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel className="flex">
            {user?.image && user.name && (
              <Avatar className="mr-2 h-5 w-5">
                <AvatarImage src={user.image} alt={user.name} />
              </Avatar>
            )}
            {user ? user.name : 'My account'}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>GitHub</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={() => {
                setOpenDropdown(false)
                setShowNewTeamDialog(true)
              }}
            >
              log out
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure to log out ?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setShowNewTeamDialog(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => signOut()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
