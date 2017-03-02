import React, { Component, PropTypes } from 'react';
import NavItem from './NavItem';
import classnames from 'classnames';
import styles from './styles.css';

class Nav extends Component {

	static propTypes = {
		items: PropTypes.array.isRequired,
		variant: PropTypes.string,
		inline: PropTypes.bool,
	}

	static defaultProps = {
		items: [],
		variant: '',
		inline: false
	}

	renderItem(item, index) {
		return (
			<NavItem {...item} ref={index} key={index}/>
		);
	}
	render() {
		const { items, className, variant, inline } = this.props;
		let classes = classnames(styles.nav, className, {
			[styles['nav--inline']]: inline,
		}, ...variant.split(' ').map(i => styles['nav--' + i]));

		return (
			<ul className={classes}>
                {items.map(this.renderItem)}
            </ul>
		);
	}

}

export default Nav;
