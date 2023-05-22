import logo from '../img/logo.png';
import { Link } from 'react-router-dom';
import editCharacter from '../img/haho-head.png';

function SignUpCompleted() {
    const signUpText = "회원가입이 완료되었습니다!\n이제 함께 입실렌티를 즐겨 보아요!"
    return (
        <div className='container'>
            <div className='mobile-view'>
                <div className='editResult'>
                    <div className="logoCharacter">
                        <Link to='/'>
                            <img src={logo} className="editLogo" alt="logo"/>
                        </Link>
                        <img src={editCharacter} className="editCharacter" alt="haho" />
                    </div>
                    <div className='textContainer'>
                        <p style={{fontSize: '14px'}}>{signUpText}</p>
                    </div>
                    <div className='completed-btns'>
                        <Link to='/login'>
                            <button className="signUpCompleted">로그인 하기</button>
                        </Link>
                        <Link to='/'>
                            <button className="backToHome">홈 화면으로 이동</button>
                        </Link>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default SignUpCompleted;