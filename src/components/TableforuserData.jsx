import { useTheme } from "../context/ThemeContext";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";

const TableforuserData = ({ data }) => {
    const { theme } = useTheme();
   
    const formatDate = (TimeStamp) => {
        console.log('Timestamp:', TimeStamp); // Check the structure
        if (TimeStamp && TimeStamp.toDate instanceof Function) {
            return TimeStamp.toDate().toLocaleString();
        } 
        if (TimeStamp && TimeStamp.seconds) {
            return new Date(TimeStamp.seconds * 1000 + TimeStamp.nanoseconds / 1000000).toLocaleString();
        }
        return "Date not available";
        console.log(data);
    };
    
    const cellstyle={color: theme.textColor, textAlign: 'center' }
    return (
        <div className="table">
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={cellstyle}>
                                WPM
                            </TableCell>
                            <TableCell style={cellstyle}>
                                Accuracy
                            </TableCell>
                            <TableCell style={cellstyle}>
                                Characters
                            </TableCell>
                            <TableCell style={cellstyle}>
                                Date
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell style={cellstyle}>{item.wpm}</TableCell>
                                <TableCell style={cellstyle}>{item.accuracy}</TableCell>
                                <TableCell style={cellstyle}>{item.characters}</TableCell>
                                <TableCell style={cellstyle}>{formatDate(item.TimeStamp)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TableforuserData;
