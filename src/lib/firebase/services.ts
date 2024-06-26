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

// export async function LoginUsers(data: { email: string; password: string }) {
//   const q = query(
//     collection(firestore, "users"),
//     where("email", "==", data.email)
//   );
//   const querySnapshot = await getDocs(q);
//   const users = querySnapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
//   if (users) {
//     return users[0];
//   } else {
//     return null;
//   }
// }

export async function LoginUsers(data: { email: string; password: string }) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", data.email)
  );

  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return {
        status: false,
        statusCode: 404,
        message: "User not found",
      };
    }

    const user: any = querySnapshot.docs[0].data();
    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (passwordMatch) {
      return {
        status: true,
        statusCode: 200,
        message: "Login successful",
        user: {
          id: querySnapshot.docs[0].id,
          ...user,
        },
      };
    } else {
      return {
        status: false,
        statusCode: 401,
        message: "Invalid password",
      };
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      status: false,
      statusCode: 500,
      message: "Internal server error",
    };
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

// export async function RemoveWatchList(
//   email: string,
//   watchlistItem: {
//     id: string;
//     title: string;
//     poster_path: string;
//     vote_average: number;
//     release_date: string;
//     media_type: string;
//   }
// ) {
//   const userQuery = query(
//     collection(firestore, "users"),
//     where("email", "==", email)
//   );

//   try {
//     const userQuerySnapshot = await getDocs(userQuery);
//     const users: any = userQuerySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     if (users.length === 0) {
//       return {
//         status: false,
//         statusCode: 404,
//         message: "User not found",
//       };
//     }

//     const userId = users[0].id;
//     const userWatchlist = users[0].watchlist || [];
//     const itemExist = userWatchlist.some(
//       (item: any) => item.id === watchlistItem.id
//     );

//     if (!itemExist) {
//       return {
//         status: false,
//         statusCode: 400,
//         message: "Item not found in the watchlist",
//       };
//     } else {
//       const userDocRef = doc(firestore, "users", userId);
//       await updateDoc(userDocRef, {
//         watchlist: arrayRemove(watchlistItem),
//       });

//       return {
//         status: true,
//         message: "Watchlist item removed successfully",
//         statusCode: 200,
//       };
//     }
//   } catch (error) {
//     console.error("Error removing watchlist item:", error);
//     return {
//       status: false,
//       message: "Failed to remove watchlist item",
//       statusCode: 500,
//     };
//   }
// }

export async function getUserId(id: string) {
  try {
    const snapshot = await getDoc(doc(firestore, "users", id));

    if (!snapshot.exists()) {
      return {
        status: 404,
        message: "User not found",
      };
    }

    const data = snapshot.data();
    return {
      status: 200,
      message: "User found successfully",
      results: data.watchlist,
    };
  } catch (error) {
    console.error("Error getting user by ID:", error);
    return {
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
    if(userData.watchlist === undefined){
      await updateDoc(userDocRef, {
        watchlist: arrayUnion(),
      })
    }
    if (!isItemInWatchlist && userData.watchlist !== undefined) {
      return {
        status: 400,
        message: "Item already exists in the watchlist",
      };
    } else {
      await updateDoc(userDocRef, {
        watchlist: arrayUnion(watchlistItem),
        updateAt: new Date(),
      });
      return {
        status: 200,
        message: "added successfully",
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: "Failed to add watchlist item",
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
        message: "removed successfully",
        results: watchlistItem,
      };
    }
  } catch (error) {
    return {
      status: 500,
      message: "Failed to remove",
      results: null,
    };
  }
}

// TODO : Add more services
