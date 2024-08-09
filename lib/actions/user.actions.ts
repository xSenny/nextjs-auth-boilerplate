'use server'

import { cache } from "react"
import { connectToDatabase } from "../database"
import User from "../database/models/User"
import { verifySession } from "../sessions"

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    await connectToDatabase();
    console.log(session.userId)

    const data = await User.findById(session.userId)

    return userDTO(data);
  } catch (e) {
    console.log('Failed to fetch user.')
    return null;
  }
})

const userDTO = (user: any) => {
  return {
    username: user.username,
    email: user.email,
    id: user._id
  }
}