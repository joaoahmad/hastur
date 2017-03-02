import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './styles.css';

class Icon extends Component {
	render() {
        let { name, size, color, className, style, spinning, ...others } = this.props
        style = Object.assign({}, style);

        if (size) {
            style.fontSize = size + 'px';
        }

        if (color) {
            style.color = color;
        }

		const classes = classnames(styles.icon, name, className, {
			[styles.spinning]: spinning
		})

        return (
            <i className={classes} style={style} {...others}></i>
        );
	}
}

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    color: PropTypes.string,
    spinning: PropTypes.bool,
};

export default Icon;
