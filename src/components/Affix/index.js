import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import offset from 'document-offset';
import styles from './styles.css';

function hasScrollbar(node) {
    if (node === null) {
        return null;
    }
    if (node.scrollHeight > node.clientHeight) {
        return node.parentNode;
    }else{
        return hasScrollbar(node.parentNode);
    }
}

class Affix extends Component {

    static propTypes = {
        variant: PropTypes.string,
        offsetTop: PropTypes.number,
        offsetBottom: PropTypes.number,
        onChange: PropTypes.func,
    }

    static defaultProps = {
        variant: '',
        offsetTop: 0,
        offsetBottom: null,
        onChange: null,
    }

    constructor(props){
        super(props);
        this.state = {
            affix: false,
            affixAt: null
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.scroller = null;
    }

    componentDidMount() {
        this.node = findDOMNode(this);
        this.scroller = hasScrollbar(this.node);

        this.node.offset = offset(this.node);
        this.scroller.offset = offset(this.scroller);

        window.node = this.node;
        window.scroller = this.scroller;
        console.log('hey');

        this.scroller.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        this.scroller.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        const { affix } = this.state;
        const { offsetTop, offsetBottom } = this.props;
        const { scrollTop } = this.scroller;
        const offset = offsetBottom || offsetTop;

        const mode = offsetBottom ? 'bottom' : 'top';

        const scrollerInfos = this.scroller.getBoundingClientRect();
        const nodeInfos = this.node.getBoundingClientRect();

        const affixAt = this.node.offset.top;
        console.log(
            scrollTop,
            this.refs.placeholder.getBoundingClientRect().top,
            this.refs.children.getBoundingClientRect().top
        );



        // if (offsetBottom) {
        //     // affixBottom();
        // }else{
        //     // affixTop();
        // }
        //
        // console.log('scroll', scrollTop, offset);

        // if (!affix && scrollTop >= offset) {
        //     this.setState({
        //         affix: true
        //     });
        // }
        //
        // if (affix && scrollTop < offset) {
        //     this.setState({
        //         affix: false
        //     });
        // }
    }

    getXOffset() {
        return this.refs.getBoundingClientRect().left;
    }

    getWidth() {
        return this.refs.placeholder.getBoundingClientRect().width;
    }

    getHeight() {
        return findDOMNode(this.refs.children).getBoundingClientRect().height;
    }

    getDistanceFromTop() {
        return this.refs.placeholder.getBoundingClientRect().top;
    }

    getDistanceFromBottom() {
        if (!this.containerNode) return 0;
        return this.containerNode.getBoundingClientRect().bottom;
    }

    render() {
        const { className, variant, offsetTop, offsetBottom, ...others } = this.props;
        const { affix } = this.state;
        const classes = classnames(styles.affix, className, {
            'is-fixed': affix
        }, ...variant.split(' ').map(i => styles['affix--' + i]));

        const style = {
            // position: 'absolute',
            // top: this.state.containerOffset,
            // left: this.state.xOffset,
            // width: this.state.width
        }

        return (
            <div ref='placeholder' {...others} className={classes}>
                <div ref='children' className={styles.affixNode} style={style}>
                    {this.props.children}
                </div>
            </div>
        );
    }

}
export default Affix;
