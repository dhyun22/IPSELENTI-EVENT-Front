import {useState} from 'react';
import AddLineupModal from '../components/AddLineupModal';
import Modal from 'react-modal';

function LineupEvent() {
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

export default LineupEvent;