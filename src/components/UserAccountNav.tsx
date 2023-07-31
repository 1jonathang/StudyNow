import { User } from 'next-auth'
import React from 'react'

type Props = {
    // wen can't just import User as is, we need to pick out certain attributes
    user: Pick<User, "name" | "image" | "email">
}

const UserAccountNav = ({user}: Props) => {
  return (
    <div>UserAccountNav</div>
  )
}

export default UserAccountNav