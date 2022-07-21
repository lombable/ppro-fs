import React, { useEffect } from 'react'

export const ConfirmationButton = ({ isValid }) => {

    const handleClick = () => {
        console.log("clicked")
    }

    useEffect(() => {
        console.log(isValid, "isValidConfirmationButton")
    }, [isValid])


    return (
        <>
            <div className="flex justify-end mr-5 mb-5">
                <button
                    onClick={handleClick}
                    className={`flex justify-end
                        ${isValid
                            ? "bg-black text-uppercase text-white font-bold p-4 px-20 rounded-md disabled:bg-gray-600"
                            : "bg-black text-uppercase text-white font-bold p-4 px-20 rounded-md opacity-70"
                        }`}
                    disabled={!isValid}
                >
                    Continuar
                </button>
            </div>
        </>
    )
}
