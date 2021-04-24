const { Round, Deck } = require('../../models');
const withAuth = require('../../utils/auth');
const Questions = require('../../models/questions')
const Answers = require('../../models/answers')


const router = require('express').Router();

router.get("/", withAuth, async (req, res) => {
  try {
    const roundData = await Round.findOne({
      where: {
        game_id: req.session.game_id
      }
    });
    const getRound = await JSON.parse(JSON.stringify(roundData))
    res.status(200).json({ data: getRound, user_id: req.session.user_id })
  } catch {
    res.status(500).json(err);
  }
});

// Trigger on Owner clicking Game Start
router.post("/", withAuth, async (req, res) => {
  console.log(req.session);
  try {
    await Round.destroy({
      where: { game_id: req.session.game_id }
    });
    const deckFind = await Deck.findOne({
      where: {
        game_id: req.session.game_id
      }
    });
    const deckFormat = await JSON.parse(JSON.stringify(deckFind))
    const blackCards = deckFormat.questions
    const rng = await Math.floor(Math.random() * blackCards.length)
    await Round.create({
      prompt: blackCards[rng],
      game_id: req.session.game_id,
      users: req.body.users
    });
    await blackCards.splice(rng, 1);
    await Deck.update(
      { questions: blackCards },
      {
        where: {
          game_id: req.session.game_id
        }
      }
    );

    res.send(req.session)
  } catch (err) {
    res.status(500).json(err);
  }
})

// Must send Answer: 
router.put("/", withAuth, async (req, res) => {
  console.log(req.body)
  try {
    const findRound = await Round.findOne({
      where: {
        game_id: req.session.game_id
      }
    });
    const formatRound = await JSON.parse(JSON.stringify(findRound))
    if (formatRound.answers !== null) {
      var formatAnswers = JSON.parse(formatRound.answers);
      var usersAnswers = [...formatAnswers, JSON.parse(JSON.stringify({ "user": req.body.user, "answer": req.body.answer }))]
    } else {
      var usersAnswers = [req.body]
    }
    // console.log(answersArray);
    // const usersAnswers = await answersArray.push(req.body);
    console.log(usersAnswers);
    const updateAnswers = await Round.update(
      {
        answers: JSON.stringify(usersAnswers)
      },
      {
        where: {
          game_id: req.session.game_id
        }
      }
    );
    console.log(usersAnswers);
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