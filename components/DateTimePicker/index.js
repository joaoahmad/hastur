import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import ReactDateTimePicker from 'react-datetime';
import { Field } from 'redux-form';
import classnames from 'classnames';
import omit from 'lodash/omit';
import moment from 'moment-timezone';

import { __, date } from '../../helpers/locale';
import inputStyles from '../UXForm/styles/input.css';
import Select from '../UXSelect';
import { Input } from '../UXForm';
import styles from './styles.css';

/**
* Field render component
*/
class RenderField extends Component {

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        const { user } = this.props
    }

    onChange(e){
        const { value, onChange } = this.props.input;
        return onChange(e);
    }

    renderLabel(){
        const { label } = this.props
        return label ? <label>{label}</label> : null
    }

    renderError(){
        const { meta: { touched, error } } = this.props;
        return touched && error && <div>{error}</div>;
    }

    render() {
        const { input, input: { value }, label, type, disabled, style, beforeToday, afterToday, right, defaultValue } = this.props;
        let { date_format, time_format } = this.props.user.setting;

        const options = {
            date: date_format,
            time: time_format,
            ...this.props.options
        }

        const pickerDefaultValue = date(value);
        console.log(pickerDefaultValue);
        const placeholder = classnames({
            '00/00/0000': !!options.date,
            '00:00': !!options.time,
        });

        const validDate = (current) => {
            if (beforeToday) {
                const date = typeof beforeToday === 'number' ? moment().add(beforeToday, 'days') : moment();
                return current.isBefore(date);
            }
            if (afterToday) {
                const date = typeof afterToday === 'number' ? moment().add(afterToday, 'days') : moment();
                return current.isAfter(date);
            }
            return true;
        }

        const classes = classnames(styles.datetimepicker, {
            [styles['datetimepicker--right']]: right
        });

        return (
            <div className={styles.wrap}>
                {this.renderLabel()}
                <div className={classes}>
                    <ReactDateTimePicker
                        defaultValue={pickerDefaultValue}
                        onChange={this.onChange}
                        dateFormat={options.date}
                        timeFormat={options.time}
                        closeOnSelect={true}
                        isValidDate={validDate}
                        utc={!options.time}
                        inputProps={{ placeholder, style, disabled, className: styles.input }} />
                </div>
                {input && this.renderError()}
            </div>
        );
    }
}

/**
* Input wrap component
*/
class DateTimePicker extends Component {
    render() {
        return  <Field ref={(c) => this._input = c} component={RenderField} {...this.props} />;
    }
}

DateTimePicker.propTypes = {
    user: PropTypes.shape({
        setting: PropTypes.shape({
            date_format: PropTypes.string.isRequired,
            time_format: PropTypes.string.isRequired,
        }).isRequired
    }).isRequired,
    beforeToday: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number,
    ]),
    afterToday: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number,
    ]),
    right: PropTypes.bool
}

DateTimePicker.defaultProps = {
    beforeToday: false,
    afterToday: false,
    right: false,
}

const mapStateToProps = state => ({ user: state.auth.get('user').toJS() });
export default connect(mapStateToProps)(DateTimePicker);
