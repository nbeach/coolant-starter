import styled from "styled-components"
import React, {PropsWithChildren} from "react"

const Container = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
`

export const Branding = (props: PropsWithChildren<{}> ) =>
    <Container>{props.children}</Container>



