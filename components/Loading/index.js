import React, { PropTypes } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import { NotFoundException } from 'components/Exception';

function Loading({ isFetching, err, children }){
    var classes = classnames('loading', 'loading-spin');

    if (isFetching) {
        return (
            <div style={{textAlign: 'center',margin: '20px 0'}} className="loading-wrapper">
                <div className={classes}></div>
            </div>
        );
    }

    if (err) {
        console.error('Loading Error', err);
        if (err.code == 404) {
            return <NotFoundException icon={false} error={err.message} />
        }
    }

    return (
        <div style={{flex: 1}}>
            {children}
        </div>
    );
}

Loading.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    err: PropTypes.any
}

Loading.defaultProps = {
    isFetching: false,
    err: null
}

export default Loading;
