import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

export function signIn() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  function GoogleSignIn() {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.error(error.code)
        console.error(error.message)
      })
  }

  const signInButton = document.querySelector("footer .buttons .sign-in");
  signInButton.addEventListener("click", GoogleSignIn);

  function signOutUser() {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const signOutButton = document.querySelector("footer .buttons .sign-out");
  signOutButton.addEventListener("click", signOutUser);
}
