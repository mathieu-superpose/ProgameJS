const PageDetail = (argument) => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");


    const fetchGame = (url, argument) => {
      let finalURL = url + argument;

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          let { name, released, description, background_image } = response;
          let articleDOM = document.querySelector(".pageDetail .pageDetail__article");
          articleDOM.querySelector(".pageDetail__article__banner img").src = background_image;
          articleDOM.querySelector("h1.pageDetail__article__title").innerHTML = name;
          articleDOM.querySelector("p.pageDetail__article__releaseDate span").innerHTML = released;
          articleDOM.querySelector("p.pageDetail__article__description").innerHTML = description;
        });
    };

    fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="pageDetail">
        <div class="pageDetail__article">
          <div class="pageDetail__article__banner">
            <img class='pageDetail__article__banner__image' src="">
          </div>
          <h1 class="pageDetail__article__title"></h1>
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