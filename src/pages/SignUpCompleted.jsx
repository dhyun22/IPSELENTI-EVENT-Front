import temporaryLogo from '../img/temporaryLogo.png';
import { useNavigate } from 'react-router-dom';

function SignUpCompleted() {
    const signUpText = "회원가입이 완료되었습니다!\n이제 함께 입실렌티를 즐겨 보아요!"
    const Navigate = useNavigate();

    const linkToLogin = () => {
        Navigate('/login')
    }
    const linkToHome = () => {
        Navigate('/main')
    }
    return (
        <div className='container'>
            <div className='mobile-view'>
                <div className='editResult'>
                    <img className='temporaryLogo' src={temporaryLogo} alt='temporary_logo' />
                    <p>{signUpText}</p>
                    <button className="signUpCompleted" onClick={linkToLogin}>로그인 하기</button>
                    <button className="backToHome" onClick={linkToHome}>홈 화면으로 이동</button>
                </div>
            </div>
        </div>
    );
};

export default SignUpCompleted;