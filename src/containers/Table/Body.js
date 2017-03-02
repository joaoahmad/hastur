import React from 'react';
import styles from './styles.css';

function Body({ children }){
    return (
        <div className={styles.body}>
            {children}
        </div>
    );
}

export default Body;
