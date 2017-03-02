import React from 'react';
import classnames from 'classnames';

class Switch extends React.Component {

    constructor() {
        super();
        this.toggle = this.toggle.bind(this);
        this.getValueLink = this.getValueLink.bind(this);
    }

    getValueLink(props) {
        return props.valueLink || {
            value: props.value,
            requestChange: props.onChange
        };
    }

    componentWillMount() {
        var valueLink = this.getValueLink(this.props);
        this.setState({on: valueLink.value});
    }

    componentWillReceiveProps(nextProps) {
        var valueLink = this.getValueLink(nextProps);
        this.setState({on: valueLink.value});
    }

    toggle(e) {
        var on = !this.state.on;
        this.setState({on: on});
        var valueLink = this.getValueLink(this.props);
        valueLink.requestChange && valueLink.requestChange(on);
    }

    isActive() {
        return this.state.on;
    }

    render() {

        var active = this.isActive();
        var classes = classnames('uxswitch', this.props.className, {
            'active': active,
        });

        return (
            <div onClick={this.toggle} className={classes}>{this.props.children}</div>
        );
    }
}

module.exports = Switch;
