import { $, $$ } from '../utils/dom';

import LottoModel from '../model/LottoModel';

import ResultView from '../view/resultView';
import InputView from '../view/inputView';

export default class LottoController {
  constructor() {
    this.lottoModel = new LottoModel();
    this.resultView = new ResultView();
    this.inputView = new InputView();
  }

  init() {
    this.initDOMs();
    this.bindEvent();
  }

  initDOMs() {
    this.$lottoPriceForm = $('#lotto-price-form');
    this.$lottoPriceInput = $('#lotto-price-input');
    this.$lottoPriceButton = $('#lotto-price-button');
    this.$result = $('#result');
  }

  bindEvent() {
    this.$lottoPriceForm.addEventListener('submit', this.handleLottoPriceButtonSubmit.bind(this));
  }

  initAfterRenderResult() {
    this.initDOMsAfterRenderResult();
    this.bindEventAfterRenderResult();
  }

  initDOMsAfterRenderResult() {
    this.$checkbox = $('#view-checkbox');
  }

  bindEventAfterRenderResult() {
    this.$checkbox.addEventListener('change', this.handleCheckBoxChange.bind(this));
    this.$result.addEventListener('click', this.handleResultButtonClick.bind(this));
  }

  handleLottoPriceButtonSubmit(event) {
    event.preventDefault();

    const lottoPriceInput = this.$lottoPriceInput.valueAsNumber;

    try {
      this.lottoModel.buyLottos(lottoPriceInput);

      this.resultView.renderResult(this.lottoModel.getLottoCount());
      this.initAfterRenderResult();
      this.inputView.renderWinningNumbersInput();
    } catch (err) {
      alert(err.message);
    }
  }

  handleCheckBoxChange({ target }) {
    if (target.checked) {
      this.resultView.renderLottos(this.lottoModel.getLottos());
      return;
    }
    this.resultView.initLottos();
  }

  handleResultButtonClick({ target }) {
    if (target.id !== 'check-result-button') return;

    const $winningNumberInputs = $$('.winning-number-input');
    const $bonusNumberInput = $('.bonus-number-input');

    const winnerNumberArray = Array.from($winningNumberInputs).map(($winnnigNumberInput) => $winnnigNumberInput.valueAsNumber);
    const bonusNumber = $bonusNumberInput.valueAsNumber;

    try {
      this.lottoModel.setWinningLottoNumbers(winnerNumberArray, bonusNumber);
    } catch (err) {
      alert(err.message);
    }
  }
}
