'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        alert(`${data.user.username}님 환영합니다!`)
        // Store user info in localStorage for demo purposes (as in legacy)
        localStorage.setItem('currentUser', JSON.stringify(data.user))
        router.push('/dashboard')
      } else {
        alert(data.error || '로그인에 실패했습니다.')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('오류가 발생했습니다.')
    }
  }

  return (
    <main className="auth-container">
      <div className="auth-box">
        <h2>로그인</h2>
        <p className="subtitle">서비스를 이용하려면 로그인해 주세요.</p>

        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="btn primary-btn">
            로그인
          </button>
        </form>

        <p className="switch-auth">
          계정이 없으신가요?
          <Link href="/signup">회원가입</Link>
        </p>
      </div>
    </main>
  )
}
