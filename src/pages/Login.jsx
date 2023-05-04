import { Link } from "react-router-dom/dist";
import SignUp from "./SignUp";
import temporaryLogo from '../img/temporaryLogo.png';

function Login() {
    return (
        <div class="container">
            <div class="mobile-view">
                <div className='auth'>
                    <img class="login-img"src={temporaryLogo} alt=""/>
                    <form class="login-form">
                        <input type='text'  placeholder='ID' />
                        <input type='password'  placeholder='PASSWORD' />
                        <input type='submit' id='btn' value='Login' />
                        <span>가입하면 10000P 바로 지급 <Link to="/signup">회원가입</Link>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;