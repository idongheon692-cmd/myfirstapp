import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'



export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: '이메일 또는 비밀번호가 잘못되었습니다.' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      message: '로그인 성공',
      user: { username: user.username, email: user.email },
    })
  } catch (error: any) {
    console.error('Login error details:', error)
    return NextResponse.json(
      { error: `로그인 처리 중 오류 발생: ${error.message || '알 수 없는 오류'}` },
      { status: 500 }
    )
  }
}

