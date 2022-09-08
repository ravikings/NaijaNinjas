import React from 'react'
import LeftMsg from './LeftMsg';
import RightMsg from './RightMsg';
// message for all message 
const MessageBox = (props) => {
    const { data, auth } = props;
    if(!data){
        return <div> No Message </div>
    }
    return (
        <>
            {auth && data[0].message_set.map((item,key) => {
                // console.log(item)
                return (
                    <>
                        {
                            auth.currentUser.pk === item.sender ? <RightMsg item={item} data={data} /> : <LeftMsg item={item} data={data} />
                        }
                    </>
                )
                    
            })
        }
        </>
    )
}

export default MessageBox
