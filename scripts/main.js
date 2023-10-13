import "../styles/style.scss";

import { body1 } from "./body1.js";
body1();

import { body2 } from "./body2.js";
body2();

import { enterSite } from "./enterSite";
enterSite();

import { signIn } from "./firebase/signIn";
signIn();

import { submitForm } from "./firebase/submitForm";
submitForm();

import { isSignedIn } from "./firebase/isSignedIn";
isSignedIn();

import { starSelection } from "./starSelection";
starSelection();

import { readData } from "./firebase/readData";
readData();

import { characterCount } from "./characterCount";
characterCount(".review-modal #reviewText", ".review-modal .reviewTextCounter");
characterCount(
  ".review-modal #reviewHeading",
  ".review-modal .reviewHeadingCounter"
);

import { buttonEffects } from "./headerAnimation";
buttonEffects();

import { seeMore } from "./seeMore";
seeMore();
