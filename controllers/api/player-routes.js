const Sequelize = require("sequelize");
const { Player } = require('../../models');
const withAuth = require('../../utils/auth');

const router = require('express').Router();

router.get("/", withAuth, async (req, res, next) => {
  console.log(req.session);
  try {
    const playerLobby = await Player.findAll({
      where: {game_id: req.session.game_id}
    })
    const lobby = await JSON.parse(JSON.stringify(playerLobby));
    res.send({session: req.session, data: lobby})
    res.status(200).json(lobby)
  } catch (err) {
    res.status(500).json(err);
  }
});

// MUST BE CALLED WITH A GAME_ID IN BODY
router.post("/", withAuth, async (req, res) => {
  console.log(req.session)
  try {
    await Player.destroy({
      where: { user_id: req.session.user_id }
    })
    const newPlayer = await Player.create({
      score: 0,
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

// MUST HAVE USER ID IN PARAMS, AND BODY SCORE
router.put("/score/:id", withAuth, async (req, res) => {
  try {
    const updatePlayer = await Player.update(
      { score: Sequelize.literal(`score + ${req.body.score}`) },
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