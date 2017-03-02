import React from 'react';
import classnames from 'classnames';
import omit from 'lodash/omit';
import Item from './Item';
// import AddItem from './AddItem';
import Sortable from 'react-sortablejs'

class List extends React.Component {

    // constructor(props){
    //     super(props)
    //     this.handleAdd = this.handleAdd.bind(this)
    // }
    //
    // handleAdd(){
    //     const { data, add: { callback } } = this.props
    //     return callback(data);
    // }

    render() {

        const { items, add } = this.props
        const itemProps = omit(this.props, ['items'])
        const mappedItems = items.map( (item, i) => <Item key={i} data={item} {...itemProps} />)

        let classes = {}
        classes[`uxlist__list--${this.props.type}`] = (this.props.type) ? true : false
        classes = classnames('uxlist__list', classes);

        return (
            <div className={classes} >
                {mappedItems}
                {add ? <a onClick={add.callback} role='button' className="uxlist__item__add-button">{add.label}</a> : null }
            </div>
        );
    }
}

List.propTypes = {
    items: React.PropTypes.array.isRequired,
    add: React.PropTypes.object,
    onSort: React.PropTypes.func,
    onEdit: React.PropTypes.func,
    onRemove: React.PropTypes.func,
    onRestore: React.PropTypes.func,
    onPermanetRemove: React.PropTypes.func,
}

export default List
