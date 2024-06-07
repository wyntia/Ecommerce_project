import React from 'react'

const Color = (props) => {
    const { colorData, setColor } = props;
    return (
        <div>
            <ul className='colors ps-0'>
                {
                    colorData && colorData.map((item, index) => {
                        return (
                            <li onClick={() => setColor(item?._id)} key={index} style={{backgroundColor: item?.title}}> </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Color
