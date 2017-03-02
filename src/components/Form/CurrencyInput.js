import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { Fields } from 'redux-form';
import map from 'lodash/map';
import get from 'lodash/get';
import has from 'lodash/has';
import classnames from 'classnames';
import accounting from 'accounting';
import api from '../../middlewares/api';
import { __, date } from '../../i18n';
import { currencySymbolMap } from 'currency-symbol-map';
import ReactCurrencyInput from './react-currency-input';
import { Row, Column, Paragraph, Button, Icon } from '../Common';
import Select from '../UXSelect';
import Input from './Input';
import styles from './styles/currency-input.css';

class CurrencyInputRenderer extends Component {
    constructor(props) {
        super(props);
        this.onPanelToggle = this.onPanelToggle.bind(this);
        this.onWindowClick = this.onWindowClick.bind(this);
        this.fetchAmount = this.fetchAmount.bind(this);
        this.state = { isOpen: false }
    }

    componentDidMount() {
        this.bindEvents();
    }

    componentWillUnmount() {
        this.unbindEvents();
    }

    bindEvents(){
        document.addEventListener('click', this.onWindowClick);
        document.addEventListener('touchstart', this.onWindowClick);
    }

    unbindEvents(){
        document.removeEventListener('click', this.onWindowClick);
        document.removeEventListener('touchstart', this.onWindowClick);
    }

    onPanelToggle(){
        this.state.isOpen ? this.close() : this.open();
    }

    open(){
        this.setState({ isOpen: true });
    }

    close(){
        this.setState({ isOpen: false });
    }

    onWindowClick(event){
        const node = findDOMNode(this);
        if( event.target !== node && !node.contains( event.target ) && this.state.isOpen ){
            this.setState({ isOpen: false });
        }
    }

    get fieldsValues(){
        const fields = this.fields;
        const values = {};

        values.currency = fields.currency.input.value;
        values.amount = fields.amount.input.value;
        values.converted_amount = fields.converted_amount.input.value;
        values.currency_converted_amount = fields.currency_converted_amount.input.value;
        values.custom_exchange_rate = fields.custom_exchange_rate.input.value;

        values.exchange_rate = {};
        values.exchange_rate.currency_from = fields.exchange_rate.currency_from.input.value;
        values.exchange_rate.currency_to = fields.exchange_rate.currency_to.input.value;
        values.exchange_rate.rate = fields.exchange_rate.rate.input.value;
        values.exchange_rate.provider = fields.exchange_rate.provider.input.value;
        values.exchange_rate.created = fields.exchange_rate.created.input.value;

        // FIXME
        // function run(fields){
        //     map(fields, (field, i) => {
        //         if (has(field, 'input.value')) {
        //             values[i] = field.input.value;
        //         }else{
        //             run(field);
        //         }
        //     });
        // }
        // run(fields);

        return values;
    }

    fetchAmount(){
        const { fields } = this;

        const {
            currency,
            amount,
            custom_exchange_rate,
            exchange_rate_id,
        } = this.fieldsValues;

        const data = {
            currency,
            amount: amount || 0,
            custom_exchange_rate,
            exchange_rate_id,
        }

        return api.post('/amounts/preview', data)
        .then(response => {
            const amount = {
                exchange_rate: {
                    currency_from: null,
                    currency_to: null,
                    provider: null,
                    created: null,
                    rate: null,
                },
                ...response.amount
            };

            fields.currency.input.onChange(amount.currency);
            fields.converted_amount.input.onChange(amount.converted_amount);
            fields.currency_converted_amount.input.onChange(amount.currency_converted_amount);
            fields.custom_exchange_rate.input.onChange(amount.custom_exchange_rate);

            if (amount.exchange_rate) {
                fields.exchange_rate.currency_from.input.onChange(amount.exchange_rate.currency_from);
                fields.exchange_rate.currency_to.input.onChange(amount.exchange_rate.currency_to);
                fields.exchange_rate.rate.input.onChange(amount.exchange_rate.rate);
                fields.exchange_rate.provider.input.onChange(amount.exchange_rate.provider);
                fields.exchange_rate.created.input.onChange(amount.exchange_rate.created);
            }

            // function run(fields, amount){
            //     var hey = map(amount, (value, key) => {
            //         if (fields[key]) {
            //             if (fields[key].input && fields[key].input.onChange) {
            //                 fields[key].input.onChange(value);
            //             }else{
            //                 run(fields[key], fields[key]);
            //             }
            //         }
            //     });
            // }
            // run(response.amount);
        })
    }

    get fields(){
        const { name } = this.props;
        return get(this.props, name);
    }


    get currencyOptions(){
        return map(currencySymbolMap, (item, i) => {
            return { value: i, label: i }
        });
    }

    renderLabel(){
        const { label, name } = this.props
        if (label) {
            return <label htmlFor={name + '.amount'}>{label}</label>
        }
    }

    renderInput(){
        const { settings, disabled, inputProps, currencyProps } = this.props;
        const { fields } = this;
        const {
            converted_amount,
            currency_converted_amount,
        } = this.fieldsValues;

        const currency_base = settings['currency.base'];
        const convertedMoney = accounting.format(converted_amount, 2);

        return(
            <div className={styles.currency}>
                <div className={styles.panelInput}>
                    <Select {...fields.currency} options={this.currencyOptions} defaultValue={currency_base} className={styles.currency__select} placeholder='AAA' searchable />
                    <Input {...fields.amount} type='currency' className={styles.currency__input} disabled={disabled} {...inputProps} />
                </div>
                <div className={styles.panelToggle}>
                    <div className={styles.currency__icon} onClick={this.onPanelToggle}><Icon name='shapes-currency-rates' /></div>
                    <div className={styles.currency__converted} onClick={this.onPanelToggle}>{(currency_converted_amount || currency_base) + ' ' + convertedMoney}</div>
                </div>
            </div>
        );
    }

    renderPopup(){
        const { disabled } = this.props;
        const { fields } = this;
        const {
            exchange_rate,
            custom_exchange_rate,
        } = this.fieldsValues;

        return (
            <div className={styles.currencyPopup}>
                <Row>
                    <Column flex='1'>
                        <Row vertical>
                            <Paragraph muted style={{ marginBottom: '4px' }}>{__('Exchange Rate')}</Paragraph>
                            {exchange_rate.provider ? (
                                <Row>
                                    <Paragraph variant='small' style={{ marginRight: '10px' }}>{String(exchange_rate.provider)}</Paragraph>
                                    <Paragraph variant='small' style={{ marginRight: '10px' }}>{date(exchange_rate.created).getDate()}</Paragraph>
                                    <Paragraph variant='small'>{exchange_rate.rate}</Paragraph>
                                </Row>
                            ) : (
                                Number(custom_exchange_rate) !== 0 ? (
                                    <Paragraph variant='small'>{__('Using custom exchange rate')}</Paragraph>
                                ) : (
                                    <Paragraph muted>{__('Not found')}</Paragraph>
                                )
                            )}
                        </Row>
                    </Column>
                    <Column>
                        <Button onClick={this.fetchAmount} variant='basic small'>{__('Update')}</Button>
                    </Column>
                </Row>
                <hr />
                <Row vertical>
                    <Paragraph variant='muted margin-bottom'>{__('Custom Exchange Rate')}</Paragraph>
                    <Input {...fields.custom_exchange_rate} type='currency' precision="3" disabled={disabled} />
                </Row>
            </div>
        );
    }

    render(){
        const { className, style } = this.props;
        const { isOpen } = this.state;

        const containerClasses = classnames(styles.container, className);
        const wrapClasses = classnames(styles.wrap, {
            [styles.isOpen]: isOpen
        });

        return (
            <div className={containerClasses} style={style}>
                {this.renderLabel()}
                <div className={wrapClasses}>
                    {this.renderInput()}
                    {this.renderPopup()}
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    settings: state.app.get('settings').toJS(),
});
CurrencyInputRenderer = connect(mapStateToProps)(CurrencyInputRenderer);

class CurrencyInput extends Component{
    static propTypes = {
        name: PropTypes.string.isRequired,
        label: PropTypes.string,
        disabled: PropTypes.bool,
        inputProps: PropTypes.object,
        currencyProps: PropTypes.object,
    }

    static defaultProps = {
        name: null,
        label: null,
        disabled: false,
        inputProps: null,
        currencyProps: null,
        currencyProps: null,
    }

    render(){
        const { name } = this.props;
        return <Fields names={[
                name + '.amount',
                name + '.currency',
                name + '.exchange_rate.currency_from',
                name + '.exchange_rate.currency_to',
                name + '.exchange_rate.rate',
                name + '.exchange_rate.provider',
                name + '.exchange_rate.created',
                name + '.exchange_rate_id',
                name + '.custom_exchange_rate',
                name + '.converted_amount',
                name + '.currency_converted_amount', ]}
                component={CurrencyInputRenderer}
                {...this.props} />
        }
    }

    export default CurrencyInput;
