const RatingController = require('./ratingController');
const App = require('./app')(RatingController);

App.run();
