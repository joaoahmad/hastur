import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { reduxForm } from 'redux-form';
import classnames from 'classnames';
import { __ } from '../../../helpers/locale';

import WizardStep from './WizardStep';
import { Button } from '../../Common';
import Form, { Submit } from '../';
import styles from './styles.css';

class Wizard extends Component {

    constructor(props) {
        super(props)
        this.previousStep = this.previousStep.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.submitStep = this.submitStep.bind(this);
        this.createStep = this.createStep.bind(this);
        this._stepForms = [];
        this.state = {
            currentStep: 0,
            steps: [],
        }
    }

    componentDidMount(){
        const { currentStep, steps } = this.props;
        this.setState({
            currentStep: currentStep,
            steps: steps.map(this.createStep)
        });
    }

    createStep(item, i){
        const { form, validate, onSubmit, steps } = this.props;

        // prevent async setState delay
        const currentStep = this.props.currentStep || this.state.currentStep;

        function Step({ handleSubmit, children }){
            return (
                <Form onSubmit={handleSubmit}>
                    {children}
                </Form>
            )
        }

        const FormStep = reduxForm({ form, validate, destroyOnUnmount: false })(Step);
        const submit = i < steps.length - 1 ? this.nextStep : onSubmit;

        return (
            <WizardStep key={i}>
                <FormStep ref={c => this._stepForms[i] = c} onSubmit={submit}>
                    {item}
                </FormStep>
            </WizardStep>
        )
    }

    // Submit step form to validate
    submitStep(a, b, c){
        const { currentStep } = this.state;
        if (this._stepForms[currentStep]) {
            return this._stepForms[currentStep].submit();
        }
    }

    nextStep() {
        const { onNext } = this.props;
        const nextStep = this.state.currentStep + 1;

        if (onNext()) {
            if (!this.tail) {
                this.setState({ currentStep: nextStep })
            }
        }
    }

    previousStep() {
        const { onPrevious } = this.props;
        if (onPrevious()) {
            this.setState({ currentStep: this.state.currentStep - 1 })
        }
    }

    get head(){
        return this.state.currentStep == 0
    }

    get tail(){
        return this.state.currentStep == this.props.steps.length - 1;
    }

    renderSteps(){
        const { steps, currentStep } = this.state;

        // render the current, prev and next steps
        return steps
        .filter((step,i) => {
            return i == currentStep;
            // return i == currentStep || currentStep - 1 == i || currentStep + 1 == i;
        });
    }

    render() {
        const { finishLabel, submitting, onSubmit } = this.props;
        const { steps, currentStep } = this.state;

        const classes = classnames(styles.wrap);

        const stepClasses = classnames(styles.steps, {
            [styles.walking]: currentStep > 0
        });

        return (
            <div className={classes}>
                <div className={stepClasses}>
                    {this.renderSteps()}
                </div>
                <div className={styles.controls}>
                    {!this.head && <Button styles={['basic', 'wide']} className={styles.prevButton} onClick={this.previousStep}>{__('Back')}</Button>}
                    {!this.tail && steps.length > 1 && <Button styles={['primary', 'wide']} onClick={this.submitStep}>{__('Next')}</Button>}
                    {this.tail && <Button styles={['submit']} loading={submitting} onClick={this.submitStep}>{__('Finish') || finishLabel}</Button>}
                </div>
            </div>
        )
    }
}

Wizard.propTypes = {
    currentStep: PropTypes.number,
    submitting: PropTypes.bool,
    finishLabel: PropTypes.string,
    onSubmit: PropTypes.func,
    onNext: PropTypes.func,
    onPrevious: PropTypes.func,
    steps: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ]),
};

Wizard.defaultProps = {
    currentStep: 0,
    steps: [],
    onNext: () => true,
    onPrevious: () => true
};

Wizard.Step = WizardStep;
export default Wizard;
