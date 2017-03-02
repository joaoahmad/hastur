import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';
import omit from 'lodash/omit';
import classnames from 'classnames';
import accounting from 'accounting';
import CurrencyInput from './react-currency-input';
import { withDefaultValue } from './utils';
import styles from './styles/input.css';

/**
* Field render component
*/
class RenderField extends Component {

    static propTypes = {
        type: PropTypes.string,
        addon: PropTypes.any,
        variant: PropTypes.string,
        // input type currency props
        precision: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ])
    }

    static defaultProps = {
        type: 'text',
        addon: null,
        variant: '',
        // input type currency props
        precision: 2,
    }

    componentDidMount(){
        if (this.props.autofocus && this._input && typeof this._input.focus == 'function') {
            this._input.focus();
        }
    }

    renderAddon(){
        const { addon } = this.props
        return addon ? <div className={styles.inputAddon}>{addon}</div> : null;
    }

    renderLabel(){
        const { label, input } = this.props
        const name = input ? input.name : null;
        if (label) {
            return <label htmlFor={name}>{label}</label>
        }
    }

    renderInput(){
        const { input, className, style, placeholder, label, type, disabled, readOnly, onChange, precision } = this.props;
        const classes = classnames(styles.input, className);

        if (type == 'currency'){
            input.value = accounting.toFixed(input.value, precision);
            return <CurrencyInput
                ref={(c) => this._input = c}
                precision={precision}
                {...input}
                placeholder={placeholder || label}
                className={classes}
                disabled={disabled}
                readOnly={readOnly}
                style={style} />
        }else{
            return <input ref={(c) => this._input = c} {...input} type={type} placeholder={placeholder || label} className={classes} disabled={disabled} readOnly={readOnly} style={style} />
        }
    }

    renderError(){
        if (this.props.input) {
            const { meta: { touched, error }} = this.props;
            return touched && error && <div className={styles.errorMessage}>{error}</div>;
        }
        return null;
    }

    render(){
        const { addon, input, meta: { touched, error }, disabled, variant } = this.props;

        const wrapClasses = classnames(styles.wrap, {
            [styles.wrapHasError]: input && touched && error,
            [styles['is-disabled']]: disabled
        }, ...variant.split(' ').map(i => styles['input--' + i]));

        if(addon){
            return (
                <div className={wrapClasses}>
                    {this.renderLabel()}
                    <div className={styles.addonWrap}>
                        {this.renderAddon()}
                        {this.renderInput()}
                    </div>
                    {this.renderError()}
                </div>
            );
        }else{
            return (
                <div className={wrapClasses}>
                    {this.renderLabel()}
                    {this.renderInput()}
                    {this.renderError()}
                </div>
            );
        }
    }
}

RenderField = withDefaultValue(RenderField);

/**
* Input wrap component
*/
function Input(props) {
    if (props.name) {
        return  <Field component={RenderField} {...props} />;
    }else{
        return <RenderField {...props} />
    }
}

export default Input;
