import React, { PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';

function Tooltip(props){
    return (
        <ReactTooltip {...props} />
    )
}

Tooltip.propTypes = {
    place: PropTypes.string,
    effect: PropTypes.string,
}

Tooltip.defaultProps = {
    place: 'top',
    effect: 'solid',
}

export default Tooltip;
