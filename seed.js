const prisma = require("../prisma");
const { faker } = require("@faker-js/faker");

const seed = async (numUsers = 3, numPlaylists = 5) => {
  // A loop must be used because `prisma.restaurant.createMany` fails here
  for (let i = 0; i < numUsers; i++) {
    // For each restaurant, create an array of playlists
    const Playlists = Array.from({ length: numPlaylists }, (_, j) => {
      const name = faker.internet.displayName();
      return {
        name,
        email: `${name}@foo.bar`,
        partySize: faker.number.int({ min: 1, max: 10 }),
      };
    });

    // Create a single restaurant with nested Playlists
    await prisma.Users.create({
      data: {
        name: faker.company.buzzAdjective() + " " + faker.company.buzzNoun(),
        Playlists: {
          create: Playlists,
        },
      },
    });
  }
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
