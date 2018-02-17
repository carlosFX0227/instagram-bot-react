import * as React from "react";
import { connect } from "react-redux";
import { AxiosResponse } from "axios";
import {
    RouteComponentProps,
    withRouter,
    Redirect,
} from "react-router-dom";

import {
    unlinkAccountMiddlewareActionCreator,
    setAccountStatusMiddlewareActionCreator,
} from "../../middleware/actions";
import { getAccountData } from "../../utils/requests";
import { AccountData } from "../../middleware/types";
import { Divider } from "../divider/Divider";
import { AccountSettingsConnected } from "../account-settings/AccountSettings";
import { Select, SelectOption } from "../select/Select";
import { Username } from "./components/Username";

import * as styles from "./AccountPage.css";
import { Activities } from "../activities/Activities";

export enum ScreenDataRole {
    Settings = "settings",
    Statistics = "statistics",
    ActivityReview = "activity_review",
}
export interface Screen {
    label: string;
    component: JSX.Element;
}

export interface AccountPageState {
    account: AccountData;
    activeScreen: ScreenDataRole;
    redirect: boolean;
}

export interface AccountPageDispatchProps {
    onDelete: typeof unlinkAccountMiddlewareActionCreator;
    onStatusChange: typeof setAccountStatusMiddlewareActionCreator;
}
export type AccountPageProps =
    & AccountPageDispatchProps
    & RouteComponentProps<{ id: number }>
;

export class AccountPage extends React.Component<AccountPageProps, AccountPageState> {
    public constructor(props: AccountPageProps) {
        super(props);

        this.state = {
            account: {} as AccountData,
            activeScreen: ScreenDataRole.Settings,
            redirect: false,
        };
    }
    public componentWillMount() {
        getAccountData(this.props.match.params.id)
            .then((response: AxiosResponse<AccountData>) => {
                this.setState({ account: response.data });
            })
            .catch(() => {
                this.setState({
                    redirect: true,
                });
            });
    }
    public render() {
        if (this.state.redirect) {
            return <Redirect exact to="/accounts" />;
        }

        const { account } = this.state;
        if (!account.id) {
            return null;
        }

        const activityButtonClassname =
            `${styles.button} ${account.is_active ? styles.buttonStop : styles.buttonStart}`;
        const activityButtonLabel = account.is_active ? "Pause" : "Start";
        // TODO: Fix icon swapping. FontAwesome 5 dynamic svg replacement of icons
        // does not work - icons are not set dynamically
        const activityButtonIcon = false && (account.is_active
            ? <i className="fa fa-pause" aria-hidden="true" />
            : <i className="fa fa-play" aria-hidden="true" />);

        const currentScreen = this.renderScreen();

        const selectOptions: SelectOption[] = [
            {
                dataRole: ScreenDataRole.Settings,
                label: "Settings",
            },
            {
                dataRole: ScreenDataRole.Statistics,
                label: "Statistics",
            },
            {
                dataRole: ScreenDataRole.ActivityReview,
                label: "Activity Review",
            },
        ];

        let currentOption: SelectOption;
        for (const option of selectOptions) {
            if (currentScreen.label === option.label) {
                currentOption = option;
            }
        }

        return (
            <div className={styles.container}>
                <div className={styles.innerContainer}>
                    <div className={styles.header}>
                        <Username isActive={account.is_active} username={account.username} />
                        <Select
                            onSelectOption={this.onNavigate}
                            selectOptions={selectOptions}
                            currentOption={currentOption}
                        />
                        <div className={styles.buttons}>
                            <button
                                className={activityButtonClassname}
                                onClick={this.onStatusChange}
                            >
                                {activityButtonLabel} {activityButtonIcon}
                            </button>
                            <button className={`${styles.button} ${styles.buttonDelete}`} onClick={this.onDelete}>
                                Delete <i className="far fa-trash-alt" />
                            </button>
                        </div>
                    </div>
                    <Divider />
                    <div className={styles.body}>
                        {currentScreen.component}
                    </div>
                </div>
            </div>
        );
    }
    private onDelete = () => {
        this.props.onDelete(+this.props.match.params.id);
        this.setState({
            redirect: true,
        });
    }
    private onStatusChange = () => {
        this.setState(
            {
                account: {
                    ...this.state.account,
                    is_active: !this.state.account.is_active
                },
            },
            () => {
                this.props.onStatusChange({
                    id: this.state.account.id,
                    data: this.state.account,
                });
            }
        );
    }
    private onNavigate = (event: React.MouseEvent<HTMLElement>) => {
        const chosenScreen = event.currentTarget.getAttribute("data-role") as ScreenDataRole;
        if (this.state.activeScreen !== chosenScreen) {
            this.setState({
                activeScreen: chosenScreen,
            });
        }
    }
    // TODO: Possibly move to a util function. Make map function component agnostic
    private renderScreen = (): Screen => {
        return {
            [ScreenDataRole.Settings]: {
                component: <AccountSettingsConnected account={this.state.account} />,
                label: "Settings",
            },
            [ScreenDataRole.Statistics]: {
                component: <div />,
                label: "Statistics",
            },
            [ScreenDataRole.ActivityReview]: {
                component: <Activities accountId={this.state.account.id} />,
                label: "Activity Review",
            },
        }[this.state.activeScreen];
    }
}

const mapDispatchToProps = {
    onDelete: unlinkAccountMiddlewareActionCreator,
    onStatusChange: setAccountStatusMiddlewareActionCreator,
};

export const AccountPageConnected = withRouter(connect<{}, AccountPageDispatchProps>(
    undefined,
    mapDispatchToProps,
)(AccountPage));
