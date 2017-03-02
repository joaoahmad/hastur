import React from 'react';
import classnames from 'classnames';
import styles from './styles.css';
import HeaderActions from './HeaderActions';

class Header extends React.Component {

    render() {
        const { children } = this.props;
        const classes = classnames(styles.header, this.props.className);
        return (
            <div className={classes} >
                <h2 className={styles.header__title}>{this.props.title}</h2>
                {children && <HeaderActions>{children}</HeaderActions>}
            </div>
        );
    }
}

export default Header;
