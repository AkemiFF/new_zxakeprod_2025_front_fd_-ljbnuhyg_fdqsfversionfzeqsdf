
import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import style from '@/style/pages/users/spinner.module.css';

export default function WaitSpinner(props) {
    return (
        props.visible ? (
            <div className={style.container}>
                <div className={style.couverture}></div>
                <ProgressSpinner
                    style={{ width: '150px', height: '150px' }}
                    className={style.spinner}
                    // strokeWidth="8"
                    fill="var(--surface-ground)"
                    animationDuration="1s"
                />
            </div>
        ) : null
    );

}
