import style from './../style/components/ListCheckbox.module.css';
export default function ListCheckbox(props) {
    return(
        <div className={style.container}>
            <span className={style.title}>Product Price</span>
            <div className={style.listCheck}>
                <div className={style.checkbox_container}>
                    <input type='checkbox' className={style.checkbox}/>
                    <span className={style.checkbox_label}>Less than 5$</span>
                </div>
                <div className={style.checkbox_container}>
                    <input type='checkbox' className={style.checkbox}/>
                    <span className={style.checkbox_label}>5 to 10$</span>
                </div>
                <div className={style.checkbox_container}>
                    <input type='checkbox' className={style.checkbox}/>
                    <span className={style.checkbox_label}>15 to 20$</span>
                </div>
                <div className={style.checkbox_container}>
                    <input type='checkbox' className={style.checkbox}/>
                    <span className={style.checkbox_label}>20 to 25$</span>
                </div>
                <div className={style.checkbox_container}>
                    <input type='checkbox' className={style.checkbox}/>
                    <span className={style.checkbox_label}>More than $25</span>
                </div>
            </div>
        </div>
    )
}