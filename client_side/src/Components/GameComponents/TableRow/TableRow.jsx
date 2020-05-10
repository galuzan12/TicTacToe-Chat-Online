import React from 'react';
import './TableRow.css';
import TableCell from '../TableCell/TableCell';

const Table = (props) => {

    return (
        <div className="tableRow row">
            <TableCell Index={[props.Index, 0]} />
            <TableCell Index={[props.Index, 1]} />
            <TableCell Index={[props.Index, 2]} />
        </div>
    )
}

export default Table;
