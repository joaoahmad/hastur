import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import omit from 'lodash/omit'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { EE } from './emitter';
import Modal from './Modal';
import * as actions from './redux';
import styles from './Modal/styles.css';

class Portal extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
        EE.on('add/modal', obj => this.props.addModal(obj));
        EE.on('clear/all', this.props.clearAll);
    }

    componentWillUnmount() {
        EE.off('add/modal');
        EE.off('clear/all');
    }

    render(){
        const { component, options } = this.props
        const transitionClasses = {
            enter: styles['modalTransition-enter'],
            enterActive: styles['modalTransition-enter-active'],
            leave: styles['modalTransition-leave'],
            leaveActive: styles['modalTransition-leave-active'],
        }
        return (
            <div>
                <ReactCSSTransitionGroup transitionName={transitionClasses} transitionEnterTimeout={500} transitionLeave={false}>
                    {this.props.modals.map((modal, i) => {
                        const { id, component, options } = modal
                        return (
                            <Modal
                                index={i}
                                key={id}
                                id={id}
                                removeModal={this.props.removeModal} {...options}>
                                {component}
                            </Modal>
                        );
                    })}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

Portal.propTypes = {
    modals: PropTypes.array
}

export default connect(state => ({ modals: state.modals.modals }), actions)(Portal)
