import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Loading } from "../loading/Loading";

export interface AsyncComponentOwnProps {
    moduleProvider: () => Promise<any>;
}
export type AsyncComponentProps = AsyncComponentOwnProps & Partial<RouteComponentProps<{}>>;
export interface AsyncComponentState {
    Component: React.ComponentClass<any>;
}

export class AsyncComponent extends React.PureComponent<AsyncComponentProps, AsyncComponentState> {
    public state: AsyncComponentState = {
        Component: null,
    };

    async componentWillMount() {
        if(!this.state.Component) {
            const Component = await this.props.moduleProvider();
            this.setState({ Component: Component.default });
        }
    }

    render() {
        const {
            moduleProvider,
            ...rest
        } = this.props;

        return <>
                {this.state.Component
                    ? <this.state.Component {...rest} />
                    : <Loading />
                }
        </>;
    }
}
