import React from 'react'
import DocViewer , {DocViewerRenderers} from "react-doc-viewer";
import Cookies from "js-cookie";
const FileDisplay = (props) => {
    const { item } = props;
    const docs = [
        { uri: `https://zjoxobi1x6.execute-api.us-east-1.amazonaws.com/dev/ws/chat/message-file-download/${item.id}/`},
        // { uri: require("./example-files/pdf.pdf") }, // Local File
    ];
    console.log(item)
    if(item.attachment){
        return (
            <DocViewer documents={docs}  
            pluginRenderers={DocViewerRenderers} 
            config={{
                header: {
                    Authorization: `Bearer ${Cookies.get("access_token")}`,
                },
            }}
            />
        )

    }
    return ""
}

export default FileDisplay
