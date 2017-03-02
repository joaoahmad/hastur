import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import omit from 'lodash/omit';
import Header from './Header';
import Body from './Body';
import styles from './styles.css';

class Panel extends Component{

    static propTypes = {
        type: PropTypes.string,
        focus: PropTypes.bool,
        // autoRemoveFocus: PropTypes.bool
    }

    static defaultProps = {
        type: null,
        focus: false,
        // autoRemoveFocus: true
    }

    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = { focus: false };
        this.timeout = null;
    }

    componentDidMount(){
        this.setState({ focus: this.props.focus });
    }

    componentWillReceiveProps(nextProps){
        const { focus, autoRemoveFocus } = nextProps;
        if (focus !== this.state.focus) {
            this.setState({ focus });

            // if (this.focusTimeout) {
            // clearTimeout(this.focusTimeout);
            // }
            // if (focus && autoRemoveFocus) {
            //     this.focusTimeout = setTimeout(() => {
            //         this.setState({ focus: false });
            //     }, 5000);
            // }
        }
    }

    // componentWillUnmount(){
    //     clearTimeout(this.focusTimeout);
    // }

    onClick(e){
        if (this.state.focus) {
            this.setState({ focus: false });
        }
    }

    render(){
        const { children, type, focus, autoRemoveFocus, ...others } = this.props;

        const classes = classnames(styles.panel, {
            [styles['panel-type-' + type]]: !!type,
            [styles.focus]: this.state.focus
        });

        return (
            <div {...others} onClick={this.onClick} className={classes}>
                {children}
            </div>
        );
    }
}

export { Header, Body }
export default Panel
