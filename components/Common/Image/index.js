import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import omit from 'lodash/omit';
import styles from './styles.css';

function Image(props){
    let { src, size, rounded, circular, style, ...rest } = props;
    let _style = style;

    style = {
        display: 'block',
        backgroundImage: 'linear-gradient(135deg,#9cb4bb,#b39aa5)',
        borderRadius: rounded ? '50%' : null
    }

    if (Array.isArray(size)) {
        style.width = String(size[0]) + 'px';
        style.height = String(size[1]) + 'px';
    }else{
        style.width = String(size) + 'px';
        style.height = String(size) + 'px';
    }

    style = { ...style, ..._style };

    if(typeof src !== 'undefined'){
        style.backgroundImage = 'url(' + src + ')';
    }

    return (
        <div className={styles.image} style={style} {...rest}></div>
    );

}

Image.propTypes = {
    src: PropTypes.string,
    style: PropTypes.object,
    size: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.array,
    ]),
    rounded: PropTypes.bool,
    circular: PropTypes.bool, // TODO: Add circular option and make rounded not circular
}

Image.defaultProps = {
    rounded: false,
    circular: false,
    size: 50
}

export default Image;
