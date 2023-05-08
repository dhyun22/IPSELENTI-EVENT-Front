import Modal from 'react-modal';
import { useState } from 'react';
import { GrClose } from 'react-icons/gr';

function AddLineupModal() {
    const [modalOpen, setModalOpen] = useState(false);
    return (
            <div>
                <button onClick={() => setModalOpen(true)}>Modal Open</button>
                <Modal className='lineupModal' isOpen={modalOpen} onRequestClose={() => setModalOpen}>
                    <div className='closeContainer'>
                        <GrClose className='modalClose' onClick={() => setModalOpen(false)} />
                    </div>
                    <div className='singerContainer'>
                        <h3>가수 이름</h3>
                        <input className='singerInput'></input>
                        <h3>신청사유(선택)</h3>
                        <input className='reasonInput'></input>
                        <button className='addlineupBtn'>라인업 추가</button>
                    </div>
                    
                </Modal>
            </div>
    );
};

export default AddLineupModal;