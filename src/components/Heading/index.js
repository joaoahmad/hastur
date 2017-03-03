import React, { PropTypes } from 'react';
import classnames from 'classnames';
import omit from 'lodash/omit';
import hStyles from './styles.css';

function Heading(props){
    let { className, type, variant, styles, disabled, muted, ...others } = props;
    variant = variant ? variant.split(' ') : styles;
    const Tag = type;
    const classes = classnames(hStyles[type], {
        [hStyles['muted']]: muted
    },...variant.map(i => hStyles[i]), className);
    return (
        <Tag {...others} className={classes}>{props.children}</Tag>
    );

}

Heading.propTypes = {
    styles: PropTypes.array, // DEPRECATED
    variant: PropTypes.string,
    muted: PropTypes.bool,
    type: PropTypes.string.isRequired,
};

Heading.defaultProps = {
    styles: [], // DEPRECATED
    variant: null,
    muted: false,
    type: 'h2'
};

const styles = hStyles;
export { styles };
export default Heading;
