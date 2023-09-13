import {getDocs,collection, Firestore, DocumentData } from "firebase/firestore";



export async function getContacts({db,currentUser} : {db:Firestore,currentUser:DocumentData}) {
  const querySnapshot = await getDocs(collection(db, "users"));
  const fetchedUsers = querySnapshot.docs.map((doc) => doc.data());
  console.log({fetchedUsers,currentUser})
  const fetchedCurrentUser = fetchedUsers.filter(
    (user) => user.name == currentUser.user.displayName
    );
  return [fetchedCurrentUser[0].friends , fetchedUsers];
}
