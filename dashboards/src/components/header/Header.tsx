import React, {useContext} from "react";
import styles from './header.module.css';
import {allowedKeysDummyDataContext, headerInfoContext} from "../../dummyData";

const Header = () => {
    const headerInfo = useContext(headerInfoContext)
    const allowedKeys = useContext(allowedKeysDummyDataContext)

    console.log(headerInfo);
    return (
        <div className={styles.container}>
            <div className={styles.headerItem}>
                <h4>Network Info</h4>
                <p>IP Address: {headerInfo.networkInfo.ipAddress}</p>
                <p>MAC Address: {headerInfo.networkInfo.macAddress}</p>
            </div>
            <div className={styles.headerItem}>
                <h4>Lock Status</h4>
                <p>{headerInfo.lockStatus}</p>
            </div>
            <div className={styles.headerItem}>
                <h4>Total Allowed Keys</h4>
                <p>{allowedKeys.allowedKeys.length}</p>
            </div>
        </div>
    )
};

export default Header;
