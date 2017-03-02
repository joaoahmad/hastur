import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import _styles from './styles.css';

import Actions from './Actions';
import Content from './Content';
import Picture from './Picture';
import Column from './Column';

class Item extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        const { styles } = this.props
        const classes = classnames(_styles.item, ...styles.map(i => _styles['item--' + i]));
        return (
            <div className={classes}>
                {this.props.children}
            </div>
        );
    }

}

Item.propTypes = {
    styles: PropTypes.array,
};

Item.defaultProps = {
    styles: [],
};


Item.Actions = Actions;
Item.Content = Content;
Item.Picture = Picture;
Item.Column = Column;

export default Item;
