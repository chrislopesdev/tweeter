/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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

const createTweetElement = function (data) {
  const $tweet = $(`<article class="tweet">
      <header class="tweet__header">
        <div class="tweet__user">

          <img src="${data.user.avatars}" alt="person" class="tweet__headerImg">
          <h3 class="tweet__headerTitle">${data.user.name}</h3>
        </div>
        <h4 class="tweet__titleUser">${data.user.handle}</h4>
      </header>
      <main class="tweet__main">
        <p class="tweet__mainText">${data.content.text}</p>
      </main>
      <footer class="tweet__footer">
        <p class="tweet__footerText">${timeago.format(data.created_at)}</p>
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
    // console.log(tweet);
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
};

$(document).ready(() => {
  const $tweet = renderTweets(tweetData);
  $('#tweets-container').append($tweet);

  const form = $('.form');
  form.on('submit', function (e) {
    e.preventDefault();
    // console.log($(this).serialize());
    $.ajax({
      method: 'POST',
      url: 'http://localhost:8080/tweets/',
      data: $(this).serialize(),
      success(data) {
        console.log('success');
      },
    });
  });
});
