// ==UserScript==
// @name         Twitch Experiments
// @namespace    https://github.com/nerblo/Experiments
// @author       https://github.com/nerblo
// @copyright    https://github.com/nerblo
// @version      1.0.8
// @description  Set Twitch Experiments Permanently
// @match        *://*.twitch.tv/*
// @updateURL    https://github.com/nerblo/Experiments/twitch_experiments.user.js
// @downloadURL  https://github.com/nerblo/Experiments/twitch_experiments.user.js
// @run-at       document-start
// @grant        none
// ==/UserScript==
"use strict";
const nExperiments = [];

// Chat History
nExperiments.push({ name: "994869b7-223b-4d34-b30c-46b403d6468b", value: "treatment" });
// WYSIWYG Editor
// nExperiments.push({ name: "224664cf2d-0df6-43fb-8196-25fac34700d5", value: "control" });

// Set the cookie
function nerbSetCookie(nName, nValue, nExpDays) {
    let nDate = new Date();
    let nCookieStr = "";
    nDate.setTime(nDate.getTime() + nExpDays * 24 * 60 * 60 * 1000);
    const nExp = "expires=" + nDate.toUTCString();
    nCookieStr = nName + "=" + nValue + "; " + nExp + "; domain=.twitch.tv; SameSite=None; Secure; path=/";
    document.cookie = nCookieStr;
    return true;
}
function nerbSetExperiment(nExp) {
    let nResult = false;
    let nCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("experiment_overrides"))
        ?.split("=")[1];
    let jCookie = JSON.parse(decodeURIComponent(nCookie));
    if (jCookie.experiments[nExp.name] == nExp.value) {
        return false;
    }
    // Cookie not Set, Update the Cookie
    jCookie.experiments[nExp.name] = nExp.value;
    nCookie = JSON.stringify(jCookie);
    nerbSetCookie("experiment_overrides", nCookie, 30);
    return true;
}
nExperiments.forEach(nerbSetExperiment);
