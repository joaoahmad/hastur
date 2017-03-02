import React from 'react';
import classnames from 'classnames';
import styles from './styles.css';

class Body extends React.Component {
    render() {
        const classes = classnames(styles.body);
        return (
            <div {...this.props} className={classes} >
                {this.props.children}
            </div>
        );
    }
}
module.exports = Body;
