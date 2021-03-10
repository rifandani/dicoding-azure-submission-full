import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
let timeout: NodeJS.Timeout;

const bookList = [
  {
    title: 'Book A',
    author: 'Author A',
    releaseYear: 2020,
    coverURL: 'https://',
    synopsis: 'This is synopsis A',
  },
  {
    title: 'Book B',
    author: 'Author B',
    releaseYear: 2020,
    coverURL: 'https://',
    synopsis: 'This is synopsis B',
  },
  {
    title: 'Book C',
    author: 'Author C',
    releaseYear: 2020,
    coverURL: 'https://',
    synopsis: 'This is synopsis C',
  },
];

// A `seed` function so that we can use async/await
async function seed() {
  for (let i = 0; i < bookList.length; i++) {
    timeout = setTimeout(async () => {
      const book = await prisma.book.create({
        data: {
          title: bookList[i].title,
          author: bookList[i].title,
          releaseYear: bookList[i].releaseYear,
          coverURL: bookList[i].coverURL,
          synopsis: bookList[i].synopsis,
        },
      });

      console.log(`new book created: `, book.title);
    }, 1000);
  }
}

seed()
  .catch((e) => {
    clearTimeout(timeout);
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    clearTimeout(timeout);
    await prisma.$disconnect();
  });
