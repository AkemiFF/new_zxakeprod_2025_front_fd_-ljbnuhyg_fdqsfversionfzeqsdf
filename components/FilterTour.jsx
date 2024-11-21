import { FloatLabel } from 'primereact/floatlabel';
import style from './../style/components/FilterTour.module.css';
import { Dropdown } from 'primereact/dropdown';
import { useEffect, useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { useRouter } from 'next/router';
export default function FilterTour(props) {
    const router = useRouter();
    const [operatorTourSelected,setOperatorTourSelected]=useState();
    let operator=[
        {
            name:"Cotisse"
        },
        {
            name:"Z-trip"
        }
    ]

    const [locationSelected,setLocationSelected] = useState(null);
    const [location,setLocation] = useState([]);
    const getAllLocation = () =>{
        fetch("/api/region/getAll")
        .then(res=>res.json())
        .then(data=>setLocation(data))
        .catch(error=>console.log(error));
    }

    const [periode,setPeriode]=useState(null);

    const search = () =>{
        router.push("/users/tour/filter")
    }

    useEffect(()=>{
        getAllLocation();
    },[])



    return(
        <div className={style.container}>
            <FloatLabel>
            <Dropdown 
                    pt={{
                        trigger: { className: style.dropdown_trigger }
                    }}
                    className={style.dropdown}
                    id='operator-select' 
                    value={operatorTourSelected} 
                    onChange={(e)=>setOperatorTourSelected(e.value)}
                    options={operator}
                    optionLabel={"name"}
                />
                <label className={style.dropdown_label} htmlFor='operator-select'>
                    <i className='pi pi-map-marker'/>
                    Operator tour
                </label>
            </FloatLabel>
            <FloatLabel>
                <Dropdown 
                    pt={{
                        trigger: { className: style.dropdown_trigger }
                    }}
                    className={style.dropdown}
                    id='location-select' 
                    value={locationSelected} 
                    onChange={(e)=>setLocationSelected(e.value)}
                    options={location}
                    optionLabel={"nom"}
                />
                <label className={style.dropdown_label} htmlFor='location-select'>
                    <i className='pi pi-map-marker'/>
                    Destination
                </label>
            </FloatLabel>
            <FloatLabel>
                <Calendar 
                    value={periode}
                    onChange={(e)=>{setPeriode(e.value);}}
                    id='periode'
                    inputClassName={style.calendar}
                    className={style.calendar}
                    selectionMode="range"
                    showButtonBar
                />
                <label className={style.dropdown_label} htmlFor='periode'>
                    <i className='pi pi-calendar-times'/>
                    Periode
                </label>
            </FloatLabel>
            <Button onClick={search} icon="pi pi-search" label='Search' className='button-primary'/>
        </div>
    )
}