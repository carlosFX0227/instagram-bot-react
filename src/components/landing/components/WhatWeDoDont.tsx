import * as React from "react";

import { Divider, DividerTheme } from "../../divider/Divider";
import { CheckSVG } from "../../icons/Check";
import { TimesSVG } from "../../icons/Times";
import { Card } from "../../card/Card";

import * as styles from "../Landing.scss";

export class WhatWeDoDont extends React.PureComponent {
    public render() {
        return <>
            <h1 className={styles.title}>
                What do we do?
            </h1>
            <Divider theme={DividerTheme.Small} />
            <div className={styles.cardContainer}>
                <Card
                    iconComponent={<CheckSVG />}
                    title={"We Do"}
                >
                    <ul>
                        <li>Expose your account to thousands real potential followers</li>
                        <li>Allow to follow any hashtags and users</li>
                        <li>Use your custom comments for posts</li>
                        <li>Allow to unfollow recently followed users</li>
                        <li>Provide statistics to see each accounts growth dynamics</li>
                    </ul>
                </Card>
                <Card
                    iconComponent={<TimesSVG />}
                    title={"We Don't"}
                >
                    <ul>
                        <li>Add fake followers</li>
                        <li>Add fake likes</li>
                        <li>Add fake comments</li>
                    </ul>
                </Card>
            </div>
        </>;
    }
}
