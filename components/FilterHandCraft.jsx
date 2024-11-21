import { FloatLabel } from 'primereact/floatlabel';
import style from './../style/components/FilterHandcraft.module.css';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Dialog } from 'primereact/dialog';
import UrlConfig from '@/util/config';
export default function FilterHandcraft(props) {

    const router = useRouter();
    const [visible, setVisible] = useState(false);

    const [store, setStore] = useState([]);
    const [storeSelected, setStoreSelected] = useState();

    const [type, setType] = useState([]);
    const [typeSelected, setTypeSelected] = useState();

    const [locationSelected, setLocationSelected] = useState();
    const [location, setLocation] = useState([]);


    const getAllLocation = () => {
        fetch("/api/region/getAll")
            .then(res => res.json())
            .then(data => setLocation(data))
            .catch(error => console.log(error));
    }
    const getAllTypes = () => {
        fetch(`${UrlConfig.apiBaseUrl}/api/artisanat/specifications/`)
            .then(res => res.json())
            .then(data => setType(data.map(item => ({
                id: item.id,
                nom: item.type_specification
            }))))
            .catch(error => console.log(error));
    };

    useEffect(() => {
        getAllLocation();
        getAllTypes();
    }, [])





    const search = () => {
        let url = new URLSearchParams();
        if (storeSelected) {
            url.append("store", storeSelected.nom);
        }
        if (typeSelected) {
            url.append("type", typeSelected.nom);
        }
        if (locationSelected) {
            url.append("location", locationSelected.nom);
        }
        if (url.toString().trim() !== "") {
            router.push("/users/handcraft/filter?" + url.toString());
        }
        else {
            router.push("/users/handcraft/filter");
        }
    }

    return (
        <div className={style.container}>
            <Button onClick={() => setVisible(true)} className={style.button_menu} icon="pi pi-bars" />
            <div className={style.wrapper}>
                <FloatLabel>
                    <Dropdown
                        pt={{
                            trigger: { className: style.dropdown_trigger }
                        }}
                        className={style.dropdown}
                        id='operator-select'
                        value={storeSelected}
                        onChange={(e) => setStoreSelected(e.value)}
                        showClear
                        options={store}
                        optionLabel={"nom"}
                    />
                    <label className={style.dropdown_label} htmlFor='operator-select'>
                        <i className='pi pi-shop' />
                        Handcraft store
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
                        onChange={(e) => setLocationSelected(e.value)}
                        showClear
                        options={location}
                        optionLabel={"nom"}
                    />
                    <label className={style.dropdown_label} htmlFor='location-select'>
                        <i className='pi pi-map-marker' />
                        Location
                    </label>
                </FloatLabel>
                <FloatLabel>
                    <MultiSelect
                        pt={{
                            trigger: { className: style.dropdown_trigger }
                        }}
                        className={style.dropdown}
                        id='type-select-dialog'
                        value={typeSelected}
                        onChange={(e) => setTypeSelected(e.value)}
                        options={type}
                        optionLabel="nom"
                        placeholder="Select types"
                        display="chip"
                    />
                    <label className={style.dropdown_label} htmlFor='periode'>
                        <i className='pi pi-users' />
                        Handcraft type
                    </label>
                </FloatLabel>
                <Button onClick={search} icon="pi pi-search" label='Search' className='button-primary' />
            </div>
            <Dialog visible={visible} onHide={() => setVisible(false)}>
                <div className={style.wrapper_dialochq}>
                    <FloatLabel>
                        <Dropdown
                            pt={{
                                trigger: { className: style.dropdown_trigger }
                            }}
                            className={style.dropdown}
                            id='operator-select'
                            value={storeSelected}
                            onChange={(e) => setStoreSelected(e.value)}
                            showClear
                            options={store}
                            optionLabel={"nom"}
                        />
                        <label className={style.dropdown_label} htmlFor='operator-select'>
                            <i className='pi pi-shop' />
                            Handcraft store
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
                            onChange={(e) => setLocationSelected(e.value)}
                            showClear
                            options={location}
                            optionLabel={"nom"}
                        />
                        <label className={style.dropdown_label} htmlFor='location-select'>
                            <i className='pi pi-map-marker' />
                            Location
                        </label>
                    </FloatLabel>
                    <FloatLabel>
                        <MultiSelect
                            pt={{
                                trigger: { className: style.dropdown_trigger }
                            }}
                            className={style.dropdown}
                            id='type-select-dialog'
                            value={typeSelected}
                            onChange={(e) => setTypeSelected(e.value)}
                            options={type}
                            optionLabel="nom"
                            placeholder="Select types"
                            display="chip"
                        />
                        <label className={style.dropdown_label} htmlFor='periode'>
                            <i className='pi pi-users' />
                            Handcraft type
                        </label>
                    </FloatLabel>
                    <Button onClick={search} icon="pi pi-search" label='Search' className='button-primary' />
                </div>

            </Dialog>
        </div>
    )
}