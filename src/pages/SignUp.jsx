import logo from '../img/logo.png';

function SignUp() {
    return(
        <div className='container'>
            <div className="mobile-view">
                <div className="info">
                    <img src={logo} alt='' />
                    <form className='sign-form'>
                        <div className="signup-content">
                            <h4>학번(아이디)</h4>
                            <input required type='text' placeholder='본인의 고려대 학번을 입력해주세요!' />
                        </div>
                        <div className="signup-content">
                            <h4>비밀번호</h4>
                            <div className="content-in">
                                <input required type='password' placeholder='숫자, 영문, 특수문자 조합 최소 6자' pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,16}$"/>
                                <input required type='password' placeholder='비밀번호 재입력' />
                            </div>
                        </div>
                        <div className="signup-content">
                            <h4>추천인 학번(선택)</h4>
                            <div className="content-in">
                                <input  required type='text' placeholder='추천인의 고려대 학번을 입력해주세요!' />
                                <span>가입자 본인은 30000P, 추천인은 20000P가 지급됩니다!</span>
                            </div>
                        </div>
                        <div className="phone-auth">
                            <h4>전화번호 인증</h4>
                            <div className="phone-auth">
                                <input required type='text' />
                                <button>인증</button>
                            </div>
                            <div className="phone-auth hidden">
                                <input required type='text' />
                                <button>확인</button>
                            </div>
                        </div>
                        <input id="signup-btn" type='submit' value='회원가입' />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;