import React,{ useId } from "react";
import { forwardRef } from "react";


function Button({
    children,
    type = 'button',
    textColor = 'text-white',
    bgColor = 'bg-blue-600',
    className = '',
    ...props
},ref) {
    const id = useId()

    return (
        <button
            className={`px-4 py-2 rounded-lg ${bgColor} ${className} ${textColor} `}
            {...props}
            ref={ref}
        >
            {children}
        </button>
    )
}
export default forwardRef(Button)