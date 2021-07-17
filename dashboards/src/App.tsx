import React, {useState} from 'react';
import styles from './App.module.css';
import Header from "./components/header/Header";
import AllowedKeysTable from "./components/allowed-keys-table/allowed-keys-table";

import RemoteControls from "./components/remote-controls/remote-controls";
import {allowedKeysDummyData, headerInfoDummyData, headerInfoContext, allowedKeysDummyDataContext} from "./dummyData";

function App() {
    const [allowedKeys, setAllowedKeys] = useState(allowedKeysDummyData);
    const [headerInfo, setHeaderInfo] = useState(headerInfoDummyData);

    const updateAllowedKeys = (newData) => {
        setAllowedKeys(newData);
    };

    const updateHeaderInfo = (newInfo) => {
        setHeaderInfo(newInfo);
    }

    return (
        <div className={styles.App}>
            <allowedKeysDummyDataContext.Provider value={{allowedKeys, updateAllowedKeys}}>
                <headerInfoContext.Provider value={{...headerInfo, updateHeaderInfo}}>
                    <Header/>
                    <RemoteControls/>
                </headerInfoContext.Provider>
                <AllowedKeysTable data={allowedKeys}/>
            </allowedKeysDummyDataContext.Provider>
        </div>
    );
}

export default App;
