import { Link } from "react-router-dom/dist";
import temporaryLogo from '../img/temporaryLogo.png';
import axios from "axios";
import { useNavigate } from "react-router-dom/dist";
import { useState, useEffect } from "react";
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
    const [loggedIn, setLoggedIn] = useState(false);
    const Navigate = useNavigate();


    const userLogin = async () => {
        try{
            const response = await axios.post('http://localhost:8080/user/auth/login', {
                user_id: userId,
                password: userPw,
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

    
    
    

    return (

        <div class="container">
            <div class="mobile-view">
                <div className='auth'>
                    <img class="login-img"src={temporaryLogo} alt=""/>
                    <form class="login-form">
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
                        <button type="button" id='btn' onClick={userLogin}>Login</button>
                        <span>가입하면 10000P 바로 지급 <Link to="/signup">회원가입</Link>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;