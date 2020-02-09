import { GraphQLServer } from 'graphql-yoga'

//Scalar Type: String, Boolean, Int, Float, ID

//Demo user data
const users = [{
  id: '1',
  name: 'Iago',
  email: 'iago@example.com',
  age: 27
}, {
  id: '2',
  name: 'Arielly',
  email: 'elly@example.com'
}, {
  id: '3',
  name: 'Romulo',
  email: 'romin@example.com'
}]

const posts = [{
  id: '1',
  title: 'post number 1',
  body: 'this is the body of the post number 1',
  published: true,
  author: '1'
},{
  id: '2',
  title: 'post number ',
  body: 'this is the body of the post number ',
  published: true,
  author: '1'
},{
  id: '3',
  title: 'post number ',
  body: 'this is the body of the post number ',
  published: true,
  author: '2'
},{
  id: '4',
  title: 'post number 4',
  body: 'this is the body of the post number 3',
  published: false,
  author: '3'
},]

const comments = [{
  id: '1',
  text: 'this is my first comment',
  author: '1',
  post: '1'
}, {
  id: '2',
  text: 'WOW, amazing lesson',
  author: '2',
  post: '2'
}, {
  id: '3',
  text: 'POGGERS',
  author: '3',
  post: '3'
}, {
  id: '4',
  text: 'OMEGAUL, What you doing with that',
  author: '3',
  post: '1'
}]

//Type definitions (Schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    me: User!
    post: Post!
    comments: [Comment!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`

//Resolvers
const resolvers = {
  Query: {
    posts(parent, args, ctx, info) {
      if(!args.query) {
        return posts
      }

      return posts.filter((post) => {
        const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
        const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
        
        return isTitleMatch || isBodyMatch
      })
    },
    users(parent, args, ctx, info) {
      if(!args.query) {
        return users
      }

      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    me(parent, args, ctx, info) {
      return {
        id:  "abc123",
        name: "Ogai",
        email: "ogai@example.com",
        age: 81
      }
    },
    post(parent, args, ctx, info) {
      return {
        id: '321cba',
        title: 'Advantages of GraphQL',
        published: true
      }
    },
    comments(parent, args, ctx, info) {
      return comments
    }
  },
  Post: {
    author(parent, args, ctx, info) { 
      return users.find((user) => {
        return user.id === parent.author
      })
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.post === parent.id
      })
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id
      })
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author === parent.id
      })
    }
  },
  Comment:{
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      })
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => {
        return post.id === parent.post
      })
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => {
  console.log('The server is up!')
})