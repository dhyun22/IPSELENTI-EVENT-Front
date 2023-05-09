import { useState } from 'react';
import logo from '../img/logo.png';
import axios from 'axios';

function SignUp() {
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userPw, setUserPw] = useState('');
    const [friendId, setFriendId] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [isJoinSuccess, setJoinSuccess] = useState(false);



    const createUserApi = (user) => {
        axios.post('http://49.50.167.168:3000/user/auth/signup', {
            user_id: userId,
            user_name: userName,
            password: userPw,
            phone_number: phoneNum,
            recommender_id: friendId
        }).then((res) => {
            alert("회원가입 완료")
        })

        // const postUser = async () => {
        //     try{
        //         const result = await axios.post('http://49.50.167.168:3000/user/auth/signup', {
        //         user_id: userId,
        //         user_name: userName,
        //         password: userPw,
        //         phone_number: phoneNum,
        //         recommender_id: friendId
        //         }).then((res) => {
        //             alert("회원가입 완료")
        //         })

        //     } catch (error) {
        //         console.error(error);
        //     }
        // };
    }


    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try{
    //         const res = await createUserApi ({
                
    //         });
    //     }

    // }


    return(
        <div className='container'>
            <div className="mobile-view">
                <div className="info">
                    <img src={logo} alt='' />
                    <form className='sign-form' onSubmit={createUserApi}>
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
                                    pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,16}$"/>
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
                        <div className="phone-auth">
                            <h4>전화번호 인증</h4>
                            <div className="phone-auth">
                                <input 
                                required type='text' 
                                name='phoneNum'
                                value={phoneNum}
                                onChange={e => setPhoneNum(e.target.value)}/>
                                <button>인증</button>
                            </div>
                            <div className="phone-auth hidden">
                                <input required type='text' />
                                <button>확인</button>
                            </div>
                        </div>
                        <button id="signup-btn" type='submit' >회원가입</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;