import Modal from 'react-modal';
import { useState } from 'react';

function BettingModal() {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div>
            <button onClick={() => setModalOpen(true)}>Modal Open</button>
            <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen}>
                This is Modal content
                <button onClick={() => setModalOpen(false)}>Modal close</button>
            </Modal>
        </div>
    );
};

export default BettingModal;