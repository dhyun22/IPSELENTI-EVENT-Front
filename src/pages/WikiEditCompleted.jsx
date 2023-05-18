import logo from '../img/logo.png';
import { Link } from 'react-router-dom';
import editCharcter from '../img/haho-head.png';

function WikiEditCompleted() {
    const editText = "문서가 수정되었습니다!\n기여해주셔서 감사합니다 :)"
    const point = "+ 15000 P"
    return (
        <div className='container'>
            <div className='mobile-view'>
                <div className='editResult'>
                    <img className='editLogo' src={logo} alt='logo' />
                    <img className='editCharacter' src={editCharcter} alt='haho' />
                    <div className='textContainer'>
                        <p className=''>{editText}</p>
                        <p className=''>{point}</p>
                    </div>
                    <div className='completed-btns'>
                        <Link to='/wiki'>
                            <button className="completedButton">문서로 돌아가기</button>
                        </Link>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default WikiEditCompleted;