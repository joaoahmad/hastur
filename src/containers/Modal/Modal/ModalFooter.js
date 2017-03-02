import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './styles.css';

function ModalFooter({ className, children, variant }){
    const classes = classnames(styles.modalFooter, className, ...variant.split(' ').map(i => styles['modalFooter--' + i]));
    return (
        <div className={classes}>
            {children}
        </div>
    );
}

ModalFooter.propTypes = {
    variant: PropTypes.string,
};

ModalFooter.defaultProps = {
    variant: '',
};

export default ModalFooter;
