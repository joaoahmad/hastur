import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import omit from 'lodash/omit';
import Icon from '../../Common/Icon';
import { __ } from '../../../helpers/locale';
import styles from './styles.css';

function NotFoundException({ className, children, variant, error, icon }){
    const classes = classnames(className, styles.exceptionWrap, {
        ...variant.split(' ').map(i => styles['exception--' + i])
    });
    return (
        <div className={classes}>
            {icon && <Icon name={icon} className={styles.exceptionIcon} />}
            <div className={styles.exceptionMessage}>{error}</div>
            {children && <div className={styles.exceptionChildren}>{children}</div>}
        </div>
    );
}

NotFoundException.propTypes = {
    variant: PropTypes.string,
    error: PropTypes.string,
    icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
};

NotFoundException.defaultProps = {
    variant: '',
    error: __('Nothing found'),
    icon: 'shapes-sad',
};

export default NotFoundException;
