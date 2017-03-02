import React from 'react';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import reduce from 'lodash/reduce';
import _ from 'lodash';
import List from './List';
import Header  from './Header';
import Body  from './Body';

class Wrapper extends React.Component {

    render() {

        const { items, header, onSort, onRemove, onEdit } = this.props

        return (
            <div className={classnames(['uxlist', this.props.className])} >
                <Header header={header} />
                <Body>
                    <List {...this.props} />
                </Body>
            </div>
        );
    }
}


Wrapper.propTypes = {
    items: React.PropTypes.array.isRequired,
    header: React.PropTypes.array,
    onSort: React.PropTypes.func,
    onEdit: React.PropTypes.func,
    onRemove: React.PropTypes.func,
    onRestore: React.PropTypes.func,
    onPermanetRemove: React.PropTypes.func,
}

export default Wrapper


/*
<div>
<ul>
<li>
<div>
Hey
</div>
<div>
<ul>
<li></li>
</ul>
</div>
</li>
</ul>
</div>

const header = [
{
label: 'Módulo',
key: 'title',
width: '50%'
},
{
label: 'Publicação',
key: 'date'
},
]

const items = [
{
id: '123',
title: 'Módulo 1',
data: '20/05/2016 14:00h',
status: 'publish',
sublist: {
onEdit:
items: [
{
id: '123',
title: 'Módulo 1',
data: '20/05/2016 14:00h',
status: 'publish',
}
]
}
}
]

<List header={header} items={items} onSort={} onEdit={} onRemove={} />
*/
