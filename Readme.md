Flix Premiere Smart TV
This app consists of a live movie stream app for smart tv's. It is the smart tv official application for https://flixpremiere.com/

Getting Started
1) Access to TV App Agency Engine site with your credentials.
2) In "Apps" click in "Applications" and search flixpremiere_stv.
3) In in "flixpremeire_stv" and copy the url of the SVN repository.
4) Create the local repository using your SVN tool.
5) Run the debug.html file on your IDE.


Prerequisites
-- none --



API Reference
This link contains all the API documentation for the flix premiere project:
https://staging.flixpremiere.com/api/docs/ {credentials: user: 'tvappagency', password: 'FlixTV45'}

This link contains all the endpoints for the CMS developed by TV App Agency for Flix Premiere:
http://flixpdev.tvappagency.com:7000/api

For additional info ask your project manager for permissions to the basecamp project page:
https://tvappagencyltd.basecamphq.com/projects/13536187-tv-app-flix-premiere/log



Contributors
Raphael Courtenay (raphael@tvappagency.com - London's Office)
André Freitas (freitas@tvappagency.com - Madeira's Office)

Versioning
Please consult the project's SVN log for the informations refering to Versioning.

API Error Codes

CMS Endpoints
moviesHome: 101, //'menu/54?cascade=1',
movie: 102, //'movies/',
related: 103, //'movies/[ID]/related?cascade=2',
autoComplete: 104, //'autocomplete?q=[KEY]',
searchMovie: 105, //'search/[TITLE]?cascade=2',
searchCast: 106, //'movies/[NAME]/list?cascade=2',
searchGenre: 107, //'genres/[GENRE]/list?cascade=2',
menu: 108, //'menu',

Flix Endpoints
signin: 201, //'auth/signin',
register: 202, //'auth/become-member',
user: 203, //'auth/me',
watchMovie: 204, //'films/[ID]/watch',
help: 205, //'info/help/[LANG]',
terms: 206, //'info/terms/[LANG]',
privacy: 207, //'info/privacy/[LANG]',
moviePass: 208, //'films/[ID]/pass-status',
getReminders: 209, //'member/reminders',
emailAddCard: 210, //'member/email-add-card',
useTicket: 211, //'films/[ID]/authorise-ticket',
languages: 212, //'info/language/tv',
storeCard: 213, //'member/wallet/cards',
checkPinSet: 214, //'parental-control/check-pin-isset',
setPin: 215, //'parental-control/set-pin',
setRestriction: 216, //'parental-control/set-restriction',
verifyPin: 217, //'parental-control/verify-pin',
changePin: 218, //'parental-control/set-pin',
recoverPin: 219, //'parental-control/recover-pin',
updateSeek: 220, //'viewing-pass/[PASSID]/seek',
reviewMovie: 221, //'films/[ID]/review',
buyTickets: 222, //'member/wallet/purchase-ticket',
myMovies: 223, //'member/films',
restrictionsInfo: 224, //'info/parental-control/[LANG]',
setReminder: 225, //'films/[ID]/register-interest',
pinToWatch: 226, //'parental-control/is-pin-required/[ID]',
locale: 227, //'info/locale/stripe'
subtitles: 228, //subtitles
storeCardGet: 229, //get stored cards
cancelReminder: 230, //cancel reminder
homeFilms: 231, //get home movies
getTickets: 232,
about: 233,

Third Party Endpoints
stripe: 301