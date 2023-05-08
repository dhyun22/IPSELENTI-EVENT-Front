import Modal from 'react-modal';
import { useState } from 'react';
import { GrClose } from 'react-icons/gr';

function ShareModal() {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div>
            <button onClick={() => setModalOpen(true)}>Modal Open</button>
            <Modal
            className='shareModal'
            isOpen={modalOpen}
            onRequestClose={() => setModalOpen}>
                <GrClose className='modalClose' onClick={() => setModalOpen(false)} />
                <div>
                    <h2>공유</h2>
                    
                </div>
            </Modal>
        </div>
    );
};

export default ShareModal;