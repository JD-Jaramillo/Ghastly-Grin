const withAuth = require('../../utils/auth');
const { Game, User, Player } = require("../../models");
const Answers = require('../../models/answers')



const router = require('express').Router();

router.get("/", async (req, res, next) => {
  console.log(req.session.game_id);
  try {
    const gameData = await Game.findOne({ 
      where: { id: req.session.game_id}
    })
    const formatData = await JSON.parse(JSON.stringify(gameData))
    res.status(200).json(formatData)
    res.send(req.session)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  console.log(req.session.user_id)
  try {
    await Game.destroy({
      where: { game_owner: req.session.user_id}
    })
    const gameInit = await Game.create({
      game_owner: req.session.user_id
    });
    const gameFind = await Game.findOne({
      where: {
        game_owner: req.session.user_id
      }
    })
    const gameFormat = JSON.parse(JSON.stringify(gameFind))
    const hand = [];
    let arr = Answers
    for (let i = 0; i < 7; i++) {
      const whiteCards = Math.floor(Math.random() * arr.length)
      hand.push(arr[whiteCards]);
      arr.splice(whiteCards, 1)
    }
    const playerInit = await Player.create({
      score: 0,
      cards: hand,
      game_id: gameFormat.id,
      user_id: req.session.user_id
    })
    const playerFind = await Player.findOne({
      where: {
        user_id: req.session.user_id
      }
    })
    const playerFormat = JSON.parse(JSON.stringify(playerFind))
    // req.session.save(() => {
      // req.session.player_id = playerFormat.id;
      console.log(playerInit)
      console.log(gameFormat)
      console.log(playerFormat)
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