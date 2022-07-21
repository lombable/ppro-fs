import React from 'react'

export const TitleHeader = ({ title, subtitle }) => {
    return (
        <div className="flex flex-col my-8">
            <p className="font-bold text-3xl ml-1 mb-4">{title}</p>
            <p className="text-xs ml-1">{subtitle}</p>
        </div>
    )
}
