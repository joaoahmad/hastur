import React, { Component, PropTypes } from 'react'
import { __ } from 'i18n';
import classnames from 'classnames';
import styles from './styles.css';

class Toggle extends Component {

    static propTypes = {
        onToggle: PropTypes.func,
        disabled: PropTypes.bool,
        async: PropTypes.bool,
        loading: PropTypes.bool,
        options: PropTypes.shape({
            on: React.PropTypes.any.isRequired,
            off: React.PropTypes.any.isRequired,
        }).isRequired,
        onLabel: PropTypes.string,
        offLabel: PropTypes.string,
    }

    static defaultProps = {
        on: false,
        disabled: false,
        loading: false,
        async: false,
        options: {
            on: true,
            off: false,
        },
        onLabel: __('Yes'),
        offLabel: __('No'),
    }

    constructor(props){
        super(props)
        this.state = {}
        this.handleToggle = this.handleToggle.bind(this)
    }

    componentDidMount(){
        const state = {
            disabled: false,
            loading: false,
            initialValue: null,
            ...this.props
        }
        this.setState(state);
    }

    handleToggle(){
        const { async, disabled, onToggle, onChange } = this.props

        if(disabled)
        return;

        let state = { disabled: true, loading: (async) ? true : this.state.loading }

        this.setState(state);
        const { _checkbox } = this;
        const checked = (async) ? this.props.on : !_checkbox.checked;

        new Promise((resolve, reject) => {
            if (onToggle) {
                return resolve(onToggle(checked));
            }
            if (onChange) {
                return resolve(onChange(checked));
            }
            resolve();
        }).then(() => {
            _checkbox.checked = checked;
            this.setState({ disabled: false, loading: false });
        });
    }

    // TODO: Improve this component with options props to "on" and "off" values

    // get isChecked(){
    //     const { on, options } = this.props
    //     const on = this.props.on ||
    //     const checked = () => {
    //         options.on ==
    //     }
    // }

    render() {
        const { on, options, onLabel, offLabel } = this.props;
        const { disabled, loading } = this.state;
        var classes = classnames(styles.toggle, {
            [styles['is-on']]: on,
            [styles['is-loading']]: loading || false,
            [styles['is-disabled']]: disabled || false,
        });

        const labelOnClasses = classnames(styles.switchLabel, styles.switchOn);
        const labelOffClasses = classnames(styles.switchLabel, styles.switchOff);

        return (
            <div className={styles.toggle__wrap}>
                <div className={classes} onClick={this.handleToggle}>
                    <input type='checkbox' ref={(c) => this._checkbox = c} defaultChecked={on} disabled={disabled} />
                    {/* <input type='hidden' value={options.off} disabled={disabled || !this._checkbox.checked} /> */}
                    <label>
                        <div className={labelOnClasses}>{onLabel}</div>
                        <div className={styles.switcher}></div>
                        <div className={labelOffClasses}>{offLabel}</div>
                    </label>
                </div>
            </div>
        );
    }

}

export default Toggle;
