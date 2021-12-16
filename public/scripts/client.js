const tweetData = [
  {
    user: {
      name: 'Newton',
      avatars: 'https://i.imgur.com/73hZDYK.png',
      handle: '@SirIsaac',
    },
    content: {
      text: 'If I have seen further it is by standing on the shoulders of giants',
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: 'Descartes',
      avatars: 'https://i.imgur.com/nlhLi3I.png',
      handle: '@rd',
    },
    content: {
      text: 'Je pense , donc je suis',
    },
    created_at: 1461113959088,
  },
];

const escape = (string) => {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(string));
  return div.innerHTML;
};

const createTweetElement = function (data) {
  const $tweet = $(`<article class="tweet">
      <header class="tweet__header">
        <div class="tweet__user">

          <img src="${escape(data.user.avatars)}" alt="person" class="tweet__headerImg">
          <h3 class="tweet__headerTitle">${escape(data.user.name)}</h3>
        </div>
        <h4 class="tweet__titleUser">${escape(data.user.handle)}</h4>
      </header>
      <main class="tweet__main">
        <p class="tweet__mainText">${escape(data.content.text)}</p>
      </main>
      <footer class="tweet__footer">
        <p class="tweet__footerText">${timeago.format(escape(data.created_at))}</p>
        <div class="tweet__footerIcons">
          <i class="fa-solid fa-flag fa-sm"></i>
          <i class="fa-solid fa-retweet fa-sm"></i>
          <i class="fa-solid fa-heart fa-sm"></i>
        </div>
      </footer>
    </article>`);
  return $tweet;
};

const renderTweets = (tweets) => {
  for (tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
};

$(document).ready(() => {
  const form = $('#tweetform');

  $('.nav__link').on('click', () => {
    const $section = $('section.new-tweet');
    if ($section.is(':visible')) {
      $section.slideUp('fast');
    } else {
      $section.slideDown('fast');
    }
  });

  form.on('submit', function (e) {
    e.preventDefault();

    const formInput = $('textarea.form__input').val();

    if (!formInput) {
      $('.post-error').slideDown();
      $('.post-error').append('<h4><i class="fa-solid fa-triangle-exclamation"></i> Error: Tweets require at least one character.</h4>');
      setTimeout(() => $('.post-error').slideUp(), 5000);
    } else if (formInput.length > 140) {
      $('.post-error').slideDown();
      $('.error-container').prepend('<h4><i class="fa-solid fa-triangle-exclamation"></i> Error: You gots too many characterz.</h4>');
      setTimeout(() => $('.post-error').slideUp(), 5000);
    } else {
      $.ajax({
        method: 'POST',
        url: 'http://localhost:8080/tweets/',
        data: $(this).serialize(),
        success(data) {
          console.log('success');
          $('.post-error').slideUp();
          loadTweets();
        },
      });
      $('textarea').val('');
      $('textarea').focus();
      const counter = $('.form__counter');
      counter.val(140);
    }
  });

  const loadTweets = function () {
    $.ajax('http://localhost:8080/tweets', { method: 'GET' })
      .then(($tweet) => {
        $('.tweet').remove();
        renderTweets($tweet);
      });
  };

  loadTweets();
});
