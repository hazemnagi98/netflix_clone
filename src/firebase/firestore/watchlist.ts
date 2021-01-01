import { db, firestore } from "../firebase";

export const addToWatchlist = (movie: any, uid: string) => {
  db.collection("watchlist")
    .doc(uid)
    .set(
      {
        movies: firestore.FieldValue.arrayUnion(movie),
      },
      { merge: true }
    );
};

export const getWatchlist = (setWatchlist: any, uid: string) => {
  const unsubscribe = db
    .collection("watchlist")
    .doc(uid)
    .onSnapshot((doc: any) => {
      if (doc.exists) {
        const moviesArr: any[] = [];
        doc.data().movies.forEach((movie: any) => {
          moviesArr.push(movie);
        });
        setWatchlist(moviesArr);
      }
    });
  return unsubscribe;
};
