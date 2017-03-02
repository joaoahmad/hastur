import React from 'react';
import { Link } from 'react-router';
import styles from './styles.css';

function Column({ children }){
    return (
        <div className="">
            {children}
        </div>
    );
}
export default Column;
