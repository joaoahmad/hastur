import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';
import Select from 'react-select';
import classnames from 'classnames';
import omit from 'lodash/omit';
import debounce from 'lodash/debounce';
import { __ } from '../../helpers/locale';
import { errorMessage } from '../UXForm/styles/input.css';
import styles from './styles.css';

class RenderField extends Component {

    static propTypes = {
        loadOptions: PropTypes.func.isRequired,
        optionsTranformer: PropTypes.func,
        name: PropTypes.string,
        label: PropTypes.string,
        input: PropTypes.any,
        defaultValue: PropTypes.any,
        valueKey: PropTypes.string,
        labelKey: PropTypes.string,
        creatable: PropTypes.bool,
        clearable: PropTypes.bool,
        autoload: PropTypes.bool,
        backspaceRemoves: PropTypes.bool,
        deleteRemoves: PropTypes.bool,
    }

    static defaultProps = {
        name: null,
        placeholder: __('Select') + ' ...',
        searchPromptText: __('Type to search'),
        clearAllText: __('Clear all'),
        clearValueText: __('Clear value'),
        optionsTranformer: null,
        cache: false,
        label: null,
        input: null,
        defaultValue: null,
        valueKey: 'value',
        labelKey: 'label',
        creatable: false,
        clearable: false,
        autoload: true,
        ignoreCase: false,
        backspaceRemoves: false,
        deleteRemoves: false,
        filterOption: () => true
    }

    constructor() {
        super();
        this.state = { value: null }
        this.onChange = this.onChange.bind(this);
        // this.onFetch = debounce(this.onFetch.bind(this), 250);
        this.onFetch = this.onFetch.bind(this);
    }

    componentDidMount(){
        const { defaultValue } = this.props;
        this.setState({ value: defaultValue });
    }

    onChange(value){
        const { input, onChange, valueKey, labelKey } = this.props;
        if (value) {
            value = value[valueKey] || value;
        }

        this.setState({ value });
        return input ? input.onChange(value) : onChange(newValue);
    }

    onFetch(input){
        const { loadOptions, optionsTranformer } = this.props;
        let options = { q: input };

        if (!input && input !== '') {
            return Promise.resolve({ options: [] });
        }

        if (optionsTranformer) {
            options = optionsTranformer(options);
        }
        return loadOptions(options).then(action => {
            return { options: action.payload }
        });
    }

    renderLabel(){
        const { label } = this.props
        return label ? <label>{label}</label> : null
    }

    renderError(){
        const { meta: { touched, error } } = this.props;
        return touched && error && <div className={errorMessage}>{error}</div>;
    }

    renderSelect(){
        const props = Object.assign({}, this.props);
        const { input, creatable } = this.props;
        const { value } = this.state;

        if (input) {
            props.onBlur = () => input.onBlur(input.value);
        }

        const AsyncComponent = creatable
        ? Select.AsyncCreatable
        : Select.Async;

        return <AsyncComponent {...props} value={value} onChange={this.onChange} loadOptions={this.onFetch} />;
    }

    render(){
        const { input, meta, className } = this.props;

        const classes = classnames(styles.select, className, {
            [styles.wrapHasError]: meta && input && meta.touched && meta.error
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

/**
* Input wrap component
*/
class SelectAsync extends Component{
    render(){
        return this.props.name ?
        <Field component={RenderField} {...this.props} /> : <RenderField {...this.props} />;
    }
}

export default SelectAsync;
