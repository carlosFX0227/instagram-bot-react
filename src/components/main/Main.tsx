import * as React from "react";
import { Switch, Route, withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { HeaderConnected } from "../header/Header";
import { User } from "../user/User";
import { LoginConnected } from "../login/Login";
import { DashboardConnected } from "../dashboard/Dashboard";
import { selectUser } from "../../ducks/selectors";
import { NoMatch } from "../no-match/NoMatch";
import { LinkAccountConnected } from "../link-account/LinkAccount";
import { AccountPageConnected } from "../account-page/AccountPage";
import { LandingConnected } from "../landing/Landing";
import { Footer } from "../footer/Footer";
import { PopupConnected } from "../popup/Popup";
import { ToastConnected } from "../toast/Toast";
import { Register } from "../register/Register";
import { Faq } from "../faq/Faq";

import * as styles from "./Main.scss";

export interface MainStateProps {
    logged_in: boolean;
}

export type MainProps = MainStateProps & RouteComponentProps<{}>;

export class Main extends React.PureComponent<MainProps> {
    public render() {
        return (
            <div className={styles.container}>
                <ToastConnected />
                <HeaderConnected />
                <div className={styles.bodyContainer}>
                    <Switch>
                        <Route exact path="/" component={LandingConnected} />
                        <div className={styles.extraSpace}>
                        <Route exact path="/faq" component={Faq} />
                        { this.props.logged_in
                            ? <>
                                <Route path="/profile" component={User} />
                                <Route path="/link-account" component={LinkAccountConnected} />
                                <Route exact path="/accounts" component={DashboardConnected} />
                                <Route path="/accounts/:id" component={AccountPageConnected} />
                            </>
                            : <>
                                <Route path="/login" component={LoginConnected} />
                                <Route path="/register" component={Register} />
                            </>
                            }
                        </div>
                        <Route path="*" component={NoMatch} />
                    </Switch>
                </div>
                <PopupConnected />
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state: any): MainStateProps => ({
    logged_in: !!selectUser(state).email,
});

export const MainConnected = withRouter(connect<MainStateProps>(
    mapStateToProps,
)(Main));
