import { ProgressBar } from 'primereact/progressbar';
import style from './../../style/components/rating/NoteBar.module.css';
export default function NoteBar(props) {

    const getNote =(note,noteMax=100)=>{
        return (note*100)/noteMax;
    }

    return(
        <div className={style.container}>
            <div className={style.container_label}>
                <span className={style.title}>{props.label}</span>
                <span className={style.note}>{props.value}</span>
            </div>
            <ProgressBar 
                pt={{
                    label:()=>({
                        style:{
                            "display":"none"
                        }
                    }),
                    value:()=>({
                        style:{
                            "background-color":"#305555"
                        }
                    })
                }}
                value={getNote(props.value,props.valueMax)} 
                className={style.bar}
            />
        </div>
    );
}