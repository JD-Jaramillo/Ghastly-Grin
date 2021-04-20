const withAuth = require('../../utils/auth');
const { Game, User, Player } = require("../../models");


const router = require('express').Router();

router.get("/", function(req, res, next) {
  console.log(req.session.user_id);
  console.log(req.signedCookies.id);
  res.send("API is working properly");
});

router.post("/", async (req, res) => {
  console.log(req.session.user_id)
  try {
    const gameInit = await Game.create({
      game_owner: req.session.user_id
    });
    // const gameFind = await Game.findOne({
    //   where: {
    //     game_owner: req.session.user_id
    //   }
    // })
    // const gameFormat = JSON.parse(JSON.stringify(gameFind))
    // const playerInit = await Player.create({
    //   score: 0,
    //   game_id: gameFormat.id,
    //   user_id: req.session.user_id
    // })
    // const playerFind = await Player.findOne({
    //   where: {
    //     user_id: req.session.user_id
    //   }
    // })
    // const playerFormat = JSON.parse(JSON.stringify(playerFind))
    // req.session.save(() => {
      // req.session.player_id = playerFormat.id;
      res.send(req.session)
      res.status(200).json(gameInit)
    // })
    
    //Probably wont work, maybe make an array?

  } catch (err) {
    console.log(err);
    // res.status(400).json(err);
  }
})

router.delete("/", withAuth, async (req, res) => {
  try {
    const gameDelete = await Game.destroy({
      where: {
        game_owner: req.session.user_id,
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