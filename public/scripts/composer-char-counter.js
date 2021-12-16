$(document).ready(() => {
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

  const rootElement = document.documentElement;
  const scrollBtn = $('#scroll-button');

  const handleScroll = () => {
    const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
    if ((rootElement.scrollTop / scrollTotal) > 0.2) {
      scrollBtn.addClass('scroll-button-show');
    } else {
      scrollBtn.removeClass('scroll-button-show');
    }
  };

  document.addEventListener('scroll', handleScroll);

  scrollBtn.on('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
