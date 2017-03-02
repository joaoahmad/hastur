import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './styles.css';

class Tag extends Component {

    static propTypes = {
        variant: PropTypes.string,
        size: PropTypes.string,
        closable: PropTypes.bool,
        onClose: PropTypes.func,
    }

    static defaultProps = {
        variant: '',
        size: null,
        closable: false,
        onClose: null,
    }

    render() {
        const { className, variant, size, closable, onClose, children, ...others } = this.props;
        const classes = classnames(styles.tag, className, {
            [styles['tag--' + size]]: size,
        }, ...variant.split(' ').map(i => styles['tag--' + i]));

        return (
            <div {...others} className={classes}>
                {children}
            </div>
        );
    }

}
export default Tag;
