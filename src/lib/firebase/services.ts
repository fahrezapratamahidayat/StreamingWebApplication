import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";
import { update } from "firebase/database";

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
  createdAt?: Date;
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
    data.createdAt = new Date();
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

export async function getUserId(id: string) {
  try {
    const snapshot = await getDoc(doc(firestore, "users", id));

    if (!snapshot.exists()) {
      return {
        results: null,
        status: 404,
        message: "User not found",
      };
    }

    const data = snapshot.data();
    return {
      status: 200,
      message: "User found successfully",
      user: data,
    };
  } catch (error) {
    console.error("Error getting user by ID:", error);
    return {
      results: null,
      status: 500,
      message: "Failed to get user by ID",
    };
  }
}

export async function addMyList(
  id: string,
  watchlistItem: {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    media_type: string;
  }
) {
  try {
    const userDocRef = doc(firestore, "users", id);
    const snapshot = await getDoc(userDocRef);
    if (!snapshot.exists()) {
      return {
        status: 404,
        message: "User not found",
        results: null,
      };
    }
    const userData = snapshot.data();
    const isItemInWatchlist = userData.watchlist || [].some(
      (item: any) => item.id === watchlistItem.id
    );
    if (!isItemInWatchlist) {
      return {
        status: 400,
        message: "Item already exists in the watchlist",
        results: null,
      };
    } else {
      await updateDoc(userDocRef, {
        watchlist: arrayUnion(watchlistItem),
        updateAt: new Date(),
      });
      return {
        status: 200,
        message: "Watchlist item added successfully",
        results: watchlistItem,
      };
    }
  } catch (error) {
    console.log("Error adding item to watchlist:", error);
    return {
      status: 500,
      message: "Internal server error",
      results: null,
    };
  }
}

export async function RemoveMyList(
  id: string,
  watchlistItem: {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    media_type: string;
  }
) {
  try {
    const userDocRef = doc(firestore, "users", id);
    const snapshot = await getDoc(userDocRef);
    if (!snapshot.exists()) {
      return {
        status: 404,
        message: "User not found",
        results: null,
      };
    }
    const userData = snapshot.data();
    const isItemInWatchlist = userData.watchlist.some(
      (item: any) => item.id === watchlistItem.id
    );
    if (!isItemInWatchlist) {
      return {
        status: 400,
        message: "Item not found in the watchlist",
        results: null,
      };
    } else {
      await updateDoc(userDocRef, {
        watchlist: arrayRemove(watchlistItem),
        updateAt: new Date(),
      });
      return {
        status: 200,
        message: "Watchlist item removed successfully",
        results: watchlistItem,
      };
    }
  } catch (error) {
    console.error("Error removing item from watchlist:", error);
    return {
      status: 500,
      message: "Internal server error",
      results: null,
    };
  }
}

// TODO : Add more services
