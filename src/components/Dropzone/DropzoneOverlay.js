import React, { PropTypes } from 'react';
import Icon from '../Common/Icon';
import styles from './styles.css';

function DropzoneOverlay({ uploadLabel, ...others }){
    return (
        <div {...others} className={styles.dropzoneOverlay}>
            <Icon name='vi-upload' className={styles.uploadIcon} />
            {uploadLabel && <p className={styles.uploadLabel}>{uploadLabel}</p>}
        </div>
    )
}

DropzoneOverlay.propTypes = {
    uploadLabel: PropTypes.string,
};

DropzoneOverlay.defaultProps = {
    uploadLabel: 'Drop to upload your files',
};

export default DropzoneOverlay;
