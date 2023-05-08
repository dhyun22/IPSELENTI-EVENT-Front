import Modal from 'react-modal';
import { useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { CopyToClipboard } from "react-copy-to-clipboard";

function ShareModal() {
    const [modalOpen, setModalOpen] = useState(false);
    const [buttonText, setButtonText] = useState('복사하기');
    const handleClick = () => {
        setButtonText('복사완료');
    }
    return (
        <div>
            <button onClick={() => setModalOpen(true)}>Modal Open</button>
            <Modal
            className='shareModal'
            isOpen={modalOpen}
            onRequestClose={() => setModalOpen}>
                <GrClose className='modalClose' onClick={() => setModalOpen(false)} />
                <div className='shareContainer'>
                    <h2>공유</h2>
                    <input className='shareLink' placeholder='www.asku.wiki/lineup_event' disabled></input>
                </div>
                <CopyToClipboard text='www.asku.wiki/lineup_event'>
                    <button
                    onClick={handleClick}
                    className='copyBtn'>
                        {buttonText}
                    </button>
                </CopyToClipboard>
            </Modal>
        </div>
    );
};

export default ShareModal;