import { sleep } from "./utils/util";

// These functions are where you would make API
// calls to your auth system of choice for login, signup,
// and password reset requests

export const fakeLogin = async (email: string, password: string) => {
    // Just to simulate network request
    await sleep(2000);

    // Return a fake user
    return {
        name: "Wilfred",
        email: "wilfred@wilfredlopez.net",
        id: "0",
    };
};

export const fakeSignup = async (email: string, password: string) => {
    // Just to simulate network request
    await sleep(2000);

    // Return a fake user
    return {
        name: "Wilfred",
        email: "wilfred@wilfredlopez.net",
        id: "0",
    };
};

export const fakeResetPassword = async (email: string, password?: string) => {
    await sleep(2000);
};
