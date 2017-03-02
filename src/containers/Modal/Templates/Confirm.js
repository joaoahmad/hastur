import React, { Component, PropTypes } from 'react';
import { __ } from 'i18n';
import modal from 'components/UXModal';
import { Row, Column,  Heading, Icon, Paragraph, Button } from 'components/Common';

class Confirm extends Component{

    static propTypes = {
        icon: PropTypes.node,
        iconProps: PropTypes.object,
        title: PropTypes.node,
        message: PropTypes.node,
        confirmText: PropTypes.string,
        onConfirm: PropTypes.func.isRequired,
        onCancel: PropTypes.func,
    }

    static defaultProps = {
        icon: null,
        iconProps: {
            size: 64
        },
        title: null,
        titleProps: {
            variant: 'no-margin margin-xlarge-top medium center'
        },
        message: null,
        messageProps: {
            variant: 'no-margin margin-large-top muted center'
        },
        confirmText: __('Confirm'),
        cancelText: __('Cancel'),
    }

    onCancel(){
        modal.clear();
    }

    renderIcon(){
        const { icon, iconProps } = this.props;
        if (typeof icon === 'string') {
            return <Icon name={icon} {...iconProps} />
        }
        return icon;
    }

    renderTitle(){
        const { title, titleProps } = this.props;
        if (typeof title === 'string') {
            return <Heading {...titleProps}>{title}</Heading>
        }
        return title;
    }

    renderMessage(){
        const { message, messageProps } = this.props;
        if (typeof message === 'string') {
            return <Paragraph {...messageProps}>{message}</Paragraph>
        }
        return message;
    }

    renderFooter(){
        const { onConfirm, onCancel, confirmText, cancelText } = this.props;
        return (
            <Row variant='margin-top vertical'>
                <Row variant='margin-between justify-center'>
                    {cancelText && <Button onClick={onCancel || this.onCancel}>{cancelText}</Button>}
                    {confirmText &&<Button variant='primary large' onClick={onConfirm}>{confirmText}</Button>}
                </Row>
            </Row>
        )
    }

    render(){
        return (
            <Row variant='vertical align-center'>
                {this.renderIcon()}
                {this.renderTitle()}
                {this.renderMessage()}
                {this.renderFooter()}
            </Row>
        )
    }
}

export default Confirm;
