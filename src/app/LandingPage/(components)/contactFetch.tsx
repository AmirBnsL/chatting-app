import {getDocs,collection, Firestore} from "firebase/firestore";



export async function getAllFbUser(db:Firestore) {
  const querySnapshot = await getDocs(collection(db, "users"));
  const fetchedUsers = querySnapshot.docs.map((doc) => doc.data());  
  return [ fetchedUsers];
}
