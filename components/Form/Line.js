import React from 'react';
import { line } from './styles/styles.css'

function Line({ children }){
    return <div className={line}>{children}</div>;
}

export default Line;
