import { getDocs, collection, getFirestore, doc, getDoc, query, where, addDoc, updateDoc } from "firebase/firestore";
import app from "./init";
import bcrypt from 'bcrypt';

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
  const snapshoot = await getDocs(collection(firestore, collectionName));
  const data = snapshoot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshoot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshoot.data();
  return data;
}

export async function register(
  data: {
    fullname: string,
    email: string,
    password: string,
    role?: string
  },
) {
  const q = query(collection(firestore, "users"), where('email', '==', data.email));
  const snapshoot = await getDocs(q);
  const users = snapshoot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (users.length > 0) {
    return { status: false, message: 'Email already exist', statusCode: 400 };
  } else {
    data.role = 'admin';
    data.password = await bcrypt.hash(data.password, 10);
    try {
      await addDoc(collection(firestore, "users"), data);
      return { status: true, message: 'Register Successful', statusCode: 200 };
    } catch (error) {
      return { status: false, message: 'Register failed', statusCode: 400 }
    }
  }
}

export async function login(
  data: {
    email: string
  }
) {
  const q = query(collection(firestore, "users"), where('email', '==', data.email));
  const snapshot = await getDocs(q);
  const user = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (user) {
    return user[0];
  } else {
    return null;
  }
}

export async function loginWithGoogle(
  data: any,
  callbacks: any
) {
  const q = query(collection(firestore, "users"), where('email', '==', data.email));
  const snapshot = await getDocs(q);
  const user: any = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (user.length > 0) {
    data.role = user[0].role
    await updateDoc(doc(firestore, "users", user[0].id), data).then(() => {
      callbacks({ status: true, data: data });
    })
  } else {
    data.role = 'member';
    await addDoc(collection(firestore, 'users'), data).then(() => {
      callbacks({ status: true, data: data });
    });
  }
}