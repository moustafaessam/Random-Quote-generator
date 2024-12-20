const colors = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857",
];

$("document").ready(() => {
  changeTheme();
  $("#new-quote").click(() => {
    changeTheme();
  });
});

const changeTheme = () => {
  fetch(
    "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const randomColorIndex = Math.floor(Math.random() * colors.length);
      const randomColor = colors[randomColorIndex];
      $(":root").get(0).style.setProperty("--main-color", randomColor);
      const totalQuotes = data.quotes.length - 1;
      const randomQuote = Math.floor(Math.random() * totalQuotes + 1);
      const quoteText = data.quotes[randomQuote].quote;
      const quoteAuthor = data.quotes[randomQuote].author;
      const hrefTwitter = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=%22${quoteText.replace(
        / /g,
        "%20"
      )}%22%20${quoteAuthor.replace(/ /g, "%20")}`;
      const hrefTumblr = `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=Chinese%20Proverb&content=${quoteText.replace(
        / /g,
        "%20"
      )}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`;
      $("#text").text(quoteText);
      $("#author").text(`- ${quoteAuthor}`);
      $("#tweet-quote").attr("href", hrefTwitter);
      $("#tumblr-quote").attr("href", hrefTumblr);
    });
};

$(".hover").hover(
  function () {
    // On hover, change the background color to red
    this.style.opacity = "0.7";
  },
  function () {
    // On mouse leave, revert to the original background color
    this.style.opacity = "1";
  }
);
