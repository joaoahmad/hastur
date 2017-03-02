/**
 *
 *
 */

import React, {PropTypes} from 'react'
import mask from './mask.js'
import "babel-polyfill";


const CurrencyInput = React.createClass({


    /**
     * Prop validation.  See:  https://facebook.github.io/react/docs/component-specs.html#proptypes
     */
    propTypes: {
        onChange: PropTypes.func,
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        decimalSeparator: PropTypes.string,
        thousandSeparator: PropTypes.string,
        precision: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    },


    /**
     * Component lifecycle function.  See:  https://facebook.github.io/react/docs/component-specs.html#getdefaultprops
     *
     * Invoked once and cached when the class is created. Values in the mapping will be set on this.props if that
     * prop is not specified by the parent component
     *
     * @returns {{onChange: onChange, value: string, decimalSeparator: string, thousandSeparator: string, precision: number}}
     */
    getDefaultProps(){
        return {
            onChange: function(maskValue){/*no-op*/},
            value: "0",
            decimalSeparator: ".",
            thousandSeparator: ",",
            precision: "2"
        }
    },


    /**
     * Component lifecycle function.  See:  https://facebook.github.io/react/docs/component-specs.html#getinitialstate
     *
     * Invoked once before the component is mounted. The return value will be used as the initial value of this.state
     *
     * @returns {{maskedValue, customProps: *}}
     */
    getInitialState(){
        let customProps = Object.assign({}, this.props);  //polyfilled for environments that do not support it.
        delete customProps.onChange;
        delete customProps.value;
        delete customProps.decimalSeparator;
        delete customProps.thousandSeparator;
        delete customProps.precision;
        return {
            maskedValue: mask(this.props.value, this.props.precision, this.props.decimalSeparator, this.props.thousandSeparator),
            customProps: customProps
        }
    },


    /**
     * Component lifecycle function.  See:  https://facebook.github.io/react/docs/component-specs.html#updating-componentwillreceiveprops
     *
     * Invoked when a component is receiving new props. This method is not called for the initial render.
     *
     * @param nextProps
     */
    componentWillReceiveProps(nextProps){
        let customProps = Object.assign({}, nextProps);  //polyfilled for environments that do not support it.
        delete customProps.onChange;
        delete customProps.value;
        delete customProps.decimalSeparator;
        delete customProps.thousandSeparator;
        delete customProps.precision;
        this.setState({
            maskedValue: mask(nextProps.value, nextProps.precision, nextProps.decimalSeparator, nextProps.thousandSeparator),
            customProps: customProps
        });
    },


    /**
     * Exposes the current masked value.
     *
     * @returns {*}
     */
    getMaskedValue(){
        return this.state.maskedValue;
    },


    /**
     * onChange Event Handler
     * @param event
     */
    handleChange(event){
        event.preventDefault();
        let maskedValue = mask(event.target.value, this.props.precision, this.props.decimalSeparator, this.props.thousandSeparator);
        this.setState({maskedValue: maskedValue});
        this.props.onChange(maskedValue);
    },


    /**
     * Component lifecycle function.  See:  https://facebook.github.io/react/docs/component-specs.html#render
     * @returns {XML}
     */
    render() {
        return (
            <input
                type="text"
                value={this.state.maskedValue}
                onChange={this.handleChange}
                {...this.state.customProps}
            />
        )
    }
});


export default CurrencyInput
