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
            console.log(article.background_image);
            if (article.background_image!==null){
              articles += `
                  <div class="page-list__articles__cardGame">
                    <img class='miniimage' src="${article.background_image}">
                    <h3 href = "#pagedetail/${article.id}">${article.name}</h3>
                    <div></div>
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