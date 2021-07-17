import React, {useContext, useRef, useState} from "react";
import {Button, FormControl, FormLabel, MenuItem, Modal, Popover, Select} from "@material-ui/core";

import styles from './remote-controls.module.css';
import {allowedKeysDummyDataContext, authorizationLogsContext, headerInfoContext} from "../../dummyData";
import PairNewKey from "./pair-new-key";
import noop from "../../utils/noop";
import SelectInput from "@material-ui/core/Select/SelectInput";

const RemoteControls = () => {
    const headerInfo = useContext(headerInfoContext);
    const allowedKeys = useContext(allowedKeysDummyDataContext);
    const authorizationLogs = useContext(authorizationLogsContext);

    const [isPairingModalOpened, setIsPairingModalOpened] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const mockedOperationType = useRef('authorized');
    
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
    
    const onKeyAuthorized = (event) => {
        mockedOperationType.current = 'authorized';
        setAnchorEl(event.currentTarget);
    };

    const onKeyUnauthorized = (event) => {
        mockedOperationType.current = 'unauthorized';
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const onAuthorizedKeyIdSelected = (ev) => {
        const key = allowedKeys.allowedKeys.find(key => key.keyId === ev.target.value);
        if (key == null) {
            return;
        }
        
        toggleLock();
        authorizationLogs.updateAuthorizationLogs([...authorizationLogs.logs, {
            keyId: key.keyId,
            type: key.type,
            date: new Date(),
            fullName: key.fullName,
            operationStatus: mockedOperationType.current
        }])
        handleClose();
    }

    return (
        <div className={styles.container}>
            <p>Disclaimer: The following controls mock the API calls from the IOT device (Lockery Lock)</p>
            <div className={styles.buttonsContainer}>
                <Button variant={"contained"} onClick={pairNewKey}>Pair A New Key</Button>
                <Button variant={"contained"} onClick={toggleLock}>{lockButtonText}</Button>
                <Button variant={"contained"} onClick={resetSystem}>Reset</Button>
                <Button variant={"contained"} onClick={onKeyAuthorized}>Mock key authorized</Button>
                <Button variant={"contained"} onClick={onKeyUnauthorized}>Mock key unauthorized</Button>
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
            <Popover
                // id={id}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <FormControl>
                    <FormLabel>Select key ID</FormLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={onAuthorizedKeyIdSelected}
                    >
                        {allowedKeys.allowedKeys.map(key => (
                            <MenuItem value={key.keyId} key={key.keyId}>{key.keyId}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Popover>
        </div>
    )
};

export default RemoteControls;
