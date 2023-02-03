import React, {CSSProperties, ReactNode} from "react"
import ReactDOM from "react-dom"

const overlayStyles: CSSProperties = {
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
}

export const showOverlay = (durationSeconds: number, content: ReactNode): void => {
    const node = document.createElement("DIV")
    document.body.appendChild(node)

    ReactDOM.render(<div style={overlayStyles}>
        {content}
    </div>, node)

    setTimeout(() => {
        ReactDOM.unmountComponentAtNode(node)
        document.body.removeChild(node)
    }, durationSeconds * 1000)
}
