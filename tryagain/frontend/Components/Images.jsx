import React from 'react'

const AppImage = ({img, className, title}) => {
    return(
        <>
        <img src={img} className={className} title={title} alt='Image'/>
        </>
    )
}

export default AppImage;