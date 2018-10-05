import * as React from "react";
import * as styles from "../UserForm.scss";
import * as classNames from "classnames";

export interface FormGroupProps {
    htmlFor: string;
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyUp: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) =>void;
    type?: string;
}

export class FormGroup extends React.PureComponent<FormGroupProps> {
    public static defaultProps = {
        type: "text",
    };

    public render() {
        const {
            htmlFor,
            label,
            value,
            onChange,
            onKeyUp,
            type,
        } = this.props;

        return (
            <div className={styles.formGroup}>
                <label
                    htmlFor={htmlFor}
                    className={classNames(styles.label, { [styles.hidden]: value })}
                >
                    {label}
                </label>
                <input
                    id={htmlFor}
                    className={styles.input}
                    type={type}
                    onChange={onChange}
                    value={value}
                    autoComplete="nope"
                    autoCapitalize="nope"
                    autoCorrect="nope"
                    onKeyUp={onKeyUp}
                />
            </div>
        );
    }
}