import { useState, useEffect } from 'react';
import logo from '../img/logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom/dist';
import { Link } from 'react-router-dom/dist';

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
    const [checkIdNum, setCheckIdNum] = useState(false);
    const [checkFIdNum, setCheckFIdNum] = useState(false);
    const [checkPhoneNum, setCheckPhoneNum] = useState(false);
    // const [isNumText, setIsNumText] = useState('')
    const checkFIdIsNum = (e) => {
        if (isNaN(e.target.value)){
            setCheckFIdNum(true);
        } else{
            setCheckFIdNum(false);
        }
    }

    const checkIdIsNum = (e) => {
        if (isNaN(e.target.value)){
            setCheckIdNum(true);
        } else{
            setCheckIdNum(false);
        }
    }
    const checkPhoneIsNum = (e) => {
        if (isNaN(e.target.value)){
            setCheckPhoneNum(true);
        } else{
            setCheckPhoneNum(false);
        }
    }

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
    const checkPwValid = () => {

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

        if(isPwValid === false || checkFIdIsNum === true || checkIdNum === true || checkPhoneNum === true){
            e.preventDefault();
            return alert('형식이 올바르지 않습니다.')
            
        }

        try{
            const response = await axios.post(process.env.REACT_APP_HOST+'/user/auth/signup', {
                user_id: form.id,
                user_name: form.name,
                password: form.password,
                phone_number: form.phoneNum,
                recommender_id: form.friendId
            }, {
                withCredentials: true
            });
            if (response.status === 201) {
                setLoggedIn(true);
                Navigate('/signup/completed');
            } else if(response.status === 409){
                return alert(response.data.message);
            } else if(response.status === 422) {
                return alert(response.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    
    }

    const checkLoginStatus = async () => {
        try {
            const response = await axios.get(
                process.env.REACT_APP_HOST+"/user/auth/issignedin",
                {
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                setLoggedIn(true);
                Navigate('/');
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
                    <Link to='/'>
                        <img src={logo} alt='logo' className='logo'/>
                    </Link>
                    <form className='sign-form'>
                        <div className="signup-content">
                            <div className='content-in'>
                                <h4>학번(아이디)</h4>
                                <input 
                                   required type='text' 
                                   placeholder='본인의 고려대 학번을 입력해주세요!' 
                                   name="studentId" 
                                   value={form.id} 
                                   onChange={e => setForm({ ...form, id: e.target.value})}
                                   minLength='10'
                                   maxLength='10'
                                   onBlur={e => checkIdIsNum(e)}
                                />
                                <span className={checkIdNum ? 'spans' : 'hidden'}>학번을 제대로 입력해주세요</span>
                            </div>
                            
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
                                onChange={e => setForm({ ...form, checkPw: e.target.value})}
                                onBlur={checkPwValid}
                                />
                                <span className={isPwValid ? 'hidden' : 'spans'}>{errText}</span>
                            </div>
                        </div>
                        <div className="signup-content">
                            <h4>추천인 학번(선택)</h4>
                            <div className="content-in">
                                <input  
                                type='text' 
                                placeholder='추천인의 고려대 학번을 입력해주세요!' 
                                name='friendId'
                                value={form.friendId}
                                onChange={e => setForm({ ...form, friendId: e.target.value})}
                                onBlur={e => checkFIdIsNum(e)}/>
                                <span className='spans'>가입자 본인은 30000P, 추천인은 20000P가 지급됩니다!</span>
                                <span className={checkFIdNum ? 'spans' : 'hidden'}>학번을 제대로 입력해주세요</span>
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
                                onBlur={e => checkPhoneIsNum(e)}
                                />
                                <span className='spans'>상품 수령 시 필요한 정보이니 정확하게 기입해주세요.</span>
                                <span className={checkPhoneNum ? 'spans' : 'hidden'}>전화번호를 제대로 입력해주세요</span>
                            </div>
                        </div>
                    </form>
                        <div>
                            <button id="signup-btn" type='submit' onClick={createUserApi}>회원가입</button>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;