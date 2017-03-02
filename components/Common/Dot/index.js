import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './styles.css';

function Dot(props){
    let { style, modifiers, variant, color, ...others } = props;
    variant = variant ? variant.split(' ') : modifiers;
    const classes = classnames(styles.dot, {
        [styles['dot--' + color]]: color,
    }, ...variant.map(i => styles['dot--' + i]));

    return (
        <span className={classes} style={style} />
    )
}

Dot.propTypes = {
    modifiers: PropTypes.array,
    variant: PropTypes.string,
};

Dot.defaultProps = {
    modifiers: [],
    variant: null,
    color: null,
};

export default Dot;
