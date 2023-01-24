import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import Header2 from "../markup/Layout/Header2";
import Footer from "../markup/Layout/Footer";
import { CometChatUI } from "../cometchat-pro-react-ui-kit/CometChatWorkspace/src";

function Conversationchatroom() {
    let { id } = useParams();

    return (
        <>
            <Header2 />
            <div style={{ width: '90%', height: '575px' }}>
                <CometChatUI chatWithUser={id}/>
            </div>
            <Footer />
        </>
    )
}

export default Conversationchatroom