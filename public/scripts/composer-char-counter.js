// runs a callback when DOM is ready to be manipulated
$(document).ready(() => {
  // eslint-disable-next-line prefer-arrow-callback
  const counter = $('.form__counter');
  counter.append(140);

  $('textarea.form__input').on('keyup', function (e) {
    e.preventDefault();
    counter.val(140 - this.value.length);
    if (this.value.length > 140) {
      counter.addClass('invalid');
    } else {
      counter.removeClass('invalid');
    }
  });
});
