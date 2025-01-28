const { express, prisma } = require("../common");
const router = express.Router();
module.exports = router;

router.get("/", (req, res) => {
  res.status(200).json({ message: "This works" });
});

router.get("/getAllUsers", async (req, res) => {
  try {
    const response = await prisma.user.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/getUser/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await prisma.user.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        posts: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
});