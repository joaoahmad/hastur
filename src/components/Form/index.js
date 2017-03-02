import React from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';

import Input from './Input';
import Textarea from './Textarea';
import Submit from './Submit';
import Switch from './Switch';
import Row from './Row';
import Column from './Column';
import Label from './Label';
import Line from './Line';
import Wizard from './Wizard';
import CurrencyInput from './CurrencyInput';
import TimezoneInput from './TimezoneInput';
import Toggle from './Toggle';
import FormFooter from './FormFooter';

class Form extends React.Component {
    attachNode(node) {
        this._form = node;
    }
    render() {
        return (
            <form ref={this.attachNode.bind(this)} {...this.props} role="form">
                {this.props.children}
            </form>
        );
    }
}

export { Input, Textarea, Submit, Switch, Row, Column, Label, Line, Wizard, CurrencyInput, TimezoneInput, FormFooter, Toggle }
export default Form;
