import apikey from "./apikey";

const Home = (argument, requestNumber=0) => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";

    const fetchList = (url, argument) => {

      let finalURL = url;
      if (argument) {
        finalURL = url + argument;
      }else{
        finalURL = url + '&dates=2021-01-01,2021-12-31';
      }
      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          if (requestNumber===0&&response.results.length>9)response.results=response.results.slice(0,9);
          response.results.forEach((article) => {
            let hardware = '';
            if (article.platforms!==null){
              article.platforms.forEach((machine) => {
              hardware += `<img class='page-list__articles__cardGame-platformImage' src="./src/images/${machine.platform.slug}.svg">`
              });
            }
            let bgr_image ='';
            if (article.background_image!==null)bgr_image=article.background_image;
            if (article.background_image==null)bgr_image='./src/images/the_hype_progame_logo.svg';
            if (article.name.length>28)article.name= article.name.slice(0,28);
              articles += `
                  <div class="page-list__articles__cardGame">
                    <div class="page-list__articles__cardGame__cardImage">
                      <img class='page-list__articles__cardGame__cardImage-image' src="${bgr_image}">
                    </div>
                    <h3 href = "#pagedetail/${article.id}">${article.name}</h3>
                    ${hardware}
                  </div>
                `;
          });
          document.querySelector(".page-list .page-list__articles").innerHTML = articles;
          if (requestNumber===0) document.querySelector(".showMore").innerHTML = `<button class='showMore__showMoreButton'>Show More...</button>`;
        });
    };

    fetchList(`https://api.rawg.io/api/games?key=${apikey}`, cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <div class="page-list__articles">...loading</div>
      </section>
    `;

    preparePage();
  };

  render();
};

export default Home;