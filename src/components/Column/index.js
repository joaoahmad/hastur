import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './styles.css';

function Column({ flex, className, style, children, variant }){
    if (flex) {
        style = Object.assign({
            WebkitFlex: flex,
            msFlex: flex,
            flex: flex,
        }, style);
    }
    const classes = classnames(styles.column, className, ...variant.split(' ').map(i => styles['column--' + i]));
    return (
        <div className={classes} style={style}>
            {children}
        </div>
    )
}

Column.propTypes = {
    flex: PropTypes.any,
    variant: PropTypes.string
}

Column.defaultProps = {
    flex: null,
    variant: ''
}

export default Column;
