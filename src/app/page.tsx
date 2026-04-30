import Link from 'next/link'
// Trigger new deployment


export default function Home() {
  return (
    <main className="auth-container" style={{ display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
      <div className="auth-box" style={{ textAlign: 'center', padding: '64px 32px' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 700, 
          marginBottom: '16px', 
          letterSpacing: '-0.5px' 
        }}>
          나의 첫 <span style={{ color: 'var(--primary-color)' }}>웹 프로젝트</span>
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: 'var(--text-muted)', 
          marginBottom: '40px', 
          lineHeight: 1.6 
        }}>
          현대적이고 아름다운 UI로 완성된<br />
          시작 페이지에 오신 것을 환영합니다.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', width: '100%' }}>
          <Link href="/login" className="btn primary-btn" style={{ flex: 1 }}>
            로그인
          </Link>
          <Link href="/signup" className="btn" style={{ 
            flex: 1, 
            backgroundColor: 'transparent', 
            border: '2px solid var(--input-border)',
            color: 'var(--text-main)'
          }}>
            회원가입
          </Link>
        </div>
      </div>
    </main>
  )
}
