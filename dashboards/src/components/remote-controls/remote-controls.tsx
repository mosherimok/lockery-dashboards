import React, {useContext, useState} from "react";
import {Button, Modal} from "@material-ui/core";

import styles from './remote-controls.module.css';
import {allowedKeysDummyDataContext, headerInfoContext} from "../../dummyData";
import PairNewKey from "./pair-new-key";

const RemoteControls = () => {
    const headerInfo = useContext(headerInfoContext);
    const allowedKeys = useContext(allowedKeysDummyDataContext);

    const [isPairingModalOpened, setIsPairingModalOpened] = useState(false);

    const onPairingModalClosed = () => {
        setIsPairingModalOpened(false);
    };

    const onKeyPaired = (keyDetails) => {
        allowedKeys.updateAllowedKeys([...allowedKeys.allowedKeys, keyDetails]);
    };

    const toggleLock = () => {
        headerInfo.updateHeaderInfo({
            ...headerInfo, lockStatus: (
                headerInfo.lockStatus === 'locked' ? 'unlocked' : 'locked'
            )
        });
    };

    const resetSystem = () => {
        headerInfo.updateHeaderInfo({...headerInfo, lockStatus: 'unlocked'});
        allowedKeys.updateAllowedKeys([]);
    };

    const pairNewKey = () => {
        setIsPairingModalOpened(true);
    };

    const lockButtonText = (
        headerInfo.lockStatus === 'locked' ? 'unlock' : 'lock'
    );

    return (
        <div className={styles.container}>
            <p>Disclaimer: The following controls mock the API calls from the IOT device (Lockery Lock)</p>
            <div className={styles.buttonsContainer}>
                <Button variant={"contained"} onClick={pairNewKey}>Pair A New Key</Button>
                <Button variant={"contained"} onClick={toggleLock}>{lockButtonText}</Button>
                <Button variant={"contained"} onClick={resetSystem}>Reset</Button>
            </div>
            <Modal
                open={isPairingModalOpened}
                onClose={onPairingModalClosed}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className={styles.modalContainer}>
                    <PairNewKey onClose={onPairingModalClosed} onSave={onKeyPaired}/>
                </div>
            </Modal>
        </div>
    )
};

export default RemoteControls;
