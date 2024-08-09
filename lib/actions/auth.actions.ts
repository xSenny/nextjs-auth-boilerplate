'use server'
import User from "../database/models/User";
import { FormState, LoginFormSchema, SignupFormSchema } from "../definitions";
import bcrypt from 'bcrypt'
import { createSession, deleteSession } from "../sessions";
import { connectToDatabase } from "../database";

export const signUp = async (state: FormState, formData: FormData): Promise<FormState> => {

  console.log('caca')

  const validateFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password')
  })

  if (!validateFields.success) {
    console.log('returned ')
    return {
      errors: validateFields.error.flatten().fieldErrors
    }
  }

  const { username, password, email } = validateFields.data;

  await connectToDatabase()

  const existingUser = await User.find({email: email});

  if (existingUser.length > 0) {
    return {
      message: 'Email already exists, please use another email, or login.'
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username: username,
    password: hashedPassword,
    email
  })

  if (!user) {
    return {
      message: 'An error occured while creating your account.'
    }
  }

  const userId = user._id.toString();

  console.log(userId)

  await createSession(userId);
}

export const logIn = async (state: FormState, formData: FormData): Promise<FormState> => {
  const validateFields = LoginFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password')
  })

  const errorMessage = { message: 'Invalid login credentials.' }
  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    }
  }
  await connectToDatabase()
  const { username } = validateFields.data

  const user = await User.findOne({ username })

  if (!user) return errorMessage;

  const passwordMatch = await bcrypt.compare(
    validateFields.data.password,
    user.password,
  )

  if (!passwordMatch) return errorMessage;

  const userId = user._id as string;
  await createSession(userId)
}

export const logOut = () => {
  deleteSession()
}