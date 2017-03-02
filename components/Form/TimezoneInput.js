import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import omit from 'lodash/omit';
import memoize from 'lodash/memoize';
import classnames from 'classnames';
import moment from 'moment';
import 'moment-timezone';

import { __ } from 'i18n';
import { constants } from 'selectors/app';
import { Row, Column } from 'components/Common';
import Select from 'components/UXSelect';
import styles from './styles/timezone-input.css';

const countriesSelector = memoize(list => {
    return list.map(item => ({
        value: item.name,
        label: __(item.name),
    }));
});

const timezonesFilter = memoize(list => {
    return country => {
        const founded = list.find(item => item.name === country);
        if (founded && founded.timezones) {
            return founded.timezones.map(timezone => {
                const label = timezone.split('/')[1].replace('_', ' ');
                const gmt = moment.tz(timezone).format('Z');
                return {
                    value: timezone,
                    label: `GMT(${gmt}) ${label}`,
                }
            })
        }
        return [];
    }
});

const countriesByTimezoneSelector = memoize(list => {
    return list.reduce((acc, cur) => {
        cur.timezones.forEach(timezone => {
            if (!acc[timezone]) {
                acc[timezone] = [];
            }
            acc[timezone].push(cur.name);
        });
        return acc;
    }, []);
});

/**
* Field render component
*/
class RenderField extends Component {

    constructor(props){
        super(props);
        this.onCountryChange = this.onCountryChange.bind(this);
        this.state = { country: null };
    }

    componentDidMount() {
        this.setDefaultCountry();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.timezonesByCountry.length !== this.props.timezonesByCountry.length) {
            this.setDefaultCountry();
        }
    }

    setDefaultCountry(){
        const { input: { value }, timezonesByCountry } = this.props;
        const countriesByTimezone = countriesByTimezoneSelector(timezonesByCountry);
        const contries = countriesByTimezone[value];
        if (contries && contries.length) {
            const country = __(contries[0]);
            this.setState({ country });
        }
    }

    onCountryChange(country){
        const { input, timezonesByCountry } = this.props;
        this.setState({ country });

        // update input with first timeout
        const timezones = timezonesFilter(timezonesByCountry)(country);
        if (timezones.length) {
            input.onChange(timezones[0].value);
        }
    }

    renderAddon(){
        const { addon } = this.props
        return addon ? <div className='input__addon'>{addon}</div> : null;
    }

    renderLabel(){
        const { label, input } = this.props
        const name = input ? input.name : null;
        if (label) {
            return <label htmlFor={name}>{label}</label>
        }
    }

    renderInput(){
        const { input, autofocus, className, style, placeholder, label, disabled, onChange, timezonesByCountry } = this.props;
        const { country } = this.state;
        const classes = classnames(styles.timezoneInput, className);

        const countries = countriesSelector(timezonesByCountry);
        const timezones = timezonesFilter(timezonesByCountry)(country);
        const countriesByTimezone = countriesByTimezoneSelector(timezonesByCountry);

        return(
            <Row variant='margin-between' style={style}>
                <Column flex='0 0 40%'>
                    <Select onChange={this.onCountryChange} value={country} placeholder={__('Country')} disabled={disabled} options={countries} autofocus={autofocus} searchable />
                </Column>
                <Column flex='1'>
                    <Select {...input} placeholder={__('Timezone')} className={classes} disabled={disabled} options={timezones} searchable />
                </Column>
            </Row>
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


/**
* TimezoneInput wrap component
*/
function TimezoneInput(props) {
    if (props.name) {
        return  <Field component={RenderField} {...props} />;
    }else{
        return <RenderField {...props} />
    }
}

TimezoneInput.defaultProps = {
    timezonesByCountry: []
}

const mapStateToProps = state => ({
    timezonesByCountry: constants(state, 'timezonesByCountry')
});
TimezoneInput = connect(mapStateToProps)(TimezoneInput);
export default TimezoneInput;
