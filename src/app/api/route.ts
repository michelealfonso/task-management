import { clientPrisma } from '@/lib/client';
import { NextResponse } from "next/server";
import { hash } from 'bcryptjs';
import * as z from 'zod';

const userSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
  })

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { email, username, password } = userSchema.parse(body);

        // contorlliamo se l'email esiste

        const existingUserByEmail = await clientPrisma.user.findUnique({
            where: { email: email }
        });


        if(existingUserByEmail) {
            return NextResponse.json({ user: null, message: 'User with this email already exists'}, { status: 409 });
        }

        // controlliamo se l'username esiste

        const existingUserByUsername = await clientPrisma.user.findUnique({
            where: { username: username }
        });


        if(existingUserByUsername) {
            return NextResponse.json({ user: null, message: 'User with this username already exists'}, { status: 409 });
        }

        const hashedPassword = await hash(password, 10);
        const newUser = await clientPrisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })

        const { password: newUserPassword , ...rest } = newUser;

        return NextResponse.json({ user: newUser , message: 'User created successfully' }, { status: 201 });

    }
    catch(error) {
        return NextResponse.json({ message: 'Something was wrong '}, { status: 500 })
    }
}