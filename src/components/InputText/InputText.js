import React, { useState } from "react";

export const InputText = ({
    name = null,
    type = "text",
    labelText = "Some Text",
    handleChange,
    value = undefined,
    validatorErrorMsg = "Campo Invalido",
    hasError = false
}) => {
    const [isValid, setIsValid] = useState(null);

    const handleOnBlur = () => {
        setIsValid(hasError)
    }
    return (
        <>
            <div className="relative border-2 w-full focus-within:border-blue-500">
                <input
                    className="block w-full p-1 py-2 appearance-none focus:outline-none bg-transparent text-sm"
                    type={type}
                    onChange={handleChange}
                    name={name}
                    placeholder=" "
                    value={value}
                    onBlur={handleOnBlur}
                />
                <label className="absolute top-0 left-1 text-sm p-1 py-2 duration-300 origin-0 bg-white -z-10 font-normal text-gray-400">
                    {labelText}
                </label>
            </div>
            {isValid ? <span className="text-red-700">{validatorErrorMsg}</span> : <></>}
        </>
    );
};