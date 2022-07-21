import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { ConfirmationButton, InputText, TitleHeader } from "../components/ComponentIndex";
import { PhoneValidator, RutValidator, StringValidator, EmailValidator } from "../helpers/ValidatorsIndex";
import { UserContext } from "../context/user/UserContext";

function UserForm() {

    const { userInfo, setUserInfo } = useContext(UserContext)

    const debounceRef = useRef()

    const [formData, setFormData] = useState({
        email: "",
        name: "",
        lastname: "",
        rut: "",
        phone: ""
    })

    useEffect(() => {
        const fetchEmailInfo = () => {

            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }

            debounceRef.current = setTimeout(() => {
                const getCustomerInfoByemail = (email) => {
                    axios("https://pinflag-mock-api.herokuapp.com/api/client/search", {
                        params: { email },
                    })
                        .then((res) => {
                            const { last_name, name, email } = res.data;
                            setUserInfo({
                                ...userInfo,
                                lastname: last_name,
                                name: name,
                                email: email
                            });
                            setFormData({
                                lastname: last_name,
                                name: name,
                                email: email
                            })
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
                getCustomerInfoByemail(formData.email);
            }, 300);
        };
        fetchEmailInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData.email])



    const [isValid, setIsValid] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })

    }

    useEffect(() => {
        setUserInfo(formData)
        // usar useCallback
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData])


    useEffect(() => {
        const areFieldsValid = () => {
            const fields = Object.values(formData);
            const validations = [
                PhoneValidator(formData.phone),
                RutValidator(formData.rut),
                StringValidator(formData.name),
                StringValidator(formData.lastname),
                EmailValidator(formData.email)
            ]
            return (
                fields.every((field) => field !== null) &&
                validations.every((validation) => validation === true)
            )
        }

        setIsValid(() => areFieldsValid())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData])


    return (
        <section className="w-full">
            <TitleHeader
                title="Completa tus datos"
                subtitle="Lorem ipsum dolor sit amet"
            />
            <div className="grid grid-cols sm:grid-cols-2 p-3 gap-3">
                <div className="w-full col-span-2 bg-transparent sm:col-span-2 flex flex-col">
                    <InputText
                        name="email"
                        labelText="Correo Electrónico"
                        handleChange={handleChange}
                        value={formData.email || ""}
                        validatorErrorMsg="Tiene que tener formato de correo electrónico"
                        hasError={formData?.email && !EmailValidator(formData.email)}
                    />
                </div>
            </div>
            <div className="grid grid-cols sm:grid-cols-2 p-3 gap-3">
                <div>
                    <InputText name="name" labelText="Nombre" handleChange={handleChange} value={formData.name || ""} validatorErrorMsg="Campo inválido" hasError={formData?.name && !StringValidator(formData.name)} />
                </div>
                <div>
                    <InputText name="lastname" labelText="Apellido" handleChange={handleChange} value={formData.lastname || ""} validatorErrorMsg="Campo Inválido" hasError={formData?.lastname && !StringValidator(formData.lastname)} />
                </div>
                <div>
                    <InputText name="rut" labelText="RUT" type="text" handleChange={handleChange} validatorErrorMsg="Ingresa un RUT correcto" hasError={formData?.rut && !RutValidator(formData.rut)} />
                </div>
                <div>
                    <InputText name="phone" labelText="Teléfono" type="number" handleChange={handleChange} validatorErrorMsg="Ingresa un número de teléfono válido" hasError={formData?.phone && !PhoneValidator(formData.phone)} />
                </div>
            </div>
            <ConfirmationButton isValid={isValid} />
        </section>
    )
}

export default UserForm;