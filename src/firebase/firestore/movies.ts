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
    const moviesArr: Array<any> = [];
    querySnapshot.forEach((doc) => {
      if (doc.exists) {
        if (
          doc.data().genres.indexOf(genre) !== -1 &&
          doc.data().title !== title &&
          moviesArr.findIndex((movie) => movie.title === doc.data().title) ===
            -1
        ) {
          moviesArr.push(doc.data());
        }
      }
    });
    setMovies((prev: Array<any>) => {
      const old = [...prev];
      moviesArr.forEach((element) => {
        if (old.findIndex((movie) => movie.title === element.title) === -1)
          old.push(element);
      });
      return old;
    });
  });
  return unsubscribe;
};
