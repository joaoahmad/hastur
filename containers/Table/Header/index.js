import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';
import map from 'lodash/map';

import { Icon, Heading, Button, Row } from '../../../components/Common';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import Select from '../../../components/UXSelect';
import { __ } from '../../../helpers/locale';
import { buildQuery } from '../../../actions/uxtable';
import Filter from './Filter';
import styles from './styles.css';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.onFilterChange = this.onFilterChange.bind(this);
    }

    onFilterChange(key, value){
        const { dispatch } = this.props;
        return dispatch(buildQuery({ [key]: value }));
    }

    renderFilters(){
        if (!this.props.filters)
        return null;

        const { filters, filterRenderer, filters: { view, sort, ...rest }, query } = this.props;
        const { onFilterChange } = this;
        const rendered = [];

        if (!isEmpty(rest)) {
            map(rest, (item, key) => rendered.push(<Filter key={uniqueId()} name={key} options={item.options}  onChange={onFilterChange} />));
        }
        if (view) {
            rendered.push(<Filter key={uniqueId()} name='view' value={query.view} options={view.options} onChange={onFilterChange} />);
        }
        if (sort) {
            rendered.push(<Filter key={uniqueId()} name='sort' value={query.sort} options={sort.options} onChange={onFilterChange} />);
        }

        return rendered;
    }

    render(){
        const { query, searchPlaceholder, newLabelText, filters, title, onSearch, tabs, onNew, data } = this.props;
        const fetching = this.isFetching;

        return (
            <div styleName='header'>
                <div styleName='bottom'>
                    <div styleName='search'>
                        <input type='search' placeholder={searchPlaceholder} value={query.q} onChange={onSearch} styleName='searchInput' />
                        <Icon name='feather-search' size='16' styleName='searchIcon'/>
                    </div>
                    <div styleName='bottom__right'>
                        {this.renderFilters()}
                    </div>
                </div>
            </div>
        );
    }
}

Header.propTypes = {
    searchPlaceholder:  PropTypes.string,
    newLabelText:  PropTypes.string,
    onSearch:  PropTypes.func,
    data:  PropTypes.array,
    filters: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool,
    ]),
}

Header.defaultProps = {
    title: null,
    onNew: null,
    searchPlaceholder: __('Search') + ' ...',
    newLabelText: __('New'),
    filters: {
        view: {
            label: __('View'),
            options: [
                { value: 'all', label: __('All') },
                { value: 'deleted', label: __('Deleted') },
            ]
        },
        sort: {
            label: __('Sort'),
            options: [
                { value: 'created', label: __('Recent') },
            ]
        },
    }
}


const mapStateToProps = state => state.uxtable.toJS();
export default connect(mapStateToProps)(CSSModules(Header, styles, { allowMultiple: true, errorWhenNotFound: false }));
