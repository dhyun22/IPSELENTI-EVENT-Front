import {useState} from 'react';
import AddLineupModal from '../components/AddLineupModal';
import BettingModal from '../components/BettingModal';
import ShareModal from '../components/ShareModal';
import Modal from 'react-modal';

function LineupEvent() {
    return (
        <div>
            <AddLineupModal />
        </div>
    );
};

export default LineupEvent;