import React, { Component, PropTypes, Children, cloneElement } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/Common';
import Step from './Step';
import styles from './styles.css';

class Steps extends Component {

    static propTypes = {
        direction: PropTypes.string,
        labelPlacement: PropTypes.string,
        size: PropTypes.string,
        progressDot: PropTypes.oneOfType([
            PropTypes.bool,
            // PropTypes.func,
        ]),
    }

    static defaultProps = {
        direction: 'horizontal',
        labelPlacement: 'horizontal',
        current: 0,
        status: 'process',
        size: null,
        progressDot: null,
    }

    render() {
        const {
            className,
            children,
            labelPlacement,
            current,
            direction,
            status,
            size,
            progressDot,
            ...others
        } = this.props;
        const classes = classnames(styles.steps, className, {
            [styles['steps--progress-dot']]: progressDot
        });

        return (
            <div className={classes}>
                {Children.map(children, (step, i) => {
                    i = i + 1;

                    const stepProps = {
                        stepNumber: (i).toString(),
                        progressDot,
                    }

                    if (!step.props.status) {
                      if (i === current) {
                        stepProps.status = status;
                    } else if (i < current) {
                        stepProps.status = 'finish';
                      } else {
                        stepProps.status = 'wait';
                      }
                    }

                    return cloneElement(step, stepProps)
                }, this)}
            </div>
        )
    }
}
Steps.Step = Step;

export { Step };
export default Steps;
