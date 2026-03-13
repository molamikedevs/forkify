import View from './View';
import previewView from './previewView';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage =
    'Search recipe is not available, kindly try valid names like (pasta, pizza)';
  _successMessage = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultView();
