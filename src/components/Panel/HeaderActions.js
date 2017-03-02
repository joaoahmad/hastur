import React from 'react';
import classnames from 'classnames';
import styles from './styles.css';

class HeaderActions extends React.Component {
    render() {
        var classes = classnames(styles.header__actions);

        return (
            <div className={classes} >
                {this.props.children}
            </div>
        );
    }
}
module.exports = HeaderActions;
