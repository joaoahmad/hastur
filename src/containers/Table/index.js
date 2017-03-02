import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import pickBy from 'lodash/pickBy';
import { batchActions } from 'redux-batched-actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// TODO: Move this component to container

import { Icon } from '../../components/Common';
import Loading from '../../components/Loading';
import makeCancelable from '../../helpers/makeCancelable';
import { __ } from '../../helpers/locale';

import Header from './Header';
import Body from './Body';
import Item from './Item';

import styles from './styles.css';

import { buildQuery, resetTable } from '../../actions/uxtable';

class Table extends React.Component {

    constructor(props) {
        super(props);

        this.state = { fetching: true };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleBuildQuery = this.handleBuildQuery.bind(this);
        this.handleAction = debounce(this.handleAction.bind(this), 200);
    }

    componentDidMount(){
        const { query } = this.props;
        this.setState({ fetching: true });
        this.handleAction(query);
    }

    componentDidUpdate(prevProps){
        const { query } = this.props;
        if(!isEqual(prevProps.query, query))
        this.handleAction(query);
    }

    componentWillUnmount(){
        // cancel data request
        if(this.actionPromise)
        this.actionPromise.cancel();

        // reset query
        this.props.dispatch(resetTable());
    }

    handleSearch(e){
        this.handleBuildQuery({ q: e.target.value });
    }

    handleBuildQuery(query){
        this.props.dispatch(buildQuery(query));
    }

    handleAction(query){
        const { action, dispatch } = this.props;

        // clean empty values
        query = pickBy(query);

        this.actionPromise = makeCancelable(dispatch(action(query)));
        this.actionPromise.promise.then(() => this.setState({ fetching: false }));
    }

    get isFetching(){
        const { fetching, localFetching } = this.props;
        return (localFetching) ? this.state.fetching : fetching;
    }

    renderBody(){
        const { query, data, itemRenderer, err } = this.props;
        const fetching = this.isFetching;

        if (!err) {
            return(
                <Loading isFetching={fetching}>
                    <ReactCSSTransitionGroup className={styles.transitionGroup} transitionName="uxtable__table-item-transition" transitionEnterTimeout={200} transitionLeaveTimeout={100}>
                        {data.map(itemRenderer)}
                    </ReactCSSTransitionGroup>
                </Loading>
            )
        }else{
            return(
                <div>
                    {err.code}
                    {err.message}
                </div>
            )
        }
    }

    render(){
        const { query, data, itemRenderer, err, header } = this.props;

        return (
            <div className={styles.table}>
                <Header onSearch={this.handleSearch} {...header} data={data} />
                <Body>
                    {this.renderBody()}
                </Body>
            </div>
        );
    }

}

Table.propTypes = {

    // action used to search, filter, order
    action:  PropTypes.func,

    // source table data
    data: PropTypes.array.isRequired,

    // function to render item
    itemRenderer: PropTypes.func.isRequired,

    // state of loading data
    fetching: PropTypes.bool,

    // table state controls fetching
    localFetching: PropTypes.bool,

    // current page
    page:  PropTypes.number,

}

Table.defaultProps = {
    fetching:  true,
    localFetching:  true,
    page: 1
}

const TableItem = Item;
export { TableItem }

const mapStateToProps = state => state.uxtable.toJS();
export default connect(mapStateToProps)(Table)
