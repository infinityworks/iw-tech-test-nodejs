const RatingController = require('./src/controller/ratingController');
const AuthorityMapper = require('./src/mapper/authority');
const authorityMapper = AuthorityMapper();
const ratingController = RatingController(authorityMapper);
const App = require('./src/app')(ratingController);

App.run();
