import React, { PropTypes } from 'react';
import { Icon } from '../Common';
import Select from './index';
import styles from './styles.css';

function Minimal(props){
    const selectProps = {
        ...props,
        searchable: false,
        clearable: false,
        multi: false,
        arrowRenderer: () => (<Icon name='entypo-chevron-small-down' />),
        className: styles['select-minimal'],
        value: props.value || props.options[0].value,
    }
    return <Select {...selectProps} />
}

export default Minimal;
