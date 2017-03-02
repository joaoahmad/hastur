import React from 'react';
import { Link } from 'react-router';
import styles from './styles.css';

function Actions({ children }){
    return (
        <div className={styles.actions}>
            {children}
        </div>
    );
}

export default Actions;
