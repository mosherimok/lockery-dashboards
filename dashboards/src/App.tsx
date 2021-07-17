import React, {useState} from 'react';
import styles from './App.module.css';
import Header from "./components/header/Header";
import AllowedKeysTable from "./components/allowed-keys-table/allowed-keys-table";

import RemoteControls from "./components/remote-controls/remote-controls";
import {allowedKeysDummyData, headerInfoDummyData, headerInfoContext, allowedKeysDummyDataContext, authorizationLogsContext} from "./dummyData";
import AuthorizationLogTable from "./components/authorization-log-table/authorization-log-table";

function App() {
    const [allowedKeys, setAllowedKeys] = useState(allowedKeysDummyData);
    const [headerInfo, setHeaderInfo] = useState(headerInfoDummyData);
    const [authorizationLogs, setAuthorizationLogs] = useState([]);

    const updateAllowedKeys = (newData) => {
        setAllowedKeys(newData);
    };

    const updateHeaderInfo = (newInfo) => {
        setHeaderInfo(newInfo);
    }
    
    const updateAuthorizationLogs = (newLogs) => {
        setAuthorizationLogs(newLogs);
    };

    return (
        <div className={styles.App}>
            <allowedKeysDummyDataContext.Provider value={{allowedKeys, updateAllowedKeys}}>
                <headerInfoContext.Provider value={{...headerInfo, updateHeaderInfo}}>
                    <authorizationLogsContext.Provider value={{logs: authorizationLogs, updateAuthorizationLogs}}>
                        <Header/>
                        <RemoteControls/>
                        <AllowedKeysTable data={allowedKeys}/>
                        <AuthorizationLogTable/>
                    </authorizationLogsContext.Provider>
                </headerInfoContext.Provider>
            </allowedKeysDummyDataContext.Provider>
        </div>
    );
}

export default App;
