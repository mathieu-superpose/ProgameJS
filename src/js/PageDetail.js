const PageDetail = (argument) => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");

    const fetchGame = (url, argument) => {
      let finalURL = url + argument;

      const getRating = (rating, ratings_count) => {
        return `${rating}/5 - ${ratings_count} votes`;
      };

      const getPlatforms = (platforms) => {
        return platforms.map(plat=> plat.platform.name).join('<br>');
      };

      const getGenres = (genres) => {
        return genres.map(genre=> genre.name).join('<br>');
      };

      const getTags = (tags) => {
        return tags.map(tag=> tag.name).reduce((r, e, i) =>
        (i % 4 ? r[r.length - 1].push(e) : r.push([e])) && r, []).join('<br>').replace(/,/g, ',  ');
      };

      const getStores = (stores) => {
        return stores.map(str=>`<a class="pageDetail__article__buy__stores__link" href="${str.url}">${str.store.name}</a>`).join('<br>');
      }
 
      fetch(`${finalURL}`)
      .then((response) => response.json())
      .then((response) => {
        
        let { name, released, description, background_image, website, rating, ratings_count, developers, platforms, publishers, genres, tags, stores, clip, slug } = response;

        let pageDetailDOM = document.querySelector(".pageDetail");

        let bannerDOM = pageDetailDOM.querySelector(".pageDetail__banner");
        bannerDOM.querySelector(".pageDetail__banner img").src = background_image;
        bannerDOM.querySelector(".pageDetail__banner__form").action = website;

        let articleDOM = pageDetailDOM.querySelector(".pageDetail__article");
        articleDOM.querySelector("h1.pageDetail__article__head__title").innerHTML = name;
        articleDOM.querySelector("h3.pageDetail__article__head__rating").innerHTML = getRating(rating, ratings_count);
        articleDOM.querySelector("p.pageDetail__article__description").innerHTML = description;

        let details1DOM = articleDOM.querySelector(".pageDetail__article__details1");
        details1DOM.querySelector("p.pageDetail__article__details1__releaseDate span").innerHTML = released;
        details1DOM.querySelector("p.pageDetail__article__details1__developer span").innerHTML = developers[0].name;
        details1DOM.querySelector("p.pageDetail__article__details1__platforms span").innerHTML = getPlatforms(platforms);
        details1DOM.querySelector("p.pageDetail__article__details1__publishers span").innerHTML = publishers[0].name;
        
        let details2DOM = articleDOM.querySelector(".pageDetail__article__details2");
        details2DOM.querySelector("p.pageDetail__article__details2__genres span").innerHTML = getGenres(genres);
        details2DOM.querySelector("p.pageDetail__article__details2__tags span").innerHTML = getTags(tags);

        let buyDOM = articleDOM.querySelector(".pageDetail__article__buy");
        buyDOM.querySelector("p.pageDetail__article__buy__stores span").innerHTML = getStores(stores);

        let trailerDOM = articleDOM.querySelector(".pageDetail__article__trailer");
        trailerDOM.querySelector("video.pageDetail__article__trailer__video").src = clip.clip;

        if (name.length>20) articleDOM.querySelector("h1.pageDetail__article__head__title").style.fontSize = "24px";

        let screenDOM = articleDOM.querySelector(".pageDetail__article__screenshots");

        fetch(`${finalURL}/screenshots?page_size=4`)
        .then((response) => response.json())
        .then((response) => {
          let screenshots = response.results;
            screenshots.forEach(image =>
              screenDOM.querySelector(".pageDetail__article__screenshots__container").innerHTML += `
              <img class='pageDetail__article__screenshots__container__image' src="${image.image}">
              `)
        });
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
            <h3 class="pageDetail__article__head__rating"></h3>
          </div>

          <p class="pageDetail__article__description"></p>

          <div class="pageDetail__article__details1">
            <p class="pageDetail__article__details1__releaseDate"><b>Release date</b><br><span></span></p>
            <p class="pageDetail__article__details1__developer"><b>Developer</b><br><span></span></p>
            <p class="pageDetail__article__details1__platforms"><b>Platforms</b><br><span></span></p>
            <p class="pageDetail__article__details1__publishers"><b>Publisher</b><br><span></span></p>
          </div>
          <div class="pageDetail__article__details2">
            <p class="pageDetail__article__details2__genres"><b>Genres</b><br><span></span></p>
            <p class="pageDetail__article__details2__tags"><b>Tags</b><br><span></span></p>
          </div>
          <div class="pageDetail__article__buy">
            <h1 class="pageDetail__article__buy__title">BUY</h1>
            <p class="pageDetail__article__buy__stores"><span></span></p>
          </div>
          <div class="pageDetail__article__trailer">
            <h1 class="pageDetail__article__trailer__title">TRAILER</h1>
            <video class="pageDetail__article__trailer__video" controls><source src="" type="video/mp4"></video>
          </div>
          <div class="pageDetail__article__screenshots">
            <h1 class="pageDetail__article__screenshots__title">SCREENSHOTS</h1>
            <div class='pageDetail__article__screenshots__container'></div>
          </div>            
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