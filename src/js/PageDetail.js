const PageDetail = (argument) => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");


    const fetchGame = (url, argument) => {
      let finalURL = url + argument;

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          let { name, released, description, background_image, website, rating, ratings_count } = response;
          let bannerDOM = document.querySelector(".pageDetail .pageDetail__banner");
          bannerDOM.querySelector(".pageDetail__banner img").src = background_image;
          bannerDOM.querySelector(".pageDetail__banner__form").action = website;

          let articleDOM = document.querySelector(".pageDetail .pageDetail__article");
          articleDOM.querySelector("h1.pageDetail__article__head__title").innerHTML = name;
          articleDOM.querySelector("p.pageDetail__article__head__rating").innerHTML = `${rating}/5 - ${ratings_count} votes`;
          articleDOM.querySelector("p.pageDetail__article__releaseDate span").innerHTML = released;
          articleDOM.querySelector("p.pageDetail__article__description").innerHTML = description;

          if (name.length>20) articleDOM.querySelector("h1.pageDetail__article__head__title").style.fontSize = "24px";
        });
    };

    fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="pageDetail">
        <div class="pageDetail__banner">
          <img class='pageDetail__banner__image' src="">
          <form class="pageDetail__banner__form" action="">
            <input class='pageDetail__banner__button' type="submit" value="Check website" />
          </form>
        </div>
        <div class="pageDetail__article">
          <div class="pageDetail__article__head">
            <h1 class="pageDetail__article__head__title"></h1>
            <p class="pageDetail__article__head__rating"></p>
          </div>
          <p class="pageDetail__article__releaseDate">Release date : <span></span></p>
          <p class="pageDetail__article__description"></p>
        </div>
      </section>
    `;

    preparePage();
  };

  const setWelcome = () => {
        document.querySelector('.welcome').innerHTML = ``;
    };

  const setbutton = () => {
      document.querySelector('.showMore').innerHTML = ``;
  };

  setWelcome();
  setbutton();
  render();
};

export { PageDetail };