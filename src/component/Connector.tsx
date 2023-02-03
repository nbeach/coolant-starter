import React, {FunctionComponent} from "react"
import {Provider} from "../util/Provider"
import {periodically} from "../event/Time"

export interface ConnectedDataProp<DataPropType> {
    readonly data: DataPropType
}

export interface ConnectorProps<DataPropType> {
    readonly provider: Provider<DataPropType>
    readonly updateIntervalSeconds?: number
}

export interface ConnectorComponentProps<DataPropType, OtherProps> {
    readonly otherComponentProps: OtherProps
    readonly component: FunctionComponent<ConnectedDataProp<DataPropType> & OtherProps>
}

export class Connector<DataPropType, OtherProps> extends React.Component<ConnectorProps<DataPropType> & ConnectorComponentProps<DataPropType, OtherProps>, { readonly data: DataPropType | null }> {
    // tslint:disable-next-line:readonly-keyword
    private intervalId: number | null = null

    constructor(props: ConnectorProps<DataPropType> & ConnectorComponentProps<DataPropType, OtherProps>) {
        super(props)
        this.state = { data: null }
    }


    public render() {
        const ComponentToConnect = this.props.component
        return this.state.data === null ? <></> : <ComponentToConnect data={this.state.data} {...this.props.otherComponentProps}/>
    }

    public componentDidMount(): void {
        this.intervalId = periodically(() => this.updateState(), this.props.updateIntervalSeconds)
    }

    public componentWillUnmount(): void {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId)
        }
    }

    private async updateState() {
        const data = await this.props.provider()
        this.setState({ data })
    }
}
