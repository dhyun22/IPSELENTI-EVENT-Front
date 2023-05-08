import Modal from 'react-modal';
import { useState } from 'react';
import { GrClose } from 'react-icons/gr';

function AddLineupModal() {
    const [modalOpen, setModalOpen] = useState(false);
    return (
            <div>
                <button onClick={() => setModalOpen(true)}>Modal Open</button>
                <Modal 
                className='lineupModal'
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen}>
                    <GrClose className='modalClose' onClick={() => setModalOpen(false)} />
                    <div className='singerContainer'>
                        <h3>가수 이름</h3>
                        <input className='singerInput'></input>
                        <h3>신청사유(선택)</h3>
                        <textarea className='reasonInput'></textarea>
                    </div>
                    <button className='addLineupBtn'>라인업 추가</button>
                </Modal>
            </div>
    );
};

export default AddLineupModal;