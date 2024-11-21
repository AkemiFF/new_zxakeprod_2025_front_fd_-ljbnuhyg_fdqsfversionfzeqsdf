import { Dialog } from 'primereact/dialog';
import style from './../../style/components/modal/BookingModal.module.css';
import { Button } from 'primereact/button';
import { useContext, useEffect, useRef, useState } from 'react';
import LayoutContext from "@/layouts/context/layoutContext";
import { Toast } from 'primereact/toast';
import { Image } from 'primereact/image';
import stylePassword from '@/style/components/PasswordInput.module.css';
import { Divider } from '@mui/material';
import { Password } from 'primereact/password';
import Cookies from 'js-cookie';
import { customLogin, getClientAccess, getNewAccess } from '@/util/Cookies';
import UrlConfig from '@/util/config';
import TourPaypal from '../payment/TourPayPal';
import { InputText } from 'primereact/inputtext';

export default function TripModal(props) {
    const [paystep, setPaystep] = useState(0);
    const [isFirstOutlined, setIsFirstOutlined] = useState(true);
    const [noCurrentAccounts, setNoCurrentAccounts] = useState(false);
    const [accId, setId] = useState("");
    const [editOrCreate, setEditOrCreate] = useState("Create & Continue");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [adresse, setAdresse] = useState("");

    const [email, setEmail] = useState("");
    const [nbVoyageur, setNbVoyageur] = useState(1);
    const [numero, setNumero] = useState("");
    const [pass, setPass] = useState("");
    const [confPass, setConfPass] = useState("");
    const [confPasswordErreur, setConfPasswordErreur] = useState(null);
    const confPasswordInput = useRef(null);
    const [passwordErreur, setPasswordErreur] = useState(null);
    const passwordInput = useRef(null);
    const [checkLenght, setCheckLenght] = useState(false);
    const [checkUppercase, setCheckUppercase] = useState(false);
    const [checkLowercase, setCheckLowercase] = useState(false);
    const [checkNumber, setCheckNumber] = useState(false);
    const [checkSpecial, setCheckSpecial] = useState(false);
    const [total_days, setTotalDays] = useState(false);
    const { user, setUser } = useContext(LayoutContext);
    const [city, setCity] = useState("");
    const toast = useRef(null);


    useEffect(() => {
        if (user) {
            setEditOrCreate("Edit Profil");
        } else {
            setEditOrCreate("Create Profil");
        }
    }, [user])
    useEffect(() => {
        const getNombreJour = (date1, date2) => {
            if (props.check_in && props.check_out) {
                let dateMin = date1 < date2 ? date1 : date2;
                let dateMax = date1 > date2 ? date1 : date2;
                const differenceInTime = dateMax.getTime() - dateMin.getTime();
                return (differenceInTime / (1000 * 3600 * 24)) + 1;
            }
            return 1;
        }

        const total = getNombreJour(props.check_in, props.check_out)
        setTotalDays(total);
    }, [props.check_in, props.check_out]);

    useEffect(() => {
        if (!user) {
            setNoCurrentAccounts(true);
            setIsFirstOutlined(false);
        } else {
            setNoCurrentAccounts(false);
        }
    }, [user]);

    const checkChacun = (password) => {
        setCheckLenght(password.length > 8);
        setCheckSpecial(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password));
        setCheckNumber(/\d/.test(password));
        setCheckUppercase(/[A-Z]/.test(password));
        setCheckLowercase(/[a-z]/.test(password));
    }
    const passwordInputHeader = <span className={stylePassword.header_container}>Pick a new password</span>;
    const toggleOutlined = (things) => {
        setIsFirstOutlined(things);
    };
    const createClient = async () => {
        const clientData = {
            first_name: firstname,
            username: firstname + ' ' + lastname,
            last_name: lastname,
            adresse,
            email,
            ville: city,
            numero_client: numero,
            password: pass
        };

        fetch(`${UrlConfig}/api/accounts/pay-create-client/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clientData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create client');
                }

                return response.json();

            })
            .then(async () => {
                const data = await customLogin(email, pass);
                if (data) {

                    toast.current.show({
                        severity: "success",
                        summary: "Success",
                        detail: "Profil created",
                        life: 5000
                    });
                    setUser({
                        id: data.id,
                        username: data.username,
                        userImage: data.emailPhotoUrl
                    });
                    setPaystep(1);
                }
            })
            .then(() => {
                fetch(`${UrlConfig}/api/accounts/welcome-mail/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error('Failed to send welcome email');
                        }
                        return res.json();
                    })

                    .catch(error => {
                        console.log('Error sending welcome email:', error);
                    });
            })
            .catch(error => {
                toast.current.show({
                    severity: "info",
                    summary: "Error",
                    detail: 'You are already have an accounts',
                    life: 5000
                });
            });

    };
    const editClient = async () => {
        const clientData = {
            first_name: firstname,
            username: firstname + ' ' + lastname,
            last_name: lastname,
            adresse,
            email,
            numero_client: numero,
            ville: city,
        };
        getClientAccess().then((accessToken) => {
            fetch(`${UrlConfig}/api/accounts/client/edit/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify(clientData),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to create client');
                    }

                    return response.json();

                })
                .then((data) => {

                    if (data) {

                        toast.current.show({
                            severity: "success",
                            summary: "Success",
                            detail: "Profil edited succefully",
                            life: 5000
                        });
                        setUser({
                            id: data.id,
                            username: data.username,
                            userImage: data.emailPhotoUrl
                        });
                        setPaystep(1);
                    }
                })

                .catch(error => {
                    toast.current.show({
                        severity: "info",
                        summary: "Error",
                        detail: 'You are already have an accounts',
                        life: 5000
                    });
                });
        });

    };
    const FetchUser = () => {
        let access = Cookies.get('accessToken');

        const handleFetch = (accessToken) => {
            return fetch(`${UrlConfig}/api/accounts/profil-client/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        return response.json().then((errorData) => {
                            throw new Error('Error during user fetch operation: ' + (errorData.error || 'Unknown error'));
                        });
                    }
                    return response.json();
                })
                .catch((error) => {
                    console.error('Error during user fetch operation:', error);
                    return null;
                });
        };

        if (!access) {
            return getNewAccess()
                .then(() => {
                    access = Cookies.get('accessToken');
                    if (!access) {
                        console.error('No access token available');
                        return null;
                    }
                    return handleFetch(access);
                })
                .catch((error) => {
                    console.error('Error fetching new access token:', error);
                    return null;
                });
        }

        return handleFetch(access);
    };
    useEffect(() => {
        if (user) {
            FetchUser()
                .then((data) => {

                    setId(data.id)
                    setFirstname(data.first_name);
                    setLastname(data.last_name);
                    setEmail(data.email);
                    setAdresse(data.adresse);
                    setCity(data.ville);
                    setNumero(data.numero_client);
                })
                .catch((error) => {
                    console.error('Error fetching user info:', error);
                });
        }
    }, [user]);


    const headerTemplate = () => {
        return (
            <div>
                <span>Accommodation/ Hotel / Le Louvre & Spa</span>
            </div>
        )
    }


    const passwordInputFooter = (
        <>
            <Divider />
            <div className={stylePassword.check_wrapper}>
                <div className={stylePassword.check}>
                    <Image alt='check' imageClassName={stylePassword.check_logo} src={checkLenght ? "/images/auth/check_logo.svg" : "/images/auth/check_unknow.svg"} />
                    <span className={stylePassword.check_label}>Must be at least 8 characters</span>
                </div>
                <div className={stylePassword.check}>
                    <Image alt='check' imageClassName={stylePassword.check_logo} src={checkUppercase ? "/images/auth/check_logo.svg" : "/images/auth/check_unknow.svg"} />
                    <span className={stylePassword.check_label}>Must contain at least one uppercase character</span>
                </div>
                <div className={stylePassword.check}>
                    <Image alt='check' imageClassName={stylePassword.check_logo} src={checkLowercase ? "/images/auth/check_logo.svg" : "/images/auth/check_unknow.svg"} />
                    <span className={stylePassword.check_label}>Must contain at least one lowercase character</span>
                </div>
                <div className={stylePassword.check}>
                    <Image alt='check' imageClassName={stylePassword.check_logo} src={checkNumber ? "/images/auth/check_logo.svg" : "/images/auth/check_unknow.svg"} />
                    <span className={stylePassword.check_label}>Must contain at least one number</span>
                </div>
                <div className={stylePassword.check}>
                    <Image alt='check' imageClassName={stylePassword.check_logo} src={checkSpecial ? "/images/auth/check_logo.svg" : "/images/auth/check_unknow.svg"} />
                    <span className={stylePassword.check_label}>Must contain at least one special character</span>
                </div>
            </div>
        </>
    )

    const handleSubmit = async () => {
        if (!user) {
            let canSendData = true;
            if (pass.length < 8 || pass.trim() == "") {
                passwordInput.current.className = style.form_input_erreur;
                setPasswordErreur("Password required");
                canSendData = false;
            }
            if (confPass != pass) {
                confPasswordInput.current.className = style.form_input_erreur;
                setConfPasswordErreur("Password does not match");
                canSendData = false;
            }
            if (canSendData) {

                createClient();


            }
        } else {
            editClient();
        }

    }

    const handleStep = () => {
        if (nbVoyageur) {
            paystep == 0 ? !isFirstOutlined ? handleSubmit() : setPaystep(1) : setPaystep(0);
        } else {
            toast.current.show({
                severity: "error",
                summary: "Error",
                detail: 'Please set the number of travelers',
                life: 5000
            });
        }

    }


    return (
        <Dialog draggable={false} header={headerTemplate} className={style.dialog_container} visible={props.visible} onHide={props.onHide}>
            <div className={style.container}>
                <div className={style.head_container}>
                    <span className={style.head_title}>Booking Information</span>
                    <span className={style.head_label}>Lorem ipsum dolor sit amet facilisi vero exerci sea erat sit sea duo vero et ut at.</span>
                </div>
                <div className={style.body_container}>
                    <div className={style.body_left}>
                        <div className={style.body_title_container}>
                            <span className={style.body_title_numero}>1</span>
                            <span className={style.body_title_label}>Personal detail</span>
                        </div>
                        {(paystep == 0 ?
                            <>
                                <div className={style.centered_div}>
                                    <Button
                                        label="Current Account"
                                        outlined={isFirstOutlined}
                                        rounded
                                        icon="pi pi-user"
                                        disabled={noCurrentAccounts}
                                        onClick={() => toggleOutlined(true)}
                                    />
                                    <hr />

                                    <InputText
                                        type="number"
                                        placeholder="Enter number of travelers"
                                        title="Number of travelers"
                                        required={true}
                                        value={nbVoyageur}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value === '' || (/^\d+$/.test(value) && parseInt(value) > 0)) {
                                                setNbVoyageur(parseInt(value));
                                            }
                                        }}
                                        className={style.inputField}
                                    />
                                    <hr />
                                    <Button
                                        label={editOrCreate}
                                        outlined={!isFirstOutlined}
                                        rounded
                                        icon="pi pi-user"
                                        onClick={() => toggleOutlined(false)}
                                    />
                                </div>

                                {!isFirstOutlined ? (
                                    <><div className={style.centered_div_info}>

                                        <div className={style.profil_detail}>
                                            <div className={style.profil}>
                                                <div className={style.detail}>
                                                    <span className={style.label}>First name</span>
                                                    <input
                                                        type="text"
                                                        value={firstname || ''}
                                                        onChange={(e) => setFirstname(e.target.value)}
                                                        className={style.inputField} />
                                                </div>
                                                <div className={style.detail}>
                                                    <span className={style.label}>Last name</span>
                                                    <input
                                                        type="text"
                                                        value={lastname || ''}
                                                        onChange={(e) => setLastname(e.target.value)}
                                                        className={style.inputField} />
                                                </div>
                                                <div className={style.detail}>
                                                    <span className={style.label}>Email</span>
                                                    <input
                                                        type="email"
                                                        value={email || ''}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className={style.inputField} />
                                                </div>
                                                <div className={style.detail}>
                                                    <span className={style.label}>Contact</span>
                                                    <input
                                                        type="text"
                                                        value={numero || ''}
                                                        onChange={(e) => setNumero(e.target.value)}
                                                        className={style.inputField} />
                                                </div>
                                                <div className={style.detail}>
                                                    <span className={style.label}>Adresse</span>
                                                    <input
                                                        type="text"
                                                        value={adresse || ''}
                                                        onChange={(e) => setAdresse(e.target.value)}
                                                        className={style.inputField} />
                                                </div>
                                                <div className={style.detail}>
                                                    <span className={style.label}>City</span>
                                                    <input
                                                        type="text"
                                                        value={city || ''}
                                                        onChange={(e) => setCity(e.target.value)}
                                                        className={style.inputField} />
                                                </div>
                                                {!user ?
                                                    <><div className={style.detail}>
                                                        <span className={style.label}>New Password</span>
                                                        <Password
                                                            ref={passwordInput}
                                                            inputClassName={style.form_input_password}
                                                            className={style.form_input_password_container}
                                                            placeholder="Enter your pasword"
                                                            value={pass || ''}
                                                            toggleMask
                                                            header={passwordInputHeader}
                                                            footer={passwordInputFooter}
                                                            onChange={(e) => {
                                                                passwordInput.current.className = style.form_input;
                                                                setPass(e.target.value);
                                                                setPasswordErreur(null);
                                                                checkChacun(e.target.value);
                                                            }} />


                                                        <span style={passwordErreur != null ? { display: "block" } : { display: "none" }} className={style.form_erreur}>{passwordErreur}</span>
                                                    </div><div className={style.detail}>
                                                            <span className={style.label}>Confirm Password</span>
                                                            <Password
                                                                ref={confPasswordInput}
                                                                inputClassName={style.form_input_password}
                                                                className={style.form_input_password_container}
                                                                type="password"
                                                                value={confPass || ''}
                                                                onChange={(e) => setConfPass(e.target.value)} />
                                                            <Image style={confPasswordErreur != null ? { display: "block" } : { display: "none" }} className={style.form_erreur_image} src="/images/auth/alert_circle.svg" alt="!" />

                                                        </div></>
                                                    : <></>}
                                            </div>
                                        </div>
                                    </div>
                                        <div className={style.bottom}>
                                            <Button label='Continue' onClick={() => handleSubmit()} className='button-primary' style={{ width: "30%" }} />
                                        </div>
                                    </>
                                ) : (
                                    <><div className={style.centered_div_info}>

                                        <div className={style.profil_detail}>

                                            <div className={style.profil}>
                                                <div className={style.detail}>
                                                    <span className={style.label}>First name</span>
                                                    <span>{firstname} </span>
                                                </div>
                                                <div className={style.detail}>
                                                    <span className={style.label}>Last name</span>
                                                    <span>{lastname} </span>
                                                </div>
                                                <div className={style.detail}>
                                                    <span className={style.label}>Email</span>
                                                    <span>{email} </span>
                                                </div>
                                                <div className={style.detail}>
                                                    <span className={style.label}>Contact</span>
                                                    <span>{numero} </span>
                                                </div>
                                                <div className={style.detail}>
                                                    <span className={style.label}>Adresse</span>
                                                    <span>{adresse} </span>
                                                </div>
                                                <div className={style.detail}>
                                                    <span className={style.label}>City</span>
                                                    <span>{city} </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div><div className={style.bottom}>
                                            <Button label='Continue' onClick={() => handleStep()} className='button-primary' style={{ width: "30%" }} />
                                        </div></>
                                )}


                                <div className={style.body_title_container}>
                                    <span className={style.body_title_numero}>2</span>
                                    <span className={style.body_title_label}>Payement method</span>
                                </div>
                            </>
                            :
                            <>
                                <div className={style.body_title_container}>
                                    <span className={style.body_title_numero}>2</span>
                                    <span className={style.body_title_label}>Payement method</span>
                                </div>
                                <div className={style.centered_div}>
                                    <div className={style.button_container}>
                                        <TourPaypal
                                            description={props.description}
                                            id_voyage={props.id}
                                            nb_voyageur={nbVoyageur}
                                        />
                                    </div>
                                </div>
                                <div className={style.bottom}>
                                    <Button label='Go Back' onClick={() => handleStep()} className='button-primary' style={{ width: "30%" }} />
                                </div>
                            </>
                        )}
                    </div>
                    <div className={style.body_right}>
                        {/* <BookingHotelCard
                            hotel_name={props.hotel_name}
                            hotel_image={props.hotel_image}
                            hotel_location={props.hotel_location}
                            check_in={props.check_out != null ? new Date(props.check_in) : null}
                            check_out={props.check_out != null ? new Date(props.check_out) : null}
                            guest={props.guest}
                            rooms={props.rooms}
                        /> */}
                        <div className={style.ground_rule_container}>
                            <span className={style.ground_rule_title}>Ground rules</span>
                            <div className={style.ground_rule_body}>
                                <span className={style.paragraphe}>
                                    Lorem ipsum dolor sit amet eu possim et. Adipiscing vel et ut in qui et.
                                    Dolor vulputate dolore aliquip et dolore ut vero aliquam amet rebum sit at lorem duis sanctus.
                                    Duis aliquyam elitr eirmod ullamcorper ipsum in ut quis sit duo delenit eirmod clita.
                                    Sed eum justo sit gubergren erat labore justo voluptua dolores et.
                                </span>
                                <ul className={style.list}>
                                    <li>Lorem ipsum dolor sit amet volutpat erat voluptua dolores gubergren sanctus vulputate lorem.</li>
                                    <li>Lorem ipsum dolor sit amet volutpat erat voluptua dolores gubergren sanctus vulputate lorem.</li>
                                    <li>Lorem ipsum dolor sit amet volutpat erat voluptua dolores gubergren sanctus vulputate lorem.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className={style.bottom}>
                    <Button label='Confirm & pay $150' className='button-primary' style={{ width: "30%" }} />
                </div> */}
            </div>
            <Toast ref={toast} />
        </Dialog>
    );

}