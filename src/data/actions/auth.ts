'use server';
import { AuthError } from 'next-auth';
import { signIn } from '@/auth';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { connect } from "@/data/dbConfig";
import user from '@/data/models/user';
import { redirect } from 'next/navigation';

const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(4, { message: "Username is required" }).trim(),
  email: z.string().email().trim(),
  password: z.string().regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/),
});

const Add = UserSchema.omit({ id: true });

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
  info?: boolean | false;
};

export async function addUser(prevState: State, formData: FormData) {
  const validatedFields = Add.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Add this item.',
    };
  }
  connect()
  try {

    const count = await user.countDocuments();
    if (count > 0) {
      return {
        message: 'You are not authorized to add.',
      }
    }
    
    const { name, email, password } = validatedFields.data;
    const f3 = validatedFields.data.password
    const newItem = new user({ name, email, password });
    newItem.password = await bcrypt.hash(f3, 10)

    const saveItem = await newItem.save()
    return ({
      message: "User added successfully",
      info: true,
    })
  } catch (error: any) {
    console.log(error)
    if (+error.code === 11000) {
      return ({
        message: 'Email already exist '
      })

    } else {
      return {
        message: 'Database Error: Failed to add.',
      }
    }
  }
}


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
    redirect('/dashboard');
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}