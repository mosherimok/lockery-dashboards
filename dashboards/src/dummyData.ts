import {createContext} from "react";

const createData = (fullName, joinDate, keyId, type, hasFingerprint) => ({fullName, joinDate, keyId, type, hasFingerprint});

const allowedKeysDummyData = [
    createData('Jerry Mattedi', new Date(), '123-456', 'Fingerprint', true),
    createData('Elianora Vasilov', new Date(), '123-457', 'NFC', true),
    createData('Marcos Anguiano', new Date(), '123-458', 'NFC', false),
    createData('Alvis Daen', new Date(), '123-459', 'NFC', false),
];

const allowedKeysDummyDataContext = createContext({allowedKeys: allowedKeysDummyData, updateAllowedKeys: (newData) => {}});

const headerInfoDummyData = {
    networkInfo: {
        ipAddress: '10.0.0.1',
        macAddress: '00:1B:44:11:3A:7B'
    },
    lockStatus: 'unlocked',
    updateHeaderInfo: (newInfo) => {}
};

const authorizationLogsContext = createContext({
    logs: [],
    updateAuthorizationLogs: (newLog) => {} 
})

const headerInfoContext = createContext(headerInfoDummyData);

export {
    allowedKeysDummyData,
    headerInfoDummyData,
    allowedKeysDummyDataContext,
    headerInfoContext,
    authorizationLogsContext
};
