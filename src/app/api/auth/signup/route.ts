import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'



export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json()

    // Check if user already exists (both email and username)

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      },
    })

    if (existingUser) {
      const field = existingUser.email === email ? '이메일' : '아이디'
      return NextResponse.json(
        { error: `이미 사용 중인 ${field}입니다.` },
        { status: 400 }
      )
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    })

    return NextResponse.json({
      message: '회원가입이 완료되었습니다.',
      user: { username: user.username, email: user.email },
    })
  } catch (error: any) {
    console.error('Signup error details:', error)
    return NextResponse.json(
      { error: `회원가입 처리 중 오류 발생: ${error.message || '알 수 없는 오류'}` },
      { status: 500 }
    )
  }
}

