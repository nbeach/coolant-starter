import React, {PropsWithChildren} from "react"
import styled from "styled-components"
import {CoolantConfiguration} from "../model/CoolantConfiguration"
import {Provider} from "react-redux"
import {initializeStore} from "../store"

const Container = styled.div`
    display: flex;
    height: 98vh;
`

export const Coolant = (props: PropsWithChildren<{ readonly configuration: CoolantConfiguration }>) =>
    <Container>
        <Provider store={initializeStore(props.configuration)}>
            {props.children}
        </Provider>
    </Container>
