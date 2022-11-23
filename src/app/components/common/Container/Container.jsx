import React from 'react'
import * as propTypes from 'prop-types'
import styles from './Container.module.css'

export const Container = ({children}) => {

    return( <div className={styles.container}>{children}</div> )
}

Container.propTypes = {
    children: propTypes.node
}