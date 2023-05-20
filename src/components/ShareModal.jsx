import Modal from 'react-modal';
import { useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { CopyToClipboard } from "react-copy-to-clipboard";
function ShareModal() {
    const [modalOpen, setModalOpen] = useState(false);
    const [buttonText, setButtonText] = useState('url 복사하기');
    const [buttonColor, setButtonColor] = useState({backgroundColor: "#9F132E"});
    
    const randomNumber = Math.floor(Math.random() * 5) + 1; // 1부터 5까지의 랜덤한 숫자 생성
    const className = `shareContainer${randomNumber}` // 랜덤한 숫자를 이미지 경로에 적용
    
    const handleClick = () => {
        setButtonText('복사완료');
        setButtonColor({backgroundColor: "grey"})
    }
    return (
        <div>
            <button className='sharing_button' onClick={() => setModalOpen(true)}>친구에게 공유</button>
            <Modal
            className='shareModal'
            isOpen={modalOpen}
            onRequestClose={() => setModalOpen(false)}>
                <div className= {className}>
                
                
                <div className='picDiv'>
                <GrClose className='modalClose' onClick={() => setModalOpen(false)}/>
                <div className='shareInfo'>
                    
                    
                    <div style={{color:'#9F132E',fontSize:'1.5vh', fontWeight: "bold"}}>000님의 베팅</div>
                    <div style={{fontWeight:"bold", marginTop:'1.5vh',fontSize: '2.25vh'}}>IVE(아이브)</div>
                    <div style={{display:'flex', fontSize:'1.5vh', marginTop:'1.5vh', flexDirection:'row'}}><div style={{color: '#747474'}}>베팅 포인트</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1000 P</div> </div>
                    <div style={{display:'flex', fontSize:'1.5vh', marginTop:'1.5vh', flexDirection:'row'}}><div style={{color: '#747474'}}>현재 배당률</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1000 %</div></div>
                    <div style={{display:'flex', fontSize:'1.5vh', marginTop:'1.5vh', flexDirection:'row'}}><div style={{color: '#747474'}}>예상 배당금</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1000 P</div></div>
                    <div style={{display:'flex', fontSize:'1.5vh', marginTop:'1.5vh', flexDirection:'row'}}><div style={{color: '#747474'}}>잔여 포인트</div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1000 P</div></div>
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