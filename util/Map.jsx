const getNomVille = async (lat,lon) =>{
    try {
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data.display_name.split(","));
        })
    } catch (error) {
        console.log(error);
        return null;
    }
}
export {getNomVille}