// 페이지 로드 시 자연스럽게 나타나는 효과 (페이드인)
window.addEventListener('pageshow', () => {
    // 뒤로가기로 왔을 때를 대비해 초기화 후 페이드인 설정
    document.body.style.opacity = '0';
    document.body.style.transition = 'none';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.4s ease';
        document.body.style.opacity = '1';
    }, 50);
});

// 모든 a 태그의 기본 이동을 막고 부드러운 이동 함수를 대신 실행
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href !== '#') {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // 기본 이동 방지
                goToPage(href);
            });
        }
    });
});

/**
 * 화면이 서서히 사라진 뒤 지정된 주소로 이동하는 함수 (페이드아웃)
 * @param {string} url 이동할 웹 페이지의 주소 형식 (예: 'login.html')
 */
function goToPage(url) {
    // 배경을 포함하여 화면 전체를 서서히 투명하게 만듦
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '0';
    
    // 0.3초(애니메이션 끝나는 시간) 뒤에 실질적인 페이지 이동
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

/**
 * 회원가입 폼 제출(Submit) 시 실행되는 함수
 * 입력 데이터를 LocalStorage에 저장합니다.
 */
function handleSignup(event) {
    event.preventDefault(); // 폼 제출로 인한 브라우저 새로고침 방지

    const username = document.getElementById('username')?.value;
    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;
    const confirmPassword = document.getElementById('confirm-password')?.value;

    // 비밀번호 확인 검증
    if (password !== confirmPassword) {
        alert('비밀번호가 일치하지 않습니다. 다시 확인해 주세요.');
        return;
    }

    // 저장할 데이터 객체 생성
    const userData = {
        username: username,
        email: email,
        password: password
    };

    // 로컬 스토리지에 사용자 정보 저장
    localStorage.setItem('userData', JSON.stringify(userData));

    alert(username + '님 회원가입이 완료되었습니다!');
    
    // 회원가입 성공 후 페이드아웃 효과와 함께 로그인 페이지로 스무스 이동
    goToPage('login.html');
}

/**
 * 로그인 폼 제출 시 실행되는 함수
 * LocalStorage에 저장된 정보를 읽어와 아이디와 비밀번호를 검증합니다.
 */
function handleLogin(event) {
    event.preventDefault();

    const emailInput = document.getElementById('email')?.value;
    const passwordInput = document.getElementById('password')?.value;

    const storedDataStr = localStorage.getItem('userData');
    
    if (!storedDataStr) {
        alert('가입된 회원 정보가 없습니다. 먼저 회원가입을 진행해주세요.');
        return;
    }

    const userData = JSON.parse(storedDataStr);

    // 이메일과 비밀번호가 모두 일치하는지 확인
    if (userData.email === emailInput && userData.password === passwordInput) {
        alert('환영합니다, ' + userData.username + '님!');
        goToPage('dashboard.html');
    } else {
        alert('이메일 또는 비밀번호가 잘못되었습니다.');
    }
}

/**
 * 로그아웃 버튼 클릭 시 실행
 */
function handleLogout() {
    // 실제 서비스에서는 세션 정보나 토큰을 삭제하지만, 여기서는 안내 후 홈으로 보냅니다.
    alert('로그아웃 되었습니다. 안녕히 가세요!');
    goToPage('index.html');
}
