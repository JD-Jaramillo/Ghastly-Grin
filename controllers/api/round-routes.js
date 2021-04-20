const { Round } = require('../../models');
const withAuth = require('../../utils/auth');

const router = require('express').Router();

router.get("/", withAuth, async (req, res) => {
  try {
    const roundData = await Round.findOne({
      where: {
        game_id: req.session.game_id
      }
    });
    const getRound = await JSON.parse(JSON.stringify(roundData))
    res.status(200).json(getRound)
  } catch {
    res.status(500).json(err);
  }
});

// Trigger on Owner clicking Game Start
router.post("/", withAuth, async (req, res) => {
  try {
    const roundCreate = await Round.create({
      prompt: req.body.prompt,
      game_id: req.body.game_id,
      users: req.body.users
    })
    res.status(200).json(roundCreate)
  } catch (err) {
    res.status(500).json(err);
  }
})

// Must send Answer: 
router.put("/", withAuth, async (req, res) => {
  try {
    const findRound = await Round.findOne({
      where: {
        game_id: req.session.game_id
      }
    });
    const usersArray = JSON.parse(findRound.users);
    const answersArray = JSON.parse(findRound.answers);
    const usersDone = JSON.stringify(usersArray.push(req.session.user_id));
    const usersAnswers = JSON.stringify(answersArray.push(req.body.answer));
    const updateAnswers = await Round.update(
      {
        users: usersDone,
        answers: usersAnswers
      },
      {
        where: {
          game_id: req.session.game_id
        }
      }
    );
    if (!updateAnswers) {
      res.status(404).json({ message: 'No round found with this id!' });
      return;
    };
    res.status(200).json(updateAnswers);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deleteRound = await Round.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!deleteRound) {
      res.status(404).json({ message: 'No round Found with this id!' });
      return;
    }
    res.status(200).json(deleteRound);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/", withAuth, async (req, res) => {
  try {
    const deleteRound = await Round.destroy({
      where: {
        game_id: req.session.game_id
      }
    })
    if (!deleteRound) {
      res.status(404).json({ message: 'No round Found with this id!' });
      return;
    }
    res.status(200).json(deleteRound);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;