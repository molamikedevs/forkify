import icons from 'url:../../img/icons.svg';
import View from './View';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage,
    );

    let buttons = '';
    if (curPage > 1) buttons += this._generateButton(curPage - 1, 'prev');
    if (curPage < numPages)
      buttons += this._generateButton(curPage + 1, 'next');

    return buttons;
  }

  _generateButton(page, type) {
    const icon =
      type === 'prev'
        ? `${icons}#icon-arrow-left`
        : `${icons}#icon-arrow-right`;

    const label = type === 'prev' ? `Page ${page}` : `Page ${page}`;

    const className =
      type === 'prev' ? 'pagination__btn--prev' : 'pagination__btn--next';

    return `
      <button data-goto="${page}" class="btn--inline ${className}">
        ${
          type === 'prev'
            ? `<svg class="search__icon"><use href="${icon}"></use></svg>`
            : ''
        }
        <span>${label}</span>
        ${
          type === 'next'
            ? `<svg class="search__icon"><use href="${icon}"></use></svg>`
            : ''
        }
      </button>
    `;
  }
}

export default new PaginationView();
