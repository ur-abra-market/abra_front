import React from 'react';
// import PropTypes from 'prop-types';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

const Table = ({ onSort, selectedSort, columns, data, children, classes }) => {
    return (
        <table className={classes.table}>
            {children || <>
                <TableHeader {...{ onSort, selectedSort, columns, classes}} />
                <TableBody {...{ data, columns, classes }} />
            </>}
        </table>
    );
};

// Table.propTypes = {
//     columns: PropTypes.object.isRequired,
//     selectedSort: PropTypes.object.isRequired,
//     onSort: PropTypes.func.isRequired,
//     data: PropTypes.array.isRequired,
//     children: PropTypes.array.isRequired

// };

export default Table;
