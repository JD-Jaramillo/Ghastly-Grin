const withAuth = require('../../utils/auth');
const { Game, User, Player } = require("../../models");


const router = require('express').Router();

router.get("/", function(req, res, next) {
  res.send("API is working properly");
});

router.post("/", withAuth, async (req, res) => {
  try {
    const gameInit = await Game.create({
      game_owner: req.session.id
    });
    const gameFind = await Game.findOne({
      where: {
        game_owner: req.session.id
      }
    })
    const playerInit = await Player.create({
      score: 0,
      game_id: gameFind.id,
      user_id: req.session.id
    })
    const playerFind = await Player.findOne({
      where: {
        user_id: req.session.id
      }
    })
    req.session.save(() => {
      req.session.player_id = playerFind.id;
    })
    //Probably wont work, maybe make an array?
    res.status(200).json(gameInit, playerInit)

  } catch (err) {
    res.status(400).json(err);
  }
})

router.delete("/", withAuth, async (req, res) => {
  try {
    const gameDelete = await Game.destroy({
      where: {
        game_owner: req.session.id,
      }
    });
    if (!gameDelete) {
      res.status(404).json({ message: "no game found with this id!"});
    }
    res.status(200).json(gameDelete)
  } catch (err) {
    res.status(400).json(err);
  }
})

module.exports = router;