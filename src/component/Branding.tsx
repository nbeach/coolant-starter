import styled from "styled-components"
import React from "react"
import {connect, MapStateToProps} from "react-redux"
import {CoolantState} from "../model/CoolantState"

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`

const Logo = styled.img`
    max-width: 100%;
    max-height: 100%;
`

interface BrandingStateProps {
    readonly name: string,
    readonly logo?: string
}

export const BrandingPresenter = ({ name, logo }: BrandingStateProps) =>
    <Container>
        {logo !== undefined ? <Logo src={logo}/> : <h1>{name}</h1>}
    </Container>

const mapStateToProps: MapStateToProps<BrandingStateProps, void, CoolantState> = ({ name, logo }) => ({ name, logo })
export const Branding = connect(mapStateToProps)(BrandingPresenter)
