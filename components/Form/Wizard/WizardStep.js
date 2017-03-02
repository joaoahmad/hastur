import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './styles.css';

function WizardStep({ children, current }){
    return (
        <div className={styles.step}>
            {children}
        </div>
    )
}

// WizardStep.propTypes = {
//     step: PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.number
//     ])
// };

export default WizardStep;
