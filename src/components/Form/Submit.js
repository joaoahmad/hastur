import React, { PropTypes } from 'react';
import classnames from 'classnames';
import omit from 'lodash/omit';
import Button, { styles } from '../Common/Button';

function Submit(props){
    const { submitting, disabled, children, ...others } = props;
    var classes = classnames(styles.submit, {
        [styles.disabled]: disabled || submitting,
        [styles.submitting]: submitting,
    });

    return (
        <Button htmlType="submit" {...others} loading={submitting} disabled={submitting || disabled} loading={submitting}>
            {children}
        </Button>
    );
}

Submit.propTypes = {
    styles: PropTypes.array,
    submitting: PropTypes.bool,
    disabled: PropTypes.bool,
};

Submit.defaultProps = {
    styles: ['primary'],
};

export default Submit
