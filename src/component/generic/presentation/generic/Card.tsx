import React, {PropsWithChildren} from "react"
import {styled} from "../../styled"
import {Style} from "../../../../util/Style"

export const CardContainer = styled<{ readonly color: string, readonly scaleFactor: number}>("div", config => ({
    display: "flex",
    justifyContent: "space-between",
    flexGrow: 1,
    alignItems: "center",
    padding: "1rem 3.5rem 1rem 3.5rem",
    margin: "0.25rem",
    backgroundColor: config.color,
    fontSize: `${config.scaleFactor * Style.size.baseFontSize}rem`,
}))

export const Card = (props: PropsWithChildren<{ readonly color: string, readonly scaleFactor?: number}>) =>
    <CardContainer color={props.color} scaleFactor={props.scaleFactor ?? 1}>
        {props.children}
    </CardContainer>
