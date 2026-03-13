import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model';
import bookmarksView from './views/bookmarksView';
import paginationView from './views/paginationView';
import recipeView from './views/recipeView';
import resultView from './views/resultView';
import searchView from './views/searchView';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async function () {
  try {
    // 0) Get recipe id
    const id = window.location.hash.slice(1);
    if (!id) return;

    // 1) Update result view to mark selected search result
    resultView.update(model.getSearchResultPage());

    bookmarksView.update(model.state.bookmarks);
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
    resultView.render(model.getSearchResultPage());

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
    resultView.renderError();
  }
};

const controlPagination = function (goToPage) {
  // 1) Render result
  resultView.render(model.getSearchResultPage(goToPage));

  // 2) Render initial pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // 1) Update recipe serving (in the state)
  model.updateServings(newServings);

  // 2) Update recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add or remove book mark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  // 2) Update UI
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  bookmarksView.addHandlerBookmarks(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
};
init();
