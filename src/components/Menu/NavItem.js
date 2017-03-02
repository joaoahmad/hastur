import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link, IndexLink } from 'react-router';
import activeComponent from 'react-router-active-component';
import { __ } from 'i18n';

var Item = activeComponent('li');

class NavItem extends Component {

	static propTypes = {
		to: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
	}

	static defaultProps = {
		to: null,
		label: null
	}

	render() {
		const { className, to, label, ...others } = this.props;
		return (
			<Item to={to} {...others}>
				{__(label)}
			</Item>
		)
	}

}

export default NavItem;
