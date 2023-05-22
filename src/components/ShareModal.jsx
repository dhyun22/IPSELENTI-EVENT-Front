import Modal from 'react-modal';
import { useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from 'axios';
import { getIn } from 'formik';

function ShareModal() {
    const [modalOpen, setModalOpen] = useState(false);
    const [buttonText, setButtonText] = useState('url 복사하기');
    const [buttonColor, setButtonColor] = useState({backgroundColor: "#9F132E"});
    const [shareInfo, setShareInfo] = useState({
        "user_name": "로그인이 필요합니다.",
        "celebrity_amount": 0,
        "celebrity_name": "로그인이 필요합니다.",
        "betting_amount": 0,
        "total_amount": "로그인이 필요합니다.",
        "user_point": 0
      });
    const randomNumber = Math.floor(Math.random() * 5) + 1; // 1부터 5까지의 랜덤한 숫자 생성
    const className = `shareContainer${randomNumber}` // 랜덤한 숫자를 이미지 경로에 적용
    const getInfo = async () => {
        const result = await axios.get(REACT_APP_HOST+"/user/shareInfo/most", {withCredentials:true});
        console.log('hear0')
        console.log(result);
        if (result.data.success === true){
            setShareInfo(result.data.data);
            console.log('hear1')
            console.log(shareInfo);
            return shareInfo;
        }
        else {
            return shareInfo;
        }
        return result;
    }
    const handleClick = () => {
        setButtonText('복사완료');
        setButtonColor({backgroundColor: "grey"})
    }
    useState(() => {
        getInfo();
    },[]);

    return (
        <div>
            <button className='sharing_button' onClick={() => {setModalOpen(true);
            getInfo();}}>친구에게 공유</button>
            <Modal
            className='shareModal'
            isOpen={modalOpen}
            onRequestClose={() => setModalOpen(false)}>
                <div className= {className}>
                
                
                <div className='picDiv'>
                <GrClose className='modalClose' onClick={() => setModalOpen(false)}/>
                <div className='shareInfo'>
                    
                    
                    <div style={{color:'#9F132E',fontSize:'1.5vh', fontWeight: "bold"}}>{shareInfo.user_name}님의 베팅</div>
                    <div style={{fontWeight:"bold", marginTop:'1.5vh',fontSize: '2.25vh'}}>{shareInfo.betting_amount == 0? "첫 베팅을 시작해주세요!":shareInfo.celebrity_name}</div>
                    <div style={{display:'flex', fontSize:'1.5vh', marginTop:'1.5vh', flexDirection:'row'}}><div style={{color: '#747474'}}>베팅 포인트</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{shareInfo.betting_amount} P</div> </div>
                    <div style={{display:'flex', fontSize:'1.5vh', marginTop:'1.5vh', flexDirection:'row'}}><div style={{color: '#747474'}}>현재 배당률</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{shareInfo.total_amount/shareInfo.celebrity_amount} %</div></div>
                    <div style={{display:'flex', fontSize:'1.5vh', marginTop:'1.5vh', flexDirection:'row'}}><div style={{color: '#747474'}}>예상 배당금</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{Math.round((shareInfo.total_amount / shareInfo.celebrity_amount) * 100) / 100 * shareInfo.betting_amount} P</div></div>
                    <div style={{display:'flex', fontSize:'1.5vh', marginTop:'1.5vh', flexDirection:'row'}}><div style={{color: '#747474'}}>잔여 포인트</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{shareInfo.user_point} P</div></div>
                    <div style={{width: '100%', color: '#9F132E', position: 'absolute', bottom: '0' , display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', fontSize: '1.5vh' }}>
                        <div>화면 캡쳐와 URL공유로</div>
                        <div>인스타그램 스토리에 내 베팅현황을 공유하세요!</div>
                    </div>
                </div>
                </div>
                <CopyToClipboard text='www.asku.wiki/lineupevent'>
                    <button
                    onClick={handleClick}
                    className='copyBtn'
                   >
                        {buttonText}
                    </button>
                </CopyToClipboard>
                </div>
            </Modal>
        </div>
    );
};

export default ShareModal;