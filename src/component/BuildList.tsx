import React from "react"
import styled from "styled-components"
import {BuildCard} from "./BuildCard"
import {Build} from "../model/Build"
import {connect, MapStateToProps} from "react-redux"
import {CoolantState} from "../model/CoolantState"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`

export const BuildListPresenter = ({builds}: BuildListStateProps) => <Container>
    {builds.map(build => <BuildCard key={build.id} scaleFactor={builds.length} {...build}/>)}
</Container>

interface BuildListStateProps {
    readonly builds: ReadonlyArray<Build>
}

const mapStateToProps: MapStateToProps<BuildListStateProps, void, CoolantState> = ({builds}) => ({ builds })
export const BuildList = connect(mapStateToProps)(BuildListPresenter)
