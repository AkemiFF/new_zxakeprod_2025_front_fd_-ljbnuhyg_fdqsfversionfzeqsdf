// ListCheckbox.js
import React, { useEffect, useState } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import style from './../style/components/ListCheckbox.module.css';
import UrlConfig from '@/util/config';

export default function ListCheckbox({ onSpecChange }) {  // Ajoutez onSpecChange ici
    const [specifications, setSpecifications] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);

    useEffect(() => {
        fetch(`${UrlConfig.apiBaseUrl}/api/artisanat/specifications/`)
            .then(response => response.json())
            .then(data => {
                const formattedOptions = data.map(spec => ({
                    label: spec.type_specification,
                    value: spec.id
                }));
                setSpecifications(formattedOptions);
            })
            .catch(error => {
                console.error('Error fetching specifications:', error);
            });
    }, []);

    const handleChange = (e) => {
        setSelectedValues(e.value);
        onSpecChange(e.value);  // Appelle la fonction du parent pour mettre à jour les filtres
    };

    return (
        <div className={style.container}>
            <span className={style.title}>Specifications</span>
            <div className={style.multiSelectContainer}>
                <MultiSelect
                    value={selectedValues}
                    options={specifications}
                    onChange={handleChange}
                    optionLabel="label"
                    placeholder="Select specifications"
                    className={style.multiSelect}
                />
            </div>
        </div>
    );
}
