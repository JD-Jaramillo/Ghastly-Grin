const Sequelize = require("sequelize");
const { Player } = require('../../api/models');
const withAuth = require('../../utils/auth');

const router = require('express').Router();

router.get("/", function(req, res, next) {
  res.json("API is working properly");
});

// MUST BE CALLED WITH A GAME_ID IN BODY
router.post("/", withAuth, async (req, res) => {
  try {
    const playerInit = await Player.create({
      score: 0,
      game_id: req.body.game_id,
      user_id: req.session.user_id
    });
    const playerFind = await Player.findOne({
      where: {
        user_id: req.session.user_id
      }
    });
    req.session.save(() => {
      req.session.player_id = playerFind.id;
    });
    res.status(200).json(playerInit)
  } catch (err) {
    res.status(500).json(err);
  }
})

// MUST HAVE USER ID IN PARAMS, AND BODY SCORE
router.put("/score/:id", withAuth, async (req, res) => {
  try {
    const updatePlayer = await Player.update(
      { score: Sequelize.literal(`score + ${req.body.score}`)},
      {
        where: {
          user_id: req.params.id
        }
      }
    )
    if (!updatePlayer) {
      res.status(404).json({ message: "No player found with this id!"});
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
      { where: {
        user_id: req.params.id
      }}
    );
    if (!deletePlayer) {
      res.status(404).json({ message: "No player found with this id!"});
      return;
    };
    res.status(200).json(deletePlayer);
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router;