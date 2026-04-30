import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'


export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json()

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: '이미 가입된 이메일입니다.' },
        { status: 400 }
      )
    }

    // Create user (In production, hash the password!)
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password, // Ideally hashed
      },
    })

    return NextResponse.json({
      message: '회원가입이 완료되었습니다.',
      user: { username: user.username, email: user.email },
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: '회원가입 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
