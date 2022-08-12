import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage, classes }) => {
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);

    // const leftPaginationLimit = 5;


    return (
        <nav>
            <ul className={classes.pagination}>
            {/* {(currentPage-leftPaginationLimit <= 0) ?
                } */}




                {pages.map((page) => (
                    <li
                        className={
                            (currentPage === page ? classes.page__active : classes.page)
                        }
                        key={'page_' + page}
                    >
                        <button
                            className={classes.page_link}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default Pagination;
