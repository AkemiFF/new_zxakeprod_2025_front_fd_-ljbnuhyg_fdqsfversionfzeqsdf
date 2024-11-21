import { Rating } from 'primereact/rating';
import style from '@/style/components/Review.module.css';
import { Avatar } from 'primereact/avatar';
import { ScrollPanel } from 'primereact/scrollpanel';
export default function Review(props) {
    
    const getLabelAvatar = (str) =>{
        if (str.length > 0) {
            return str.charAt(0);
        }
        return '';
    }

    return(
        <div className={style.container}>
            <div className={style.head}>
                <b>{props.nom}</b>
                <Rating 
                    value={props.rate} 
                    disabled 
                    cancel={false}
                    pt={{
                        onIcon:()=>({
                            style:{
                                "color":"#FFD700"
                            }
                        })
                    }}
                />
            </div>
            <ScrollPanel style={{ width: '100%', height: '175px' }}>
                <span className={style.review_label}>
                    {props.review}
                </span>
            </ScrollPanel>
            <div className={style.user_container}>
                <Avatar 
                    style={{border:"1px solid #0004"}}
                    image={props.userPhoto ? props.userPhoto : null}
                    label={getLabelAvatar(props.username)} 
                    size="large" 
                    shape="circle" 
                />
                <div className={style.user}>
                    <span className={style.username}>{props.username}</span>
                    <span className={style.position}>
                        <i style={{fontSize:"10px"}} className='pi pi-map-marker'/>
                        {props.localisation}
                    </span>
                </div>
            </div>
        </div>
    )
}