import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

interface User {
  id: string;
  email: string;
  watchlist?: string[];
}

export async function RegisterUser(data: {
  username: string;
  password: string;
  email: string;
}) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );
  const querySnapshot = await getDocs(q);
  const users = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (users.length > 0) {
    return {
      status: false,
      statusCode: 400,
      message: "Email already exists",
    };
  } else {
    data.password = await bcrypt.hash(data.password, 10);
    try {
      await addDoc(collection(firestore, "users"), data);
      return {
        status: true,
        message: "User created successfully",
        statusCode: 200,
      };
    } catch (error) {
      return {
        status: false,
        message: "register failed",
        statusCode: 400,
      };
    }
  }
}
// export async function RegisterUser(data: {
//   username: string;
//   password: string;
//   email: string;
//   id: number;
// }) {
//   const q = query(
//     collection(firestore, "users"),
//     where("email", "==", data.email)
//   );
//   const querySnapshot = await getDocs(q);
//   const users = querySnapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));

//   if (users.length > 0) {
//     return {
//       status: false,
//       statusCode: 400,
//       message: "Email already exists",
//     };
//   } else {
//     data.password = await bcrypt.hash(data.password, 10);

//     // Get the current user count
//     const userCountQuery = await getDocs(collection(firestore, "users"));
//     const userCount = userCountQuery.docs.length;

//     // Set the user ID as the current user count
//     data.id = userCount + 1;

//     try {
//       await addDoc(collection(firestore, "users"), data);
//       return {
//         status: true,
//         message: "User created successfully",
//         statusCode: 200,
//       };
//     } catch (error) {
//       return {
//         status: false,
//         message: "Register failed",
//         statusCode: 400,
//       };
//     }
//   }
// }

export async function LoginUsers(data: { email: string; password: string }) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );
  const querySnapshot = await getDocs(q);
  const users = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (users) {
    return users[0];
  } else {
    return null;
  }
}

export async function GetAllUsers() {
  const q = query(collection(firestore, "users"));
  const querySnapshot = await getDocs(q);
  const users = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return users;
}

export async function AddWatchList(
  email: string,
  watchlistItem: {
    id: string;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    media_type: string;
  }
) {
  const userQuery = query(
    collection(firestore, "users"),
    where("email", "==", email)
  );
  const userQuerySnapshot = await getDocs(userQuery);
  const users: any = userQuerySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (users.length === 0) {
    return {
      status: false,
      statusCode: 404,
      message: "User not found",
    };
  }

  const userId = users[0].id;
  const userWatchlist = users[0].watchlist || [];
  const itemExist = userWatchlist.some(
    (item: any) => item.id === watchlistItem.id
  );

  if (itemExist) {
    return {
      status: false,
      statusCode: 400,
      message: "already exists in the watchlist",
    };
  } else {
    try {
      const userDocRef = doc(firestore, "users", userId);
      await updateDoc(userDocRef, {
        watchlist: arrayUnion(watchlistItem),
      });
      return {
        status: true,
        message: "Watchlist added successfully",
        statusCode: 200,
      };
    } catch (error) {
      return {
        status: false,
        message: `Failed to add watchlist ${error}`,
        statusCode: 400,
      };
    }
  }
}

export async function RemoveWatchList(
  email: string,
  watchlistItem: {
    id: string;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    media_type: string;
  }
) {
  const userQuery = query(
    collection(firestore, "users"),
    where("email", "==", email)
  );

  try {
    const userQuerySnapshot = await getDocs(userQuery);
    const users: any = userQuerySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (users.length === 0) {
      return {
        status: false,
        statusCode: 404,
        message: "User not found",
      };
    }

    const userId = users[0].id;
    const userWatchlist = users[0].watchlist || [];
    const itemExist = userWatchlist.some(
      (item: any) => item.id === watchlistItem.id
    );

    if (!itemExist) {
      return {
        status: false,
        statusCode: 400,
        message: "Item not found in the watchlist",
      };
    } else {
      const userDocRef = doc(firestore, "users", userId);
      await updateDoc(userDocRef, {
        watchlist: arrayRemove(watchlistItem),
      });

      return {
        status: true,
        message: "Watchlist item removed successfully",
        statusCode: 200,
      };
    }
  } catch (error) {
    console.error("Error removing watchlist item:", error);
    return {
      status: false,
      message: "Failed to remove watchlist item",
      statusCode: 500,
    };
  }
}

export async function GetDataUSer(email: string) {
  const userQuery = query(
    collection(firestore, "users"),
    where("email", "==", email)
  );

  try {
    const userQuerySnapshot = await getDocs(userQuery);
    const users: any = userQuerySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (users.length === 0) {
      return {
        status: false,
        statusCode: 404,
        message: "User not found",
      };
    }

    const userData = users[0];

    return {
      status: true,
      user: userData,
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error getting user by email:", error);
    return {
      status: false,
      message: "Failed to get user by email",
      statusCode: 500,
    };
  }
}

// TODO : Add more services
