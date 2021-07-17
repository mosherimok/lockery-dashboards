import React, {useContext} from "react";
import {
    Button,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";

import styles from './authorization-log-table.module.css';
import {authorizationLogsContext} from "../../dummyData";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const AuthorizationLogTable = () => {
    const logsContext = useContext(authorizationLogsContext);
    const classes = useStyles();
    
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Full name</TableCell>
                        <TableCell align="right">Key ID</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Authentication Type</TableCell>
                        <TableCell align="right">Operation Status</TableCell>
                        <TableCell align="right"/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {logsContext.logs.map((row: any) => (
                        <TableRow key={row.keyId}>
                            <TableCell component="th" scope="row">{row.fullName}</TableCell>
                            <TableCell align="right">{row.keyId}</TableCell>
                            <TableCell align="right">{row.date.toISOString()}</TableCell>
                            <TableCell align="right">{row.type}</TableCell>
                            <TableCell align="right">{row.operationStatus}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )    
};

export default AuthorizationLogTable;
