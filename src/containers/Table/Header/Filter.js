import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';
import map from 'lodash/map';

import { Icon, Heading, Button, Row } from '../../../components/Common';
import Select from '../../../components/UXSelect';
import { __ } from '../../../helpers/locale';
import { buildQuery } from '../../../actions/uxtable';
import styles from './styles.css';

class Filter extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(value){
        const { name, onChange } = this.props;
        return onChange(name, value);
    }

    render(){
        const { options, value } = this.props;

        return (
            <div styleName='filter'>
                <Select.Minimal value={value} options={options} onChange={this.onChange} />
            </div>
        );
    }

}

Filter.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
}

export default CSSModules(Filter, styles, { allowMultiple: true, errorWhenNotFound: false });
