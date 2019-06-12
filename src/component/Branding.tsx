import styled from "styled-components"
import React, {PropsWithChildren} from "react"

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
`

export const Branding = (props: PropsWithChildren<{}> ) =>
    <Container>{props.children}</Container>



