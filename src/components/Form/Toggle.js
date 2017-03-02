import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';
import omit from 'lodash/omit';
import classnames from 'classnames';
import accounting from 'accounting';
import UXToggle from 'components/UXToggle';
import { withDefaultValue } from './utils';
import styles from './styles/input.css';

/**
* Field render component
*/
class RenderField extends Component {

    static propTypes = {
        options: PropTypes.shape({
            on: React.PropTypes.any.isRequired,
            off: React.PropTypes.any.isRequired,
        })
    }

    static defaultProps = {
        options: {
            on: true,
            off: false
        }
    }

    componentDidMount(){
        if (this.props.autofocus && this._input && typeof this._input.focus == 'function') {
            this._input.focus();
        }
    }

    renderLabel(){
        const { label, input } = this.props
        const name = input ? input.name : null;
        if (label) {
            return <label htmlFor={name}>{label}</label>
        }
    }

    renderInput(){
        const { input, className, style, placeholder, label, disabled, options, defaultChecked } = this.props;
        const classes = classnames(styles.toggle, className);

        console.debug('input', input)

        return (
            <UXToggle
                {...input}
                on={input.value || defaultChecked}
                options={options}
                async={false}
                loading={false}
                style={style}
                disabled={disabled}
                />
        )
    }

    renderError(){
        if (this.props.input) {
            const { meta: { touched, error }} = this.props;
            return touched && error && <div className={styles.errorMessage}>{error}</div>;
        }
        return null;
    }

    render(){
        const { addon, input, meta: { touched, error }} = this.props;

        const wrapClasses = classnames(styles.wrap, {
            [styles.wrapHasError]: input && touched && error
        });

        return (
            <div className={wrapClasses}>
                {this.renderLabel()}
                {this.renderInput()}
                {this.renderError()}
            </div>
        );
    }
}

RenderField = withDefaultValue(RenderField);

/**
* Input wrap component
*/
function Toggle(props) {
    if (props.name) {
        return  <Field component={RenderField} {...props} />;
    }else{
        return <RenderField {...props} />
    }
}

export default Toggle;
