import {Button, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select} from "@material-ui/core";
import React, {useRef, useState} from "react";

import styles from './edit-key.module.css';

const EditKey = ({keyDetails, onClose, onRevoke}) => {
    const [keyDetailsCopy, setKeyDetailsCopy] = useState(keyDetails);
    const [isWaitingForFingerprint, setIsWaitingForFingerprint] = useState(false);
    
    const originalKeyDetails = useRef({});
    
    const handleChange = (field) => (ev) => {
        if (!originalKeyDetails.current[field]) {
            originalKeyDetails.current[field] = keyDetails[field];
        }
        const value = ev.target.value;
        keyDetails[field] = value;
        setKeyDetailsCopy({...keyDetailsCopy, [field]: value});
    };
    
    const onSaveButtonClicked = () => {
        onClose();
    };

    const onCloseButtonClicked = () => {
        Object.assign(keyDetails, originalKeyDetails.current);
        onClose();
    }
    
    const onFingerprintDetected = () => {
        handleChange('hasFingerprint')({target: {value: true}});
        setIsWaitingForFingerprint(false);
    }
    
    const renderAddFingerprintInstructions = () => {
        return (
            <div className={styles.addFingerprintInstructionsContainer}>
                <small>Waiting for users fingerprint. Please insert the key and place the finger on the sensor</small>
                <Button variant="contained" color="primary" onClick={onFingerprintDetected}>Mock fingerprint</Button>
            </div>
        )
    }
    
    const onRevokeKeyButtonClicked = () => {
        onRevoke(keyDetails.keyId);
        onClose();
    }
    
    return (
        <div className={styles.container}>
            <FormControl className={styles.formContainer}>
                <InputLabel id="demo-simple-select-label">Authentication Method</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={keyDetailsCopy.type}
                    onChange={handleChange('type')}
                >
                    <MenuItem value={'NFC'}>NFC</MenuItem>
                    {keyDetails.hasFingerprint && <MenuItem value={'Fingerprint'}>Fingerprint</MenuItem>}
                </Select>

                {!keyDetails.hasFingerprint && <Button className={styles.addFingerprintButton} variant={"outlined"}
                         onClick={() => setIsWaitingForFingerprint(true)}>
                    Add Fingerprint
                </Button>}
                
                {isWaitingForFingerprint && renderAddFingerprintInstructions()}
                
                <Button variant={'outlined'} className={styles.revokeKeyButton} 
                        onClick={onRevokeKeyButtonClicked}>
                    Revoke Key
                </Button>
            </FormControl>
            <div className={styles.buttonsContainer}>
                <Button variant={'outlined'} onClick={onCloseButtonClicked}>Close</Button>
                <Button variant={'outlined'} onClick={onSaveButtonClicked}>Save</Button>
            </div>
        </div>
    )    
};

export default EditKey;
