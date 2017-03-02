import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form'
import Select, { Creatable } from 'react-select';
import classnames from 'classnames';
import omit from 'lodash/omit';

import { __ } from '../../helpers/locale';
import { withDefaultValue } from '../UXForm/utils';
import SelectAsync from './SelectAsync';
import Minimal from './Minimal';
import { errorMessage } from '../UXForm/styles/input.css';
import styles from './styles.css';

/**
* Field render component
*/
class RenderField extends React.Component {

    renderLabel(){
        const { label } = this.props
        return label ? <label>{label}</label> : null
    }

    renderError(){
        const { meta: { touched, error } } = this.props;
        return touched && error && <div className={errorMessage}>{error}</div>;
    }

    renderSelect(){
        const { input, creatable, onCreate, defaultValue } = this.props;

        const defaults = {
            textCreator: __('Create option'),
        }

        const options = Object.assign(defaults, omit(this.props, ['input', 'meta', 'name', 'onCreate']), { ...input });
        options.onChange = (e) => {
            const value = e instanceof Array ? e.map(i => i.value) : e.value;
            if (input) {
                return input.onChange(value);
            }else{
                return this.props.onChange(value);
            }
        }

        // options.newOptionCreator = this.props.onCreate;
        options.promptTextCreator = value => options.textCreator + ` "${value}"`;

        if (input) {
            options.onBlur = () => input.onBlur(input.value);
        }

        return <Select ref='select' {...options} autosize={true} />;
    }

    render(){
        const { input, touched, error, className } = this.props;
        const classes = classnames(styles.select, className, {
            [styles.wrapHasError]: input && touched && error
        })
        return (
            <div className={classes}>
                {this.renderLabel()}
                {this.renderSelect()}
                {input && this.renderError()}
            </div>
        )

    }
}

RenderField = withDefaultValue(RenderField);

/**
* Input wrap component
*/
class UXSelect extends Component{
    render(){
        const { name } = this.props;
        if (name) {
            return  <Field ref={c => this._select = c} component={RenderField} {...this.props} />;
        }else{
            return <RenderField ref={c => this._select = c} {...this.props} />;
        }
    }
}

UXSelect.propTypes = {
    styles: PropTypes.array,
    clearable: PropTypes.bool,
    searchable: PropTypes.bool,
    creatable: PropTypes.bool,
    placeholder: PropTypes.string,
    noResultsText: PropTypes.string,
    textCreator: PropTypes.string,
}

UXSelect.defaultProps = {
    styles: [],
    clearable: false,
    searchable: false,
    placeholder: __('Select'),
    noResultsText: __('No results found'),
    creatable: false,
    textCreator: __('Create option'),
}

UXSelect.Minimal = Minimal;
UXSelect.Async = SelectAsync;

export { SelectAsync }; // DEPRECATED
export default UXSelect;
