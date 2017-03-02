import React, { Component } from 'react';

const withDefaultValue = (WrappedComponent, options) => {
    return class WithDefaultValue extends Component {
        componentDidMount(){
            this.setDefaultProps();
        }
        componentDidUpdate(){
            this.setDefaultProps();
        }

        setDefaultProps(){
            const { input, defaultValue } = this.props;
            if (input && input.value === '' && defaultValue) {
                input.onChange(defaultValue);
            }
        }

        render(){
            const { props } = this;
            if (props.input) {
                const defaultProps = {
                    ...props,
                    input: {
                        ...props.input
                    }
                }
                if (props.input.value === '') {
                    defaultProps.input.value = props.defaultValue || props.defaultChecked || props.input.value;
                }
                return <WrappedComponent { ...defaultProps } />;
            }else{
                return <WrappedComponent { ...props } />;
            }
        }
    }
}

export { withDefaultValue };
