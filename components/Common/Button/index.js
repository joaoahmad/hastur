import React, { PropTypes } from 'react';
import classnames from 'classnames';
import omit from 'lodash/omit';
import Icon from '../Icon';
import b_styles from './styles.css';
import Group from './Group';

function Button(props){
    let { className, toggle, styles, variant, disabled, loading, type, htmlType, ...others } = props;
    variant = variant ? variant.split(' ') : styles;
    if (!variant || !variant.length) {
        variant = ['basic'];
    }
    const classes = classnames(className, {
        [b_styles.disabled]: disabled,
        [b_styles.toggle]: toggle,

    }, ...variant.map(i => b_styles[i]));

    return (
        <button {...others} disabled={disabled} className={classes} type={htmlType}>
            {loading && <Icon name='feather-loader' className={b_styles.loadingIcon} spinning />}
            {props.children}
        </button>
    );

}

Button.propTypes = {
    styles: PropTypes.array, // DEPRECATED
    variant: PropTypes.string,
    toggle: PropTypes.bool,
    htmlType: PropTypes.string,
    loading: PropTypes.bool,
};

Button.defaultProps = {
    styles: null, // DEPRECATED
    variant: null,
    htmlType: 'button'
};

Button.Group = Group;

const styles = b_styles;
export { styles };
export default Button;
