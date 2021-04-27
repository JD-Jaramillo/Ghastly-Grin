const Sequelize = require("sequelize");
const { Player, Deck, User } = require('../../models');
const withAuth = require('../../utils/auth');
const Answers = require('../../models/answers')

const router = require('express').Router();

router.get("/", withAuth, async (req, res, next) => {
  try {
    const playerLobby = await Player.findAll({
      where: { game_id: req.session.game_id }
    })
    const lobby = await JSON.parse(JSON.stringify(playerLobby));
    res.send({ session: req.session, data: lobby })
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/cards", withAuth, async (req, res) => {
  try {
    const playerData = await Player.findOne({
      where: { user_id: req.session.user_id }
    })
    const formatPlayer = JSON.parse(JSON.stringify(playerData));
    res.status(200).json({ cards: formatPlayer.cards, user_id: req.session.user_id })
  } catch (err) {
    res.status(500).json(err);
  }
})

router.post("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { id: req.session.user_id }
    })
    const formatUser = JSON.parse(JSON.stringify(userData))
    await Player.destroy({
      where: { user_id: req.session.user_id }
    })
    await Player.create({
      score: 0,
      username: formatUser.username,
      cards: [],
      game_id: req.body.id,
      user_id: req.session.user_id
    });
    const playerFind = await Player.findOne({
      where: {
        user_id: req.session.user_id
      }
    });
    const playerFormat = await JSON.parse(JSON.stringify(playerFind))
    req.session.player_id = playerFormat.id;
    req.session.game_id = req.body.id;
    res.status(200).json(req.session)
  } catch (err) {
    res.status(500).json(err);
  }
})

router.put("/card", withAuth, async (req, res) => {
  try {
    const findPlayer = await Player.findOne({
      where: { user_id: req.session.user_id }
    })
    const formatPlayer = JSON.parse(JSON.stringify(findPlayer));
    const cards = formatPlayer.cards;
    const pos = cards.indexOf(req.body.card);
    await cards.splice(pos, 1);
    const deckFind = await Deck.findOne({ where: { game_id: req.session.game_id } });
    const formatDeck = JSON.parse(JSON.stringify(deckFind))
    let arr = formatDeck.answers
    const whiteCards = await Math.floor(Math.random() * arr.length)
    await cards.push(arr[whiteCards])
    const updatePlayer = await Player.update(
      { cards: cards },
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

router.put("/hand", withAuth, async (req, res) => {
  try {
    const deckFind = await Deck.findOne({ where: { game_id: req.session.game_id } });
    const formatDeck = JSON.parse(JSON.stringify(deckFind))
    const hand = [];
    let arr = formatDeck.answers
    for (let i = 0; i < 7; i++) {
      const rng = await Math.floor(Math.random() * arr.length)
      await hand.push(arr[rng]);
      await arr.splice(rng, 1)
    }
    const updatePlayer = await Player.update(
      { cards: hand },
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