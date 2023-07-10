import db from '../../../database/models/index';
import { capitalizeFirstLetter, createSlug } from '../../utils/strings';
import uploadToCloudinary from '../../utils/uploads';

// LOAD MODELS
const { book, author, genre } = db;

const addBook = async (req, res) => {
  // GET DATA FROM REQUEST BODY
  const { title, releaseYear, isbn, cover, copies } = req.body;
  let { authorId, genreId, authorName, genreName } = req.body;

  // GET USER ID FROM RES.LOCALS
  const { userId } = res.locals;

  try {
    /**
     * FORMAT DATA (TITLE, GENRE, SLUG)
     */
    const formattedTitle = capitalizeFirstLetter(title);
     // ADD AUTHOR NAME IF IT EXISTS
    if (authorName) {
      authorName = capitalizeFirstLetter(authorName);
    }
    // ADD GENRE NAME IF IT EXISTS
    if (genreName) {
      genreName = capitalizeFirstLetter(genreName);
    }
    // CHECK IF BOOK EXISTS
    const bookExists = await book.findOne({
      where: { title: formattedTitle, userId },
    });
    // IF BOOK EXISTS, RETURN ERROR
    if (bookExists) {
      return res.status(409).json({
        error: 'Book already exists',
      });
    }
    /**
     * IF BOOK DOES NOT EXIST
     */
    // CHECK IF AUTHOR EXISTS
    if (authorId) {
      const authorExists = await author.findOne({
        where: { id: authorId },
      });
      // IF AUTHOR EXISTS, GET AUTHOR NAME
      if (authorExists) {
        authorName = authorExists.name;
      }
      if (!authorExists) {
        return res.status(404).json({
          message:
            'Author not found. Make sure to provide a correct author ID or create a new author',
        });
      }
    }
    /**
     * IF NO AUTHOR ID PROVIDED
     */
    if (!authorId) {
      // CHECK IF AUTHOR EXISTS BY NAME
      const authorExists = await author.findOne({
        where: { name: authorName },
      });
      if (!authorExists) {
        // CREATE AUTHOR SLUG
        let authorSlug = `${authorName} ${authorId?.split('-')[0]}`
        authorSlug = authorSlug.split(' ').join('-').toLowerCase();
        // CREATE NEW AUTHOR
        const newAuthor = await author.create({
          name: authorName,
          slug: authorSlug,
        });
        authorId = newAuthor.id;
      } else {
        authorId = authorExists.id;
      }
    }
    // CHECK IF GENRE EXISTS
    if (genreId) {
      const genreExists = await genre.findOne({
        where: { id: genreId },
      });
      // IF GENRE EXISTS, GET GENRE NAME
      if (genreExists) {
        genreName = genreExists.name;
      }
      if (!genreExists) {
        return res.status(404).json({
          message:
            'Genre not found. Make sure to provide a correct genre ID or create a new genre',
        });
      }
    }
    /**
     * IF NO GENRE ID PROVIDED
     */
    if (!genreId) {
      // CHECK IF GENRE EXISTS BY NAME
      const genreExists = await genre.findOne({
        where: { name: genreName },
      });
      // IF GENRE DOES NOT EXIST, CREATE NEW GENRE
      if (!genreExists) {
        // CREATE NEW GENRE
        const newGenre = await genre.create({
          name: genreName,
        });
        genreId = newGenre.id;
      } else {
        genreId = genreExists.id;
      }
    }
    // CREATE SLUG
    const slug = createSlug(`${formattedTitle} ${authorName}`);
    /**
     * CREATE NEW BOOK
     */
    // UPLOAD COVER TO CLOUDINARY
    const coverUrl = await uploadToCloudinary(cover, 'books', formattedTitle.split(' ').join('_').toLowerCase());
    const newBook = await book.create({
      title: formattedTitle,
      authorId,
      userId,
      releaseYear,
      isbn,
      genreId,
      cover: coverUrl,
      copies,
      slug
    });
    // RETURN RESPONSE
    return res.status(201).json({
      status: 'Book created successfully',
      data: {
        book: newBook,
        author: authorName,
        genre: genreName,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

export default addBook;
