import { useState, useEffect } from 'react';
import logo from '../img/logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom/dist';

function SignUp() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [form, setForm] = useState({
        id: '',
        name: '',
        password: '',
        checkPw: '',
        friendId: '',
        phoneNum: '',
    });
    const [isPwValid, setisPwValid] = useState(true);
    const [errText, setErrText] = useState('');

    const checkPwRegExp = (e) => {
        setForm({ ...form, password: e.target.value})
        let regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/
        setisPwValid(regExp.test(form.password));
        if(isPwValid === false){
            setErrText('숫자, 영문, 특수문자 조합 최소 6자이상 입력해주세요');
        } else {
            setErrText('')
    }
}
    const checkPwValid = (e) => {
        setForm({ ...form, checkPw: e.target.value})
            if (form.password === form.checkPw){
                setisPwValid(true);
                setErrText('');
            } else{
                setisPwValid(false);
                setErrText('비밀번호가 일치하지 않습니다.')
            }
        
    }

    const Navigate = useNavigate();

    const createUserApi = async (e) => {
        //event.preventDefault(); // 아무 동작 안하고 버튼만 눌러도 리프레쉬 되는 것을 막는다

        if(isPwValid === false){
            return alert('비밀번호를 다시 입력하세요.')
            e.prevent.default();
        }

        try{
            const response = await axios.post('http://localhost:8080/user/auth/signup', {
                user_id: form.id,
                user_name: form.name,
                password: form.password,
                phone_number: form.phoneNum,
                recommender_id: form.friendId
            }, {
                withCredentials: true
            });
            if (response.data.success) {
                setLoggedIn(true);
                Navigate('/signup/completed');
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
                                value={form.id} 
                                onChange={e => setForm({ ...form, id: e.target.value})}
                                minLength='10'
                                maxLength='10'
                            />
                        </div>
                        <div className="signup-content">
                            <h4>이름</h4>
                            <input 
                                required type='text' 
                                placeholder='본인의 이름을 입력해주세요!' 
                                name="userName" 
                                value={form.name} 
                                onChange={e => setForm({ ...form, name: e.target.value})}
                            />
                        </div>
                        <div className="signup-content">
                            <h4>비밀번호</h4>
                            <div className="content-in">
                                <input 
                                    required type='password' 
                                    placeholder='숫자, 영문, 특수문자 조합 최소 6자' 
                                    pattern=""
                                    value={form.password}
                                    onChange={checkPwRegExp}
                                    onBlur={checkPwValid}
                                />
                                <input 
                                required type='password' 
                                placeholder='비밀번호 재입력' 
                                id="password"
                                name='checkUserPw'
                                value={form.checkPw}
                                onChange={checkPwValid}
                                onBlur={checkPwValid}
                                />
                                <span className={isPwValid ? 'hidden' : ''}>{errText}</span>
                            </div>
                        </div>
                        <div className="signup-content">
                            <h4>추천인 학번(선택)</h4>
                            <div className="content-in">
                                <input  
                                required type='text' 
                                placeholder='추천인의 고려대 학번을 입력해주세요!' 
                                name='friendId'
                                value={form.friendId}
                                onChange={e => setForm({ ...form, friendId: e.target.value})}/>
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
                                value={form.phoneNum}
                                onChange={e => setForm({ ...form, phoneNum: e.target.value})}
                                />
                                <span>상품 수령 시 필요한 정보이니 정확하게 기입해주세요.</span>
                            </div>
                        </div>
                        <div>
                            <button id="signup-btn" type='submit' onClick={createUserApi}>회원가입</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;