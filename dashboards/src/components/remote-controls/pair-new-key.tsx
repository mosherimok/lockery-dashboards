import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import React, {useRef, useState} from "react";

import styles from './pair-new-key.module.css';
import {rndInt} from "../../utils/random";

const PairNewKey = ({onClose, onSave}) => {
    const [keyDetails, setKeyDetails] = useState<any>({});

    const [isWaitingForFingerprint, setIsWaitingForFingerprint] = useState(false);

    const onInputChanged = (field) => (ev) => {
        setKeyDetails({...keyDetails, [field]: ev.target.value});
    }

    const onSaveButtonClicked = () => {
        onSave({...keyDetails, joinDate: new Date(), keyId: '123'+rndInt(100,900).toString()});
        onClose();
    };

    const onCloseButtonClicked = () => {
        onClose();
    }

    const onFingerprintDetected = () => {
        setKeyDetails({...keyDetails, hasFingerprint: true});
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

    return (
        <div className={styles.container}>
            <FormControl className={styles.formContainer}>
                <TextField required id="standard-required" label="Full name" onChange={onInputChanged('fullName')}/>
            </FormControl>
            <FormControl className={styles.formContainer}>
                <InputLabel id="demo-simple-select-label">Authentication Method</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={keyDetails.type}
                    onChange={onInputChanged('type')}
                >
                    <MenuItem value={'NFC'}>NFC</MenuItem>
                    <MenuItem value={'Fingerprint'}>Fingerprint</MenuItem>
                </Select>

                {!keyDetails.hasFingerprint && keyDetails.type === 'Fingerprint' &&
                (
                    <div>
                        <Button className={styles.addFingerprintButton} variant={"outlined"}
                                onClick={() => setIsWaitingForFingerprint(true)}>
                            Add Fingerprint
                        </Button>
                    </div>
                )
                }

                {isWaitingForFingerprint && renderAddFingerprintInstructions()}
            </FormControl>
            <div className={styles.buttonsContainer}>
                <Button variant={'outlined'} onClick={onCloseButtonClicked}>Close</Button>
                <Button variant={'outlined'} onClick={onSaveButtonClicked} disabled={(
                    keyDetails.type === 'Fingerprint' && !keyDetails.hasFingerprint
                )}>Save</Button>
            </div>
        </div>
    )
};

export default PairNewKey;
