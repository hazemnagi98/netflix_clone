import { db } from "../firebase";

export const getMovies = async (setMovies: any) => {
  const unsubscribe = db.collection("movies").onSnapshot((querySnapshot) => {
    const moviesArr: any[] = [];
    querySnapshot.forEach((doc) => {
      if (doc.exists) {
        moviesArr.push(doc.data());
      }
    });
    setMovies(moviesArr);
  });
  return unsubscribe;
};

export const getGenreMovies = async (setMovies: any, genre: string) => {
  const unsubscribe = db.collection("movies").onSnapshot((querySnapshot) => {
    const moviesArr: any[] = [];
    querySnapshot.forEach((doc) => {
      if (doc.exists) {
        if (doc.data().genres.indexOf(genre) !== -1) moviesArr.push(doc.data());
      }
    });
    setMovies(moviesArr);
  });
  return unsubscribe;
};

export const getMovieByTitle = async (setMovie: any, title: string) => {
  const unsubscribe = db.collection("movies").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (doc.exists) {
        if (doc.data().title === title) {
          setMovie(doc.data());
        }
      }
    });
  });
  return unsubscribe;
};

export const getRelatedMovies = async (
  setMovies: any,
  genre: string,
  title: string
) => {
  const unsubscribe = db.collection("movies").onSnapshot((querySnapshot) => {
    const moviesArr: Set<any> = new Set();
    querySnapshot.forEach((doc) => {
      if (doc.exists) {
        if (
          doc.data().genres.indexOf(genre) !== -1 &&
          doc.data().title !== title
        )
          moviesArr.add(doc.data());
      }
    });
    setMovies((prev: Set<any>) => {
      Array.from(moviesArr).forEach((movie) => {
        prev.add(movie);
      });
      return new Set(prev);
    });
  });
  return unsubscribe;
};
