import React from 'react';
import './Table.css';
import TableRow from '../TableRow/TableRow';

const Table = (props) => {

    return (
        <div className="table justify-content-md-center">
            <TableRow Index={0} />
            <TableRow Index={1} />
            <TableRow Index={2} />
        </div>
    )
}

export default Table;
