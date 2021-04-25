const withAuth = require('../../utils/auth');
const { Deck } = require("../../models");
const router = require('express').Router();

router.get("/", async (req, res, next) => {
  try {
    const deckData = await Deck.findOne({
      where: { game_id: req.session.game_id }
    });
    const deck = await JSON.parse(JSON.stringify(deckData));
    res.status(200).json(deck)
  } catch (err) {
    res.status(500).json(err);
  }
})

router.put("/", async (req, res) => {
  try {
    const deckData = await Deck.findOne({
      where: { game_id: req.session.game_id }
    });
    const deck = await JSON.parse(JSON.stringify(deckData));
    const whitecards = deck.answers
    await whitecards.push(req.body.card);
    await Deck.update(
      { answers: whitecards },
      {
        where: { game_id: req.session.game_id }
      }
    )
    res.status(200).json(deck)
  } catch {
    res.status(500).json(err)
  }
})

router.put("/del", async (req, res) => {
  try {
    const deckData = await Deck.findOne({
      where: { game_id: req.session.game_id }
    });
    const deck = await JSON.parse(JSON.stringify(deckData));
    const whitecards = deck.answers
    const index = whitecards.indexOf(req.body.card)
    await whitecards.splice(index, 1);
    await Deck.update(
      { answers: whitecards },
      {
        where: { game_id: req.session.game_id }
      }
    )
    res.status(200).json(whitecards)
  } catch {
    res.status(500).json(err)
  }
})

module.exports = router;