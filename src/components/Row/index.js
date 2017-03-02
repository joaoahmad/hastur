import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './styles.css';

function Row(props){
    let { children, modifiers, variant, vertical, className, ...others } = props;
    variant = variant ? variant.split(' ') : modifiers;
    const classes = classnames(styles.row, className,
        {
            [styles['row--vertical']]: vertical
        },
        ...variant.map(i => styles['row--' + i]));

    return (
        <div className={classes} {...others}>
            {children}
        </div>
    )
}

Row.propTypes = {
    modifiers: PropTypes.array, // DEPRECATED
    variant: PropTypes.string,
    vertical: PropTypes.bool,
};

Row.defaultProps = {
    modifiers: [], // DEPRECATED
    variant: null,
    vertical: false
};

export default Row;
