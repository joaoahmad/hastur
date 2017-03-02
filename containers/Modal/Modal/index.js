import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import { Icon    } from '../../Common';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import styles from './styles.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Modal extends Component{

    static propTypes = {
        id: PropTypes.string,
        index: PropTypes.number,
        removeModal: PropTypes.func.isRequired,
        variant: PropTypes.string,
        hideCloseButton: PropTypes.bool,
        onClose: PropTypes.func,
    }

    static defaultProps = {
        id: null,
        index: null,
        variant: '',
        hideCloseButton: false,
        onClose: null,
    };

    constructor(props){
        super(props)
        this.state = { open: null }
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount(){
        this.setState({ open: this.props.open || true });
    }

    handleClose(){
        const { id, removeModal, onClose } = this.props;
        removeModal(id);
        if (onClose)
        onClose(id);
    }

    render(){
        const { className, children, variant, hideCloseButton } = this.props;
        const { open } = this.state;
        const classes = classnames(styles.modal, className, ...variant.split(' ').map(i => styles['modal--' + i]));
        return (
            <div className={classes}>
                <div className={styles.background}></div>
                <div className={styles.modalContentWrap}>
                    {!hideCloseButton && (
                        <a className={styles.closeButton} role="button" ref='closeButton' onClick={this.handleClose}>
                            <Icon name='feather-cross' className={styles.closeIcon} />
                        </a>
                    )}
                    {children}
                </div>
            </div>
        );
    }
}

Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
