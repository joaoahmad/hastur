import React from 'react';
import classnames from 'classnames';
import reduce from 'lodash/reduce';
import omit from 'lodash/omit';
import List from './List';

class Item extends React.Component {

    constructor(props){
        super(props)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleToggleSubList = this.handleToggleSubList.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.state = { showSublist: false }
    }

    // handle(action){
    //     const { data } = this.props
    //     console.log(data);
    //     data => this.props['on' + action](data)
    // }

    handleAdd(){
        const { data: { id, sublist: { add: { callback } } } } = this.props
        return callback(id);
    }

    handleEdit(){
        const { data, onEdit } = this.props
        return onEdit(data);
    }

    handleRemove(){
        const { data, onRemove } = this.props
        return onRemove(data);
    }

    handleSort(){
        const { data, onSort } = this.props
        return onSort(data);
    }

    handleToggleSubList(){
        const { showSublist } = this.state
        this.setState({ showSublist: !showSublist})
    }


    // get item fields by header keys
    get getFields(){
        const { data, header } = this.props
        return reduce( header, (fields, item, i) => {

            // key can be object or string
            const key = (typeof item === 'object') ? item.key : (typeof item === 'string') ? item : null;

            if(key)
            fields.push(<div key={i} className={`uxlist__item__field uxlist__item__field__${key}`}>{data[key]}</div>)

            return fields;
        }, []);

    }

    get getActions(){
        const { hasSubList, props: { onEdit, onRemove } } = this

        if(onEdit || onRemove){
            return (
                <div className="uxlist__item__field uxlist__item__actions">
                    <div className="action-icons">
                        {onEdit ? <span onClick={this.handleEdit} className="action-icons__item">Editar</span> : null}
                        {onRemove ? <span onClick={this.handleRemove} className="action-icons__item"><i className="feather-trash"></i></span> : null}
                    </div>
                    {hasSubList ? <span className="uxlist__item__sublist-toggle" onClick={this.handleToggleSubList}><i className="feather-arrow-down"></i></span> : null}
                </div>
            )
        }
    }

    get getSubList(){
        const { hasSubList, props: { data: { sublist } } } = this

        if(hasSubList){

            const sublistProps = omit(sublist, ['add'])

            return (
                <div className='uxlist__sublist__wrap' ref={(c) => this.__sublist__wrap = c}>
                    <div  className='uxlist__sublist' ref={(c) => this.__sublist = c}>
                        <List {...sublistProps} />
                        {sublist.add ? <a onClick={this.handleAdd} role='button' className="uxlist__item__add-button">{sublist.add.label}</a> : null }
                    </div>
                </div>
            )
        }
        return null
    }

    get hasSubList(){
        return typeof this.props.data.sublist !== 'undefined';
    }

    calcSubListHeight(){
        const {
            state: { showSublist },
            hasSubList,
            __sublist,
            __sublist__wrap
         } = this

        if(__sublist__wrap){
            if(showSublist){
                // console.log('update....', __sublist.clientHeight, __sublist.innerHTML);
                __sublist__wrap.style.maxHeight = __sublist.clientHeight + 'px'
            }else{
                __sublist__wrap.style.maxHeight = ''
            }
        }
    }

    componentDidUpdate(){
        this.calcSubListHeight();
    }

    render() {
        const {
            props: { data, header },
            state: { showSublist },
            hasSubList,
         } = this

        const classes = classnames('uxlist__item__wrap', {
            'uxlist__item__wrap--open': showSublist,
            'uxlist__item__wrap--has-sublist': hasSubList,
        })

        // fdp ta renderizando 3x no setState...

        return (
            <div className={classes} onSort={this.handleSort}>
                <div className="uxlist__item">
                    {this.getFields}
                    {this.getActions}
                </div>
                {this.getSubList}
            </div>
        );
    }
}

Item.propTypes = {
    data: React.PropTypes.object.isRequired,
    onSort: React.PropTypes.func,
    onEdit: React.PropTypes.func,
    onRemove: React.PropTypes.func,
    onRestore: React.PropTypes.func,
    onPermanetRemove: React.PropTypes.func,
}

export default Item
