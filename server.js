const { prisma, express } = require("./common");
const app = express();
app.use(express.json());
const PORT = 3001;

app.use("/users", require("./api/users"));

app.listen(PORT, () => {
  console.log(`I am listening on port number ${PORT}`);
});