import {getDocs,collection } from "firebase/firestore";

export async function getContacts({db,currentUser}) {
  const querySnapshot = await getDocs(collection(db, "users"));
  const fetchedUsers = querySnapshot.docs.map((doc) => doc.data());
  const fetchedCurrentUser = fetchedUsers.filter(
    (user) => user.email == currentUser.user.email
  );
  return [fetchedCurrentUser[0].friends , fetchedUsers];
}
