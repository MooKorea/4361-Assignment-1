import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export function submitForm() {
  const getSubmitButton = document.querySelector(
    "footer .buttons .submit-test"
  );
  async function submitTest() {
    try {
      const docRef = await addDoc(collection(db, "Test Thing"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  getSubmitButton.addEventListener("click", submitTest);
}
