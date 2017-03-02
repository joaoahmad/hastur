import React from 'react';
import { Link } from 'react-router';
import styles from './styles.css';

function Picture({ image, size, rounded, style }){
    style = Object.assign({
        display: 'block',
        width: String(size || 50) + 'px',
        height: String(size || 50) + 'px',
        backgroundImage: 'linear-gradient(135deg,#9cb4bb,#b39aa5)',
        borderRadius: rounded ? '50%' : null
    }, style);

    if(typeof(image) !== 'undefined'){
        style.backgroundImage = 'url(' + image + ')';
    }

    return (
        <div className="uxtable-item-picture">
            <span className="uxtable-item-picture--img" style={style} />
        </div>
    );

}

Picture.propTypes = {
    image: React.PropTypes.string.isRequired,
    style: React.PropTypes.object,
    size: React.PropTypes.any,
    rounded: React.PropTypes.bool,
}

Picture.defaultProps = {
    rounded: false,
}

export default Picture;
