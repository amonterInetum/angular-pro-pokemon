const TOTAL_POKEMONS = 10;
const TOTAL_PAGES = 5;


( async ()=>{
  const fs = require('fs');
  console.log("pepet")

  const pokemosnIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);
  const pagesIds = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);



  let fileContent = pokemosnIds.map(id => `/pokemon/${id}`).join('\n');
  fileContent += '\n';
  fileContent += pagesIds.map(id => `/pokemons/page/${id}`).join('\n');


  const pokemonNameList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`).then(res => res.json());

  fileContent += '\n';
  fileContent += pokemonNameList.results.map(pokemon => `/pokemon/${pokemon.name}`).join('\n');

  fs.writeFileSync('routes.txt', fileContent);


})();
