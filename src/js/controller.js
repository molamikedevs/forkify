import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import recipeView from './views/recipeView';
import resultView from './views/resultView';
import searchView from './views/searchView';

if (module.hot) {
  module.hot.accept();
}

const controlRecipe = async function () {
  try {
    // 1) Get recipe id
    const id = window.location.hash.slice(1);
    if (!id) return;

    // 2) Display a spinner and load recipe
    recipeView.spinner();
    await model.loadRecipe(id);

    // 3) Render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    // 1)Display spinner and get query
    resultView.spinner();
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load result
    await model.loadSearchResults(query);
    // console.log(model.state.search.results);

    // 3) Render result
    resultView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
    resultView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResult);
};
init();
