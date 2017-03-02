import React from 'react';
import { Link } from 'react-router';
import styles from './styles.css';

function Content({ children }){
    return (
        <div className={styles.content}>
            {children}
        </div>
    );
}
export default Content;
