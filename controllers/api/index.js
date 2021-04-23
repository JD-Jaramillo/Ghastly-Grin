const router = require('express').Router();

const userRoutes = require('./user-routes');
const gameRoutes = require('./game-routes');
const playerRoutes = require('./player-routes');
const roundRoutes = require('./round-routes');
const deckRoutes = require('./deck-routes');

router.use('/user', userRoutes);
router.use('/game', gameRoutes);
router.use('/player', playerRoutes);
router.use('/round', roundRoutes);
router.use('/deck', deckRoutes);

module.exports = router;