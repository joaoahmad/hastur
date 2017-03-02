import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/Common';
import styles from './styles.css';

class Step extends Component {

    static propTypes = {
        style: PropTypes.object,
        status: PropTypes.string,
        icon: PropTypes.node,
        stepLast: PropTypes.bool,
        stepNumber: PropTypes.string,
        description: PropTypes.any,
        title: PropTypes.any,
        progressDot: PropTypes.oneOfType([
            PropTypes.bool,
            // PropTypes.func,
        ])
    }

    render() {
        const { className, title, stepNumber, progressDot, status, ...others } = this.props;
        const classes = classnames(styles.step, className, styles['step--status--' + status]);

        return (
            <div className={classes}>
                <div className={styles.stepNumber}>
                    {stepNumber}
                </div>
                <div className={styles.stepTitle}>
                    {title}
                </div>
            </div>
        )
    }
}

export default Step;
