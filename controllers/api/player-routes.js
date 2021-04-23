const Sequelize = require("sequelize");
const { Player } = require('../../models');
const withAuth = require('../../utils/auth');
const Answers = require('../../models/answers')

const router = require('express').Router();

router.get("/", withAuth, async (req, res, next) => {
  console.log(req.session);
  try {
    const playerLobby = await Player.findAll({
      where: { game_id: req.session.game_id }
    })
    const lobby = await JSON.parse(JSON.stringify(playerLobby));
    res.send({ session: req.session, data: lobby })
    // res.status(200).json(lobby)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/cards", withAuth, async (req, res) => {
  try {
    const playerData = await Player.findOne({
      where: {user_id: req.session.user_id}
    })
    const formatPlayer = JSON.parse(JSON.stringify(playerData));
    res.status(200).json({cards: formatPlayer.cards, user_id: req.session.user_id})
  } catch (err) {
    res.status(500).json(err);
  }
})

router.post("/", withAuth, async (req, res) => {
  console.log(req.session)
  try {
    const hand = [];

    let arr = Answers
    for (let i = 0; i < 7; i++) {
      const whiteCards = await Math.floor(Math.random() * arr.length)
      await hand.push(arr[whiteCards]);
      await arr.splice(whiteCards, 1)
    }

    await Player.destroy({
      where: { user_id: req.session.user_id }
    })
    await Player.create({
      score: 0,
      cards: hand,
      game_id: req.body.id,
      user_id: req.session.user_id
    });
    const playerFind = await Player.findOne({
      where: {
        user_id: req.session.user_id
      }
    });
    const playerFormat = await JSON.parse(JSON.stringify(playerFind))
    console.log(playerFormat);
    req.session.player_id = playerFormat.id;
    req.session.game_id = req.body.id;
    res.send(req.session)
    res.status(200).json(newPlayer)
  } catch (err) {
    res.status(500).json(err);
  }
})

router.put("/card", withAuth, async (req, res) => {
  try {
    const findPlayer = await Player.findOne({
      where: {user_id: req.session.user_id}
    })
    const formatPlayer = JSON.parse(JSON.stringify(findPlayer));
    const cards = formatPlayer.cards;
    console.log(cards);
    const pos = cards.indexOf(req.body.card);
    await cards.splice(pos, 1);
    let arr = Answers
    for (const card of cards) {
      const cardInd = arr.indexOf(card)
      arr.splice(cardInd, 1)
    }
    const whiteCards = Math.floor(Math.random() * arr.length)
    await cards.push(arr[whiteCards])
    const updatePlayer = await Player.update(
      {cards: cards},
      {
        where: {
          user_id: req.session.user_id
        }
      }
    )
    if (!updatePlayer) {
      res.status(404).json({ message: "No player found with this id!" });
      return;
    }
    res.status(200).json(updatePlayer);
  } catch (err) {
    res.status(500).json(err);
  }

});

// MUST HAVE USER ID IN PARAMS, AND BODY SCORE
router.put("/score/:id", withAuth, async (req, res) => {
  try {
    const updatePlayer = await Player.update(
      { score: Sequelize.literal(`score + 1`) },
      {
        where: {
          user_id: req.params.id
        }
      }
    )
    if (!updatePlayer) {
      res.status(404).json({ message: "No player found with this id!" });
      return;
    }
    res.status(200).json(updatePlayer);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deletePlayer = await Player.destroy(
      {
        where: {
          user_id: req.params.id
        }
      }
    );
    if (!deletePlayer) {
      res.status(404).json({ message: "No player found with this id!" });
      return;
    };
    res.status(200).json(deletePlayer);
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router;