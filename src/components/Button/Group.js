import React, { Component, PropTypes, Children, cloneElement } from 'react';
import classnames from 'classnames';
import styles from './styles.css';

class Group extends React.Component {

    static propTypes = {
        variant: PropTypes.string,
    }

    static defaultProps = {
        variant: ''
    }

    render() {
        const { variant } = this.props;
        const classes = classnames(styles.buttonGroup, ...variant.split(' ').map(i => styles['buttonGroup--' + i]));
        return (
            <div className={classes}>
                {this.props.children}
            </div>
        )
    }
}

export default Group;
