import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Loader from '../../Loader'

const TableBody = ({ data, columns, classes }) => {
  const renderCompont = (item, column) => {
    if (columns[column].component) {
      const component = columns[column].component

      // item.with_discount === 0 ?
      if (typeof component === 'function') return component(item)

      return component
    }
    // если мы динамически передаем вложенные данные, то не можем получить к ним доступ
    // для этого используем lodash
    const fieldValue = columns[column].path
    if (fieldValue === 'image_url') {
      return (
        <img
          width={'40px'}
          height={'40px'}
          src={`${item.image_url}`}
          alt="img"
        />
      )
    }
    if (fieldValue === 'with_discount' && item.with_discount === 0)
      return 'Off-sale'

    if (fieldValue === 'with_discount' && item.with_discount === 1)
      return 'On-sale'

    if (fieldValue === 'is_active' && item.is_active === 0) return 'Hidden'

    if (fieldValue === 'is_active' && item.is_active === 1) return 'Visible'

    return _.get(item, columns[column].path)
  }
  return (
    <tbody>
      {data ? (
        data.length === 0 ? (
          <tr>
            <td style={{ textAlign: 'center' }} colSpan={'9'}>
              Please, <Link to="../add-product">add product</Link>
            </td>
          </tr>
        ) : (
          data.map((item) => (
            <tr key={item.id} className={classes.tableRow}>
              {Object.keys(columns).map((column) => (
                // если мы динамически передаем вложенные данные, то не можем получить к ним доступ
                // для этого используем lodash
                <td
                  key={column.replace(/ /g, '')}
                  className={
                    item.status === 'Cancelled' || item.is_active === 0
                      ? classes.tableData_inactive
                      : classes.tableData
                  }
                >
                  {renderCompont(item, column)}
                </td>
              ))}
            </tr>
          ))
        )
      ) : (
        <Loader />
      )}
    </tbody>
  )
}

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
}

export default TableBody
