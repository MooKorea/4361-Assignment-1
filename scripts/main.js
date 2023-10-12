import "../styles/style.scss";

import { body1 } from "./body1.js"
body1();

import { body2 } from "./body2.js"
body2();

import { enterSite } from "./enterSite";
enterSite();

import { signIn } from "./firebase/signIn";
signIn()

import { submitForm } from "./firebase/submitForm";
submitForm()

import { isSignedIn } from "./firebase/isSignedIn";
isSignedIn()

import { starSelection } from "./starSelection";
starSelection()