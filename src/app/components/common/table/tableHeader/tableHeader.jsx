import React from 'react';
import PropTypes from 'prop-types';
import arrowUp from '../../../../assets/img/icons/SortArrowUp.png';
import arrowDown from '../../../../assets/img/icons/SortArrowDown.png';
import style from './tableHeader.module.css'

const TableHeader = ({ onSort, selectedSort, columns, classes}) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({ ...selectedSort, direction: selectedSort.direction === 'asc' ? 'desc' : 'asc' });
        } else {
            onSort({ path: item, order: 'asc' });
        }
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        className={classes.tableHeader}
                        onClick={columns[column].path ? () => handleSort(columns[column].path) : undefined}
                        {...{ role: columns[column].path && 'button' }}
                        scope='col'>
                        {columns[column].name}
                        {!(columns[column].name==='Detail') && (columns[column].path) &&
                            <span className={style.arrowWrapper}>
                                <img src={arrowUp} alt="arrowUp" />
                                <img src={arrowDown} alt="arrowDown" />
                            </span>
                        }

                    </th>
                ))}
            </tr>
        </thead>
    );
};

// TableHeader.propTypes = {
//     columns: PropTypes.object.isRequired,
//     selectedSort: PropTypes.object.isRequired,
//     onSort: PropTypes.func.isRequired

// };

export default TableHeader;
