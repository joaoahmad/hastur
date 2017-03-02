import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './styles.css';

function ModalBody({ className, children, variant }){
    const classes = classnames(styles.modalBody, className, ...variant.split(' ').map(i => styles['modalBody--' + i]));
    return (
        <div className={classes}>
            {children}
        </div>
    );
}

ModalBody.propTypes = {
    variant: PropTypes.string,
};

ModalBody.defaultProps = {
    variant: '',
};

export default ModalBody;
