import React, {useRef, useState} from "react";
import {
    Button,
    makeStyles, Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import EditKey from "./edit-key";

import styles from './allowed-keys-table.module.css';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const AllowedKeysTable = ({data}) => {
    const [isEditModalOpened, setIsEditModalOpened] = useState(false);
    const editedKey = useRef(null);
    
    const classes = useStyles();
    
    const onEditModalClosed = () => setIsEditModalOpened(false);
    
    const onKeyEditButtonClicked = (key) => {
        setIsEditModalOpened(true);
        editedKey.current = key;
    }
    
    const revokeKey = (keyId) => {
        data.splice(data.findIndex((key) => key.keyId === keyId), 1);
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Full name</TableCell>
                        <TableCell align="right">Joined Date</TableCell>
                        <TableCell align="right">Key ID</TableCell>
                        <TableCell align="right">Authentication Type</TableCell>
                        <TableCell align="right"/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.fullName}>
                            <TableCell component="th" scope="row">
                                {row.fullName}
                            </TableCell>
                            <TableCell align="right">{row.joinDate.toISOString()}</TableCell>
                            <TableCell align="right">{row.keyId}</TableCell>
                            <TableCell align="right">{row.type}</TableCell>
                            <TableCell align="right">
                                <Button variant={'outlined'} onClick={() => onKeyEditButtonClicked(row)}
                                        style={{marginRight: '10px'}}>
                                    Edit
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Modal
                open={isEditModalOpened}
                onClose={onEditModalClosed}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className={styles.container}>
                    <EditKey keyDetails={editedKey.current} onClose={onEditModalClosed} onRevoke={revokeKey}/>
                </div>
            </Modal>
        </TableContainer>
    )
}

export default AllowedKeysTable;
