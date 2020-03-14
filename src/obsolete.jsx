addtoFavs = movie => {
  if (
    Object.entries(this.state.favmovies).length === 0 &&
    this.state.favmovies.constructor === Object
  ) {
    let favmovies = movie;
    this.setState({ favmovies });
  }

  let counter;

  if (counter === null) {
    let favmovies = movie;
    this.setState({ favmovies: movie });
    counter++;
  } else {
    let pass;

    for (let key in this.state.favmovies) {
      console.log(key, this.state.favmovies[key]);
    }

    this.state.favmovies.forEach(element => {
      if (movie.map(obj => obj._id) === element.map(obj => obj._id)) {
        pass = false;
      } else {
        pass = true;
      }
    });

    if (pass) {
      console.log("passed");
      const favmovies = [...this.state.favmovies];
      favmovies.push(movie);
      this.setState({ favmovies });
    } else if (!pass) {
      console.log("not passed");
      const favmovies = [...this.state.favmovies];
      favmovies.splice(movie);
      this.setState({ favmovies });
    }
  }
};

calcPages = moviewithliked => {
  let copyofmovies = [...moviewithliked];
  let pagecounter = 0;
  let arraywithmovies = [];
  const moviesperpage = 4;
  let arraywithpages = [];

  for (let i = 0; i <= copyofmovies.length; i++) {
    pagecounter++;
    arraywithmovies.push(copyofmovies[i]);
    //copyofmovies.splice(copyofmovies[i], 1);
    if (pagecounter === moviesperpage) {
      arraywithpages.push(arraywithmovies);
      pagecounter = 0;
      arraywithmovies = [];
      copyofmovies.splice(copyofmovies[i], 4);
      i = -1;
    }
  }
  let movies = arraywithpages;
  return { movies };
};
