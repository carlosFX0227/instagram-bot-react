enum Environment {
    Development = "development",
    Production = "production",
}
export const BASE_URL = process.env.NODE_ENV === Environment.Production
    ? "http://178.62.242.250:81"
    : "http://localhost:8079";

export const AUTH_BASE = "/auth/login";
export const REGISTER_BASE = "/auth/register";
export const ACCOUNT_URL = "/instagrams";
export const ACTIVITY_URL = "/settings/activity";
export const GENERAL_URL = "/settings/general";
export const COMMENT_URL = "/settings/comment"; // min max comments
export const LIKE_URL = "/settings/like"; // min max likes
export const FOLLOW_URL = "/settings/follow"; // min max followers
export const ACTIVITY_BASE = "/activity";
export const ACTIVITY_REVIEWED = "/reviewed";
export const ACTIVITY_REVERT = "/activity/revert";
export const LINK = "/link";
export const LOGIN_URL = BASE_URL + AUTH_BASE;
export const REGISTER_URL = BASE_URL + REGISTER_BASE;

// Keyboard keys
export const ENTER_KEY = 13;
