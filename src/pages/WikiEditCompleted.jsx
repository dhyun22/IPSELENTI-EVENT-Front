import logo from '../img/logo.png';
import { Link } from 'react-router-dom';

function WikiEditCompleted() {
    const editText = "문서가 수정되었습니다!\n기여해주셔서 감사합니다 :)"
    const point = "+ 15000 P"
    return (
        <div className='container'>
            <div className='mobile-view'>
                <div className='editResult'>
                    <div className="logoCharacter">
                        <Link to='/'>
                            <img src="https://asku.wiki/images/logo.png" className="editLogo" alt="logo"/>
                        </Link>
                        <img src="https://asku.wiki/images/haho-head.png" className="editCharacter" alt="haho" />
                    </div>
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