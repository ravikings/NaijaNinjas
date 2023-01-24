import React, { useEffect, useState } from "react"
import Header2 from "../markup/Layout/Header2";
import Footer from "../markup/Layout/Footer";
import { CometChatUI } from "../cometchat-pro-react-ui-kit/CometChatWorkspace/src";

function Conversationlist() {

    return (
        <>
            <Header2 />
            <div style={{ width: '90%', height: '575px' }}>
                <CometChatUI />
            </div>
            <Footer />
        </>
    )
}

export default Conversationlist