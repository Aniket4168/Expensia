import React from 'react'
import { SignInButton, SignUpButton, SignedIn, UserButton, SignedOut } from '@clerk/nextjs'
const Header = () => {
  return (
    <div>
        <SignedOut>
              <SignInButton />
        </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
    </div>
  )
}

export default Header