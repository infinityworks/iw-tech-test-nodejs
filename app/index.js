const RatingController = require('./src/controller/ratingController');


const ratingController = RatingController();
const App = require('./src/app')(ratingController);

App.run();
