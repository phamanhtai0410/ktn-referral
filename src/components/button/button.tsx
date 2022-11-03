
import React from 'react';

const Button = ({background,color,text}) =>{
    return (
        <button className={`bg-[${color}] h-[110px]]`}>
            {text}
        </button>
    )

}

export default Button;