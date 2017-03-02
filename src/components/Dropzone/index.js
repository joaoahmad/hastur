import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import classnames from 'classnames';
import DropzoneOverlay from './DropzoneOverlay';
import styles from './styles.css';

class DropzoneWrap extends Component {
    static propTypes = {
        className: PropTypes.any,
        activeClassName: PropTypes.any,
        overlay: PropTypes.bool,
    }

    static defaultProps = {
        overlay: true,
    }

    render(){
        const { children, overlay, ...others } = this.props;
        const className = classnames(others.className, styles.dropzone);
        const activeClassName = classnames(others.activeClassName, styles.dropzoneActive);
        delete others.className;
        delete others.activeClassName;

        return (
            <Dropzone ref='dropzone' {...others} className={className} activeClassName={activeClassName}>
                {overlay && <DropzoneOverlay />}
                {children}
            </Dropzone>
        )
    }
}

export { DropzoneOverlay };
export default DropzoneWrap;
