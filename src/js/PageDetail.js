const PageDetail = (argument) => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");


    const fetchGame = (url, argument) => {
      let finalURL = url + argument;

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          let { name, released, description, background_image } = response;
          let articleDOM = document.querySelector(".page-detail .article");
          articleDOM.querySelector(".banner img").src = background_image;
          articleDOM.querySelector("h1.title").innerHTML = name;
          articleDOM.querySelector("p.release-date span").innerHTML = released;
          articleDOM.querySelector("p.description").innerHTML = description;
        });
    };

    fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-detail">
        <div class="article">
          <div class="banner">
            <img class='page-list__articles__cardGame__cardImage-image' src="">
          </div>
          <h1 class="title"></h1>
          <p class="release-date">Release date : <span></span></p>
          <p class="description"></p>
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