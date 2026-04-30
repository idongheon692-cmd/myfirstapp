'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        alert(`${data.user.username}님 회원가입이 완료되었습니다!`)
        router.push('/login')
      } else {
        alert(data.error || '회원가입에 실패했습니다.')
      }
    } catch (error) {
      console.error('Signup error:', error)
      alert('오류가 발생했습니다.')
    }
  }

  return (
    <main className="auth-container">
      <div className="auth-box">
        <h2>회원가입</h2>
        <p className="subtitle">새로운 계정을 만들어보세요.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">이름</label>
            <input
              type="text"
              id="username"
              placeholder="홍길동"
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              placeholder="example@email.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirm-password">비밀번호 확인</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="••••••••"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>

          <button type="submit" className="btn primary-btn">
            회원가입 하기
          </button>
        </form>

        <p className="switch-auth">
          이미 계정이 있으신가요?
          <Link href="/login">로그인</Link>
        </p>
      </div>
    </main>
  )
}
