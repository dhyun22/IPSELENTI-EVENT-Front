import { useState, useEffect } from 'react';
import logo from '../img/logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom/dist';
import { Link } from 'react-router-dom/dist';

const CheckPassword = () => {


    const [userId, setUserId] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');


    const [isPwValid, setisPwValid] = useState(true);
    const [errText, setErrText] = useState('');
    const [checkIdNum, setCheckIdNum] = useState(false);
    const [checkPhoneNum, setCheckPhoneNum] = useState(false);
    // const [isNumText, setIsNumText] = useState('')

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
        setPassword(e.target.value);
        let regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/
        setisPwValid(regExp.test(password));
        if(isPwValid === false){
            setErrText('숫자, 영문, 특수문자 조합 최소 6자이상 입력해주세요');
        } else {
            setErrText('')
    }
}
    const checkPwValid = () => {

            if (password === checkPassword){
                setisPwValid(true);
                setErrText('');
            } else{
                setisPwValid(false);
                setErrText('비밀번호가 일치하지 않습니다.')
            }
        
    }
    const createNewPW = async (e) => {
        //event.preventDefault(); // 아무 동작 안하고 버튼만 눌러도 리프레쉬 되는 것을 막는다

        if(isPwValid === false || checkIdNum === true || checkPhoneNum === true){
            e.preventDefault();
            return alert('형식이 올바르지 않습니다.')
            
        }

        try{
            const response = await axios.post(process.env.REACT_APP_HOST+'/user/auth/changepw', {
                password : password,
                user_id: userId,
                phone_number: phoneNum
            }, {
                withCredentials: true
            });
            if (response.status === 200) {
                return alert("비밀번호가 변경되었습니다.");
            } 
        } catch (error) {
            if(error.response.status === 400){
                return alert("입력값을 확인해주세요.");
            } else if(error.response.status === 404) {
                return alert("오류가 발생했습니다.");
            }
        }
    
    }

  return (
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
                                   value={userId} 
                                   onChange={e => setUserId(e.target.value)}
                                   minLength='10'
                                   maxLength='10'
                                   onBlur={e => checkIdIsNum(e)}
                                />
                                <span className={checkIdNum ? 'spans' : 'hidden'}>학번을 제대로 입력해주세요</span>
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
                                onChange={e => setPhoneNum(e.target.value)}
                                onBlur={e => checkPhoneIsNum(e)}
                                />
                                <span className={checkPhoneNum ? 'spans' : 'hidden'}>전화번호를 제대로 입력해주세요</span>
                            </div>
                        </div>
                        <div className="signup-content">
                            <h4>새 비밀번호 입력</h4>
                            <div className="content-in">
                                <input 
                                    required type='password' 
                                    placeholder='숫자, 영문, 특수문자 조합 최소 6자' 
                                    value={password}
                                    onChange={checkPwRegExp}
                                    onBlur={checkPwValid}
                                />
                                <input 
                                required type='password' 
                                placeholder='새 비밀번호 확인' 
                                id="password"
                                name='checkUserPw'
                                value={checkPassword}
                                onChange={e => setCheckPassword(e.target.value)}
                                onBlur={checkPwValid}
                                />
                                <span className={isPwValid ? 'hidden' : 'spans'}>{errText}</span>
                            </div>
                        </div>
                    </form>
                        <div>
                            <button id="signup-btn" type='submit' onClick={createNewPW}>비밀번호 변경</button>
                        </div>
                </div>
            </div>
        </div>
  );

}

export default CheckPassword