import { Link } from "react-router-dom/dist";
import temporaryLogo from '../img/temporaryLogo.png';
import axios from "axios";
import { useNavigate } from "react-router-dom/dist";
import { useState } from "react";
//import {Useform, useForm} from 'react-hook-form';


function Login() {

    // const {register} = useForm();
    // const { watch } = useForm();
    // const {handleSubmit} = useForm();
    // const onValid = (data) => {
    //     console.log(data);
    // }


    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [isLoginSuccess, setLoginSuccess] = useState(false);


    const userLogin = () => {
        axios.post('http://49.50.167.168:3000/user/auth/login', {
            user_id: userId,
            password: userPw,
        }).then ((res) => {
            setLoginSuccess(true);
            if(res.data == true){
                const isLoginResult = axios.get('http://49.50.167.168:3000/user/auth/islogin');
                if(isLoginResult == true){
                    navigator('/mypage');

                }
            }
        }).catch( (err) => console.error(err));

        
    }

    return (

        <div class="container">
            <div class="mobile-view">
                <div className='auth'>
                    <img class="login-img"src={temporaryLogo} alt=""/>
                    <form class="login-form" onSubmit={userLogin}>
                        <input 
                        type='text'
                        placeholder='ID' 
                        value={userId} 
                        onChange={e => setUserId(e.target.value)}
                        />
                        <input 
                        type='password'  
                        placeholder='PASSWORD'
                        value={userPw} 
                        onChange={e => setUserPw(e.target.value)}
                        />
                        <button type='submit' id='btn'>Login</button>
                        <span>가입하면 10000P 바로 지급 <Link to="/signup">회원가입</Link>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;