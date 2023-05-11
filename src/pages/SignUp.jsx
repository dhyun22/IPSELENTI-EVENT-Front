import { useState, useEffect } from 'react';
import logo from '../img/logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom/dist';

function SignUp() {
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userPw, setUserPw] = useState('');
    const [checkUserPw, setCheckUserPw] = useState('')
    const [friendId, setFriendId] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const Navigate = useNavigate();



    // const createUserApi = () => {
    //     axios.post('http://localhost:8080/user/auth/signup', {
    //         user_id: userId,
    //         user_name: userName,
    //         password: userPw,
    //         phone_number: phoneNum,
    //         recommender_id: friendId
    //     }).then((res) => {
    //         alert("회원가입 완료")
    //     })

        
    // }


    const createUserApi = async () => {
        try{
            const response = await axios.post('http://localhost:8080/user/auth/signup', {
                user_id: userId,
                user_name: userName,
                password: userPw,
                phone_number: phoneNum,
                recommender_id: friendId
            }, {
                withCredentials: true
            });
            if (response.data.success) {
                setLoggedIn(true);
            } else{
                setLoggedIn(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const checkLoginStatus = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/user/auth/issignedin",
                {
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                setLoggedIn(true);
                Navigate('/main');
            } else{
                setLoggedIn(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const onChangePwValid = (e) => {
        setCheckUserPw(e.target.value);
        if(userPw === checkUserPw){

        };
    };

    useEffect (() => {
        checkLoginStatus();
    }, []);

    return(
        <div className='container'>
            <div className="mobile-view">
                <div className="info">
                    <img src={logo} alt='' />
                    <form className='sign-form'>
                        <div className="signup-content">
                            <h4>학번(아이디)</h4>
                            <input 
                                required type='text' 
                                placeholder='본인의 고려대 학번을 입력해주세요!' 
                                name="studentId" 
                                value={userId} 
                                onChange={e => setUserId(e.target.value)}
                            />
                        </div>
                        <div className="signup-content">
                            <h4>이름</h4>
                            <input 
                                required type='text' 
                                placeholder='본인의 이름을 입력해주세요!' 
                                name="userName" 
                                value={userName} 
                                onChange={e => setUserName(e.target.value)}
                            />
                        </div>
                        <div className="signup-content">
                            <h4>비밀번호</h4>
                            <div className="content-in">
                                <input 
                                    required type='password' 
                                    placeholder='숫자, 영문, 특수문자 조합 최소 6자' 
                                    pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,16}$"
                                    value={userPw}
                                    onChange={e => setUserPw(e.target.value)}
                                />
                                <input 
                                required type='password' 
                                placeholder='비밀번호 재입력' 
                                id="password"
                                name='userPw'
                                value={userPw}
                                onChange={e => setUserPw(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="signup-content">
                            <h4>추천인 학번(선택)</h4>
                            <div className="content-in">
                                <input  
                                required type='text' 
                                placeholder='추천인의 고려대 학번을 입력해주세요!' 
                                name='friendId'
                                value={friendId}
                                onChange={e => setFriendId(e.target.value)}/>
                                <span>가입자 본인은 30000P, 추천인은 20000P가 지급됩니다!</span>
                            </div>
                        </div>
                        <div className="signup-content">
                            <h4>전화번호</h4>
                            <div className="content-in">
                                <input 
                                required type='text' 
                                placeholder='ex.01012345678'
                                name='phoneNum'
                                value={phoneNum}
                                onChange={onChangePwValid}
                                />
                                <span>상품 수령 시 필요한 정보이니 정확하게 기입해주세요.</span>
                            </div>
                        </div>
                        <button id="signup-btn" type='submit' onClick={createUserApi}>회원가입</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;