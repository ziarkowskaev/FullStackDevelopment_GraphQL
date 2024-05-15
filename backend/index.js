const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')

//for database 
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

//conecting to the database based on .env key, provide your own URI 
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Author {
    name: String!
    born: Int
    bookCount:Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount:Int!
    allBooks(author: String, genre: String):[Book!]!
    allAuthors:[Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(
      name: String!, 
      setBornTo: Int!
    ): Author
  }  
`
const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {

          //check if author args is added 
          if(args.author && args.genres){


          }else if(args.author){

            const author = await Author.findOne({ name: args.author });
            //get the reference id and filter all the books
            
            if(author){
              const authorBased = Book.find({author: author._id}).populate('author').exec()
            }

          }else if(args.genres){

          }else{

          return Book.find().populate('author').exec()
          }
    
        },
        allAuthors: async() => {return Author.find({})},
    },
    Author: {
        bookCount: async (root) => {
          //find the author in the database
          const author = await Author.findOne({ name: root.name });
          //get the reference id and filter all the books
          return Book.find({author: author._id}).countDocuments()
        } 
    },
    Mutation: {
      addBook: async (root, args) => {
        //create new book object for mongodb
        const authorName = args.author
        let author = await Author.findOne({name: authorName})
        console.log(author)

        if(!author){
          author = new Author({ name: authorName })

          try {
            await author.save()
          } catch (error) {
            throw new GraphQLError('Saving author failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.title,
                error
              }
            })
          }
        }

        const book =  new Book({title: args.title, published: args.published, author: author, genres: args.genres})

        try {
          await book.save()
        } catch (error) {
          throw new GraphQLError('Saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
          })
        }

        return book
  
        
      },
      editAuthor: async(root, args) => {

        const author = await Author.findOne({ name: args.name })
        author.born = args.setBornTo

        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Editing author birth failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
  
        return author
      }
    }
  
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})