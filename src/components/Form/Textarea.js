import React from 'react';
import { Field } from 'redux-form';
import classnames from 'classnames';
import styles from './styles/input.css';

/**
* Field render component
*/
class RenderField extends React.Component {

    constructor() {
        super();
        this.state = { focus: false };
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    componentDidMount(){
        if (this.props.autofocus && this._input && typeof this._input.focus == 'function') {
            this._input.focus();
        }
    }

    handleFocus(e){
        this.setState({focus: true});
    }

    handleBlur(e){
        this.setState({ focus: (() => (e.target.value.length > 0) ? true : false)() });
    }

    renderLabel(){
        const { label, input } = this.props
        const name = input ? input.name : null;
        if (label) {
            return <label htmlFor={name}>{label}</label>
        }
    }

    renderInput(){
        const { input, style, label, placeholder, disabled } = this.props;
        const { focus } = this.state;
        return <textarea {...input} placeholder={placeholder || label} disabled={disabled} className={styles.input} style={style} onFocus={this.handleFocus} onBlur={this.handleBlur} />
    }

    renderError(){
        if (this.props.input) {
            const { meta: { touched, error } } = this.props;
            return touched && error && <div className={styles.errorMessage}>{error}</div>;
        }
        return null;
    }

    render(){
        const { input, meta: { touched, error }} = this.props;
        const classes = classnames(styles.wrap, {
            [styles['is-focus']]: focus,
            [styles.wrapHasError]: input && touched && error,
        });
        return (
            <div className={classes}>
                  {this.renderLabel()}
                  {this.renderInput()}
                  {this.renderError()}
            </div>
        )
    }
}

/**
* Input wrap component
*/
class Textarea extends React.Component {
    render() {
        if (this.props.name) {
            return  <Field component={RenderField} {...this.props} />;
        }else{
            return <RenderField {...this.props} />
        }
    }
}
export default Textarea;
