import apikey from "./apikey";

const Home = (argument) => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";

    const fetchList = (url, argument) => {

      let finalURL = url;
      if (argument) {
        finalURL = url + argument;
      }else{
        finalURL = url + '&dates=2022-01-01,2022-12-31';
      }
      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          response.results.forEach((article) => {
            let hardware = '';
            if (article.platforms!==null){
              article.platforms.forEach((machine) => {
              hardware += `<img class='page-list__articles__cardGame-platformImage' src="./src/images/${machine.platform.slug}.svg">`
              });
            }
            
            if (article.background_image!==null){
              articles += `
                  <div class="page-list__articles__cardGame">
                    <div class="page-list__articles__cardGame__cardImage">
                      <img class='page-list__articles__cardGame__cardImage-image' src="${article.background_image}">
                    </div>
                    <h3 href = "#pagedetail/${article.id}">${article.name}</h3>
                    ${hardware}
                  </div>
                `;
            }
          });
          document.querySelector(".page-list .page-list__articles").innerHTML = articles;
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