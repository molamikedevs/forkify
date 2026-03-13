import View from './View';

class PreviewView extends View {
  _parentElement = '';

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    const { id: _id, title, publisher, image } = this._data;
    return `
      <li class="preview">
            <a class="preview__link ${_id === id ? 'preview__link--active' : ''}" href="#${_id}">
              <figure class="preview__fig">
                <img src="${image}" alt="${title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${title}</h4>
                <p class="preview__publisher">${publisher}</p>
              </div>
            </a>
      </li>
    `;
  }
}

export default new PreviewView();
