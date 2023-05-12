import Modal from 'react-modal';
import { useState } from 'react';
import { GrClose } from 'react-icons/gr';
import axios from 'axios';

function AddLineupModal() {
    const [modalOpen, setModalOpen] = useState(false);
    const [singerName, setSingerName] = useState('');
    const [applyReason, setApplyReason] = useState('');

    const addLineupPost = () => {
        console.log(singerName);
        axios.post('http//localhost:3000/', {
            celebrity_name: singerName,
            request_reason: applyReason,
            // request_time: 서버 등록된 시간으로 볼까?
            // request_id:
            // requester_id:
        }).then((res)=>{
            setModalOpen(false);
        }).catch( (err) => console.error(err));
    }


    return (
            <div>
                <button onClick={() => setModalOpen(true)}>라인업 추가하기</button>
                <Modal 
                className='lineupModal'
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}>
                    <GrClose className='modalClose' onClick={() => setModalOpen(false)} />
                    <div className='singerContainer'>
                        <h3>가수 이름</h3>
                        <input 
                        required 
                        className='singerInput' 
                        value={singerName}
                        onChange={e => setSingerName(e.target.value)}
                        />
                        <h3>신청사유(선택)</h3>
                        <textarea
                        required
                        className='reasonInput'
                        value={applyReason}
                        onChange={e => setApplyReason(e.target.value)}
                        />
                    </div>
                    <button className='addLineupBtn' onClick={addLineupPost}>라인업 추가</button>
                </Modal>
            </div>
    );
};

export default AddLineupModal;