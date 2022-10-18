const space = document.querySelector("#cardsSpace");
let url;
var result = [];
var ingredientes = [];

//função chamada após clicar no botão de pesquisar
function BotaoPesquisa() {

    while (space.firstChild) {
        space.removeChild(space.firstChild);
    }

    url = `https://api.edamam.com/api/recipes/v2?type=any&q=${document.querySelector("#textoPesquisa").value}&app_id=31f018c4&app_key=f8a8f12e2b92a9bf2a465fb18893d853`;

    //chamando a função que pegará os resultados da pesquisa a partir da url passada acima
    PegarDados(url);
}

  const PegarDados = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  result = data.hits;

  //chamando a função que criará os cards
  Cards(result);
};

function Cards(data) {
  console.log(data);

  for (i = 0; i < data.length; i++) {

    //div do card
    let divCard = document.createElement("div");
    divCard.className = "divs";
    space.appendChild(divCard);

    //título do card
    let paragrafo = document.createElement("h3");
    paragrafo.innerText = data[i].recipe.label;
    divCard.appendChild(paragrafo);

    //imagem do card
    let newImg = document.createElement("img");
    newImg.src = data[i].recipe.image;
    divCard.appendChild(newImg);

    // detalhes (ingredientes e tals)
    let ingredientes = document.createElement("details");

    // título "ingredientes"
    let summaryIngredientes = document.createElement("summary");
    summaryIngredientes.textContent = "Ingredientes";
    ingredientes.appendChild(summaryIngredientes);

    // nome dos ingredientes vindos da api
    data[i].recipe.ingredientLines.map( x => {
        let li = document.createElement("li");
        li.textContent = x;
        ingredientes.appendChild( li );  
    });
    
    //colocando a tag criada no card
    divCard.appendChild(ingredientes);
    
    /////////// daqui para baixo são inf. nutricionais
    
    // detalhes (das informações nutricionais)
    let infNutri = document.createElement("details");
    
    // título "inf. nutricionais"
    let summaryInfNutri = document.createElement("summary");
    summaryInfNutri.textContent = "Inf. Nutricionais";
    infNutri.appendChild(summaryInfNutri);
    
    // nome dos ingredientes vindos da api
    data[i].recipe.digest.map( x => {
        let li = document.createElement("li");
        li.textContent = `${x.label}: ${x.total.toFixed(3)}g`;
        infNutri.appendChild( li );  
    });
    
    
    //colocando a tag criada no card
    divCard.appendChild(infNutri);
  }
}