import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './styles.css';

function Attachment(props){
    let { style, modifiers, variant, ...others } = props;
    const classes = classnames(styles.attachment, ...variant.split(' ').map(i => styles['attachment--' + i]));

    return (
        <span className={classes} style={style} />
    )
}

Attachment.propTypes = {
    variant: PropTypes.string,
    deletable: PropTypes.bool,
};

Attachment.defaultProps = {
    variant: '',
    deletable: false,
};

export default Attachment;
