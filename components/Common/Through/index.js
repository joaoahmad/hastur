import React from 'react';

function Through({ children }){
    const style = {
        height: 0,
        overflow: 'visible',
        flex: 1,
    }
    if (!children) {
        return null;
    }
    if (React.isValidElement(children)) {
        return children;
    }
    return (
        <div style={style}>
            {children}
        </div>
    );
}

export default Through;
