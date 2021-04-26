const router = require('express').Router();
const { User, Player } = require("../../models");
const withAuth = require('../../utils/auth');


router.get("/", function (req, res, next) {
  res.json(req.session);
});

router.get("/:id", withAuth, async (req, res, next) => {
  try {
    const userData = await User.findByPk(req.params.id, { attributes: ["username"] });
    const formatUser = await JSON.parse(JSON.stringify(userData));
    res.send(formatUser)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create New User
router.post("/", async (req, res) => {
  try {
    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const dbUserId = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    req.session.user_id = dbUserId.id
    req.session.loggedIn = true;
    // res.send(req.session)
    res.status(200).json(req.session);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    };

    const user = await JSON.parse(JSON.stringify(dbUserData));
    const playerData = await Player.findOne({ where: { user_id: user.id } });

    const playerFormat = await JSON.parse(JSON.stringify(playerData));
    if (playerData) {
      req.session.game_id = playerFormat.game_id

    }
    
    // req.session.save(() => {
      // await res.cookie("id", userID, {signed: true, httpOnly: true})
    req.session.user_id = user.id;
    req.session.loggedIn = true;
    console.log(req.session.user_id)
    res.json(req.session)
    // res
    //   .status(200)
    //   .json({ user: dbUserData, message: "You are now logged in!" });
    // });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;