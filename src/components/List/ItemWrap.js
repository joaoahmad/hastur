import React from 'react';
import Sortable from 'react-sortablejs';


class ItemWrap extends React.Component {

    render() {

        const { items } = this.props
        const itemProps = omit(this.props, ['items'])
        const mappedItems = items.map( (item, i) => <Item key={i} data={item} {...itemProps} />)

        return (
            <div className="uxlist__list">
                {mappedItems}
            </div>
        );
    }
}

List.propTypes = {
    items: React.PropTypes.array.isRequired,
    onSort: React.PropTypes.func,
    onEdit: React.PropTypes.func,
    onRemove: React.PropTypes.func,
    onRestore: React.PropTypes.func,
    onPermanetRemove: React.PropTypes.func,
}

export default ItemWrap
