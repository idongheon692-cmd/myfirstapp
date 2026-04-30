'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import './dashboard.css'

export default function Dashboard() {
  const [user, setUser] = useState<{ username: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      alert('비정상적인 접근입니다. 다시 로그인해주세요.')
      router.push('/login')
    }
  }, [router])

  const handleLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      localStorage.removeItem('currentUser')
      alert('로그아웃 되었습니다. 안녕히 가세요!')
      router.push('/')
    }
  }

  if (!user) return null

  return (
    <div className="ott-body">
      <header className="ott-header">
        <div className="header-left">
          <h1 className="logo">
            <span className="logo-icon">▶</span>
            <span>MyPlay</span>
          </h1>
          <nav className="main-nav">
            <Link href="#">TV</Link>
            <Link href="#">영화</Link>
            <Link href="#">스포츠</Link>
            <Link href="#">스토어</Link>
            <Link href="#">키즈</Link>
            <Link href="#">라이브</Link>
          </nav>
        </div>
        <div className="header-right">
          <div className="dropdown">
            <span>카테고리 ⌵</span>
          </div>
          <div className="search-icon">🔍</div>
          <div className="profile-icon" onClick={handleLogout}>
            {user.username.charAt(0)}
          </div>
        </div>
      </header>

      <section className="hero-slider">
        <div className="hero-slide active">
          <div className="hero-bg" style={{ backgroundImage: "url('/hero_banner.png')" }}></div>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <div className="badge">▶ 시리즈</div>
            <h2 className="hero-title-ott">강호동네<br />서점</h2>
            <div className="hero-meta">
              <span className="star">★</span> 4.5 ‧ 토크쇼 ‧ 40분
            </div>
            <button className="play-btn">재생하기</button>
          </div>
          <div className="hero-pagination">
            <button className="page-btn">❮</button>
            <span>1 / 12</span>
            <button className="page-btn">❯</button>
          </div>
        </div>
      </section>

      <section className="content-row">
        <h3 className="row-title">시청 중인 콘텐츠</h3>
        <div className="thumbnails">
          <div className="thumb card-1">
            <div className="progress"><div className="progress-bar" style={{ width: '40%' }}></div></div>
          </div>
          <div className="thumb card-2"></div>
          <div className="thumb card-3"></div>
          <div className="thumb card-4"></div>
          <div className="thumb card-5"></div>
          <div className="thumb card-6"></div>
        </div>
      </section>
    </div>
  )
}
