import { Calendar } from 'primereact/calendar';
import style from './../style/components/Filter.module.css';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { useContext, useEffect, useState } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { Dialog } from 'primereact/dialog';
import UrlConfig from '@/util/config';
import LocationContext from '@/layouts/context/locationContext';
export default function Filter(props) {



    const { t } = useTranslation();
    const router = useRouter();
    const [visible, setVisible] = useState(false);

    const [locationSelected, setLocationSelected] = useState(null);
    const [locations, setLocations] = useState([]);

    const { location, setLocation } = useContext(LocationContext);

    const getAllLocation = () => {
        fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/cities/`)
            .then(res => res.json())
            .then(data => setLocations(data))
            .catch(error => console.log(error));
    }

    // const getAllLocation = () => {
    //     fetch("/api/region/getAll")
    //         .then(res => res.json())
    //         .then(data => setLocations(data))
    //         .catch(error => console.log(error));
    // }

    const [typeSelected, setTypeSelected] = useState(null);
    const [types, setTypes] = useState([]);
    // const getAllType = () =>{
    //     fetch("/api/hebergement/getAllType")
    //     .then(res=>res.json())
    //     .then(data=>setTypes(data))
    //     .catch(error=>console.log(error));
    // }
    const getAllType = () => {
        fetch(`${UrlConfig.apiBaseUrl}/api/hebergement/type-hebergement/`)
            .then(res => res.json())
            .then(data => setTypes(data))
            .catch(error => console.log(error));
    }

    const [check, setCheck] = useState();
    const [guest, setGuest] = useState();

    useEffect(() => {
        if (props.typeSelected) {
            types.map((type) => {
                if (type.type_name == props.typeSelected) {
                    setTypeSelected(type);
                }
            })
        }
    }, [props.typeSelected, types])

    useEffect(() => {
        if (props.locationSelected) {
            locations.map((location) => {
                console.log(location);
                if (location == props.locationSelected) {
                    setLocationSelected(location);
                    setLocation(location);

                }
            })
        }
    }, [props.locationSelected, locations, setLocation])

    useEffect(() => {
        if (props.check_in && props.check_out) {

        }
    }, [props.check_in, props.check_out, check])

    useEffect(() => {
        if (props.guest) {
            setGuest(props.guest);
        }
    }, [props.guest, guest])

    useEffect(() => {
        getAllLocation();
        getAllType();
    }, [])


    const search = () => {
        let location = locationSelected;
        let urlFilter = new URLSearchParams();
        if (typeSelected) {
            urlFilter.append("type", typeSelected.type_name);
        }
        if (location) {
            urlFilter.append("location", location);
        }
        if (check && check.length == 2) {
            let check_in = new Date(check[0]);
            let check_out = new Date(check[1]);
            urlFilter.append("check_in", check_in.toLocaleDateString());
            urlFilter.append("check_out", check_out.toLocaleDateString());
        }
        if (guest) {
            urlFilter.append("guest", guest);
        }
        if (urlFilter.toString().trim() !== "") {
            router.push("/users/accommodation/filter?" + urlFilter.toString());
        }
        else {
            router.push("/users/accommodation/filter");
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
                        className={style.dropdown_large}
                        id='type-select'
                        value={typeSelected}
                        onChange={(e) => setTypeSelected(e.value)}
                        showClear
                        options={types}
                        optionLabel={"type_name"}
                    />
                    <label className={style.dropdown_label} htmlFor='type-select'>
                        <i className='pi pi-map-marker' />
                        Type {t("accommodation")}
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
                        onChange={(e) => {
                            setLocationSelected(e.value);
                            setLocation(e.value);
                        }}
                        showClear
                        options={locations}
                        optionLabel={"nom"}
                    />
                    <label className={style.dropdown_label} htmlFor='location-select'>
                        <i className='pi pi-map-marker' />
                        {t("localisation")}
                    </label>
                </FloatLabel>
                <FloatLabel>
                    <Calendar
                        value={check}
                        onChange={(e) => setCheck(e.value)}
                        id='check_in'
                        inputClassName={style.calendar_check}
                        className={style.calendar_check}
                        selectionMode='range'
                    />
                    <label className={style.dropdown_label} htmlFor='check_in'>
                        <i className='pi pi-calendar-times' />
                        {t("check_in")} - {t("check_out")}
                    </label>
                </FloatLabel>

                <FloatLabel>
                    <InputNumber value={guest} onChange={(e) => setGuest(e.value)} inputClassName={style.input_number} id='guest' />
                    <label className={style.dropdown_label} htmlFor='check_out'>
                        <i className='pi pi-users' />
                        {t("guest")}
                    </label>
                </FloatLabel>
                <Button onClick={search} icon="pi pi-search" label='Search' className='button-primary' />
            </div>
            <Dialog
                visible={visible}
                onHide={() => setVisible(false)}
                header={null}
                modal
            >
                <div className={style.wrapper_dialog}>
                    <FloatLabel>
                        <Dropdown
                            pt={{
                                trigger: { className: style.dropdown_trigger }
                            }}
                            className={style.dropdown_large}
                            id='type-select'
                            value={typeSelected}
                            onChange={(e) => setTypeSelected(e.value)}
                            showClear
                            options={types}
                            optionLabel={"type_name"}
                        />
                        <label className={style.dropdown_label} htmlFor='type-select'>
                            <i className='pi pi-map-marker' />
                            Type {t("accommodation")}
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
                            options={locations}
                            optionLabel={"nom"}
                        />
                        <label className={style.dropdown_label} htmlFor='location-select'>
                            <i className='pi pi-map-marker' />
                            {t("localisation")}
                        </label>
                    </FloatLabel>
                    <FloatLabel>
                        <Calendar
                            value={check}
                            onChange={(e) => setCheck(e.value)}
                            id='check_in'
                            inputClassName={style.calendar_check}
                            className={style.calendar_check}
                            selectionMode='range'
                        />
                        <label className={style.dropdown_label} htmlFor='check_in'>
                            <i className='pi pi-calendar-times' />
                            {t("check_in")} - {t("check_out")}
                        </label>
                    </FloatLabel>

                    <FloatLabel>
                        <InputNumber value={guest} onChange={(e) => setGuest(e.value)} inputClassName={style.input_number} id='guest' />
                        <label className={style.dropdown_label} htmlFor='check_out'>
                            <i className='pi pi-users' />
                            {t("guest")}
                        </label>
                    </FloatLabel>
                    <Button onClick={search} icon="pi pi-search" label='Search' className='button-primary' />
                </div>
            </Dialog>
        </div>
    )
}