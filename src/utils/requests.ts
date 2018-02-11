import axios from "axios";
import {
    BASE_URL,
    ACCOUNT_URL,
    ACTIVITY_URL,
    GENERAL_URL,
    COMMENT_URL,
    ACTIVITY_ALL,
    ACTIVITY_REVERT,
} from "../consts";
import { createConfig } from "./config";

// Default config. Can be overwritten when using any of the following methods
const defaultConfig = createConfig(localStorage.getItem("auth_token"))

export function getInitAccountData(config = defaultConfig) {
    return axios.get(`${BASE_URL}${ACCOUNT_URL}`, config);
};
export function getAccountData(id: number, config = defaultConfig) {
    return axios.get(`${BASE_URL}${ACCOUNT_URL}/${id}`, config);
};
export function postAccount(data: any, config = defaultConfig) {
    return axios.post(`${BASE_URL}${ACCOUNT_URL}`, data, config);
};
export function deleteAccount(id: number, config = defaultConfig) {
    return axios.delete(`${BASE_URL}${ACCOUNT_URL}/${id}`, config)
};
export function updateActivities(id: number, data: any, config = defaultConfig) {
    return axios.patch(
        `${BASE_URL}${ACCOUNT_URL}/${id}${ACTIVITY_URL}`,
        data,
        config,
    )
};
export function updateGeneral(id: number, data: any, config = defaultConfig) {
    return axios.patch(
        `${BASE_URL}${ACCOUNT_URL}/${id}${GENERAL_URL}`,
        data,
        config,
    )
};
export function updateComments(id: number, data: any, config = defaultConfig) {
    return axios.patch(
        `${BASE_URL}${ACCOUNT_URL}/${id}${COMMENT_URL}`,
        data,
        config,
    )
};
export function setAccountStatus(id: number, data: any, config = defaultConfig) {
    return axios.patch(
        `${BASE_URL}${ACCOUNT_URL}/${id}`,
        data,
        config,
    )
};
export function getActivities(id: number, config = defaultConfig) {
    return axios.get(`${BASE_URL}${ACCOUNT_URL}/${id}${ACTIVITY_ALL}`, config)
};

export function revertAccountActivity(id: number, data: any, config = defaultConfig) {
    return axios.post(`${BASE_URL}${ACCOUNT_URL}/${id}${ACTIVITY_REVERT}`, data, config);
};
