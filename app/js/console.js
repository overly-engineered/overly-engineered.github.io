(function () {
    console.log("%c Hey, my name is Jamie.", "color: rebeccapurple; font-size:14px; line-height: 2;");
    console.log("%c I make web apps and websites.", "color: rebeccapurple; font-size:14px; line-height: 2;");
    console.log("%c Did you know jamie is an object on window? Sure you can find out some things if you wanted to.", "color: rebeccapurple; font-size:14px;");
    var goTo = function (o) {
        window.open(o, "_blank")
    };
    window.jamie = {
        github: function () {
            goTo("https://github.com/overly-engineered")
        },
        codePen: function () {
            goTo("https://codepen.io/overlyenginnered/")
        },
        email: function () {
            goTo("jwrpettman@gmail.com")
        },
        twitter: function () {
            goTo("https://twitter.com/PettmanJamie")
        }
    }
})();