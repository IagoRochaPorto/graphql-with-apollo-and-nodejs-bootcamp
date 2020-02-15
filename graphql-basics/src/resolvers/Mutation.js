import uuidv4 from "uuid/v4"

const Mutation = {
  createUser(parent, args, {db}, info) {
    const emailTaken = db.users.some((user) => user.email === args.data.email )

    if (emailTaken) throw new Error('Email taken.')
    
    const user = {
      id: uuidv4(),
      ...args.data
    }

    db.users.push(user)

    return user
  },
  deleteUser(parent, args, {db}, info) {
    const userIndex = db.users.findIndex((user) => user.id === args.id)

    if (userIndex === -1) throw new Error("The user doesn't exists")

    const deletedUser = db.users.splice(userIndex, 1)

    db.posts = db.posts.filter(post => {
      const match = post.author === args.id

      if (match) comments = comments.filter(comment => comment.post !== post.id )
      
      return !match
    })

    db.comments = db.comments.filter(comment => comment.author !== args.id)

    return deletedUser[0]
  },
  updateUser(parent, args, {db}, info){
    const {id, data} = args
    const user = db.users.find(user => user.id === id)

    if(!user) throw new Error("User not found")

    if(typeof data.email === 'string') {
      const emailTaken = db.users.some(user => user.email === data.email)

      if (emailTaken) throw new Error("Email taken")

      user.email = data.email
    }

    if(typeof data.name === 'string') {
      user.name = data.name
    }

    if(typeof data.age != 'undefined') {
      user.age = data.age
    }

    return user
  },
  createPost(parent, args, {db}, info) {
    const userExists = db.users.some((user) => user.id === args.data.author)

    if (!userExists) throw new Error('User not found')
    
    const post = {
      id: uuidv4(),
      ...args.data
    }

    db.posts.push(post)

    return post
  },
  deletePost(parent, args, {db}, info) {
    const postIndex = db.posts.findIndex((post) => post.id === args.id)

    if (postIndex === -1) throw new Error("The post doesn't exists")

    const deletedPost = db.posts.splice(postIndex, 1)

    db.comments = db.comments.filter(comment => comment.post !== args.id)

    return deletedPost[0]
  },
  updatePost(parent, args, {db}, info) {
    const {id, data} = args
    const post = db.posts.find(post => post.id === id)

    if(!post) throw new Error("Post not found")

    if(typeof data.title === 'string') {
      post.title = data.title
    }

    if(typeof data.body === "string") {
      post.body === data.body
    }

    if(typeof data.published === "boolean") {
      post.published = data.published
    }

    return post
  },
  createComment(parent, args, {db}, info) {
    const userExists = db.users.some((user) => user.id === args.data.author)
    const postExists = db.posts.some(post => post.id === args.data.post && post.published)

    if(!userExists) throw new Error('User not found')
    if(!postExists) throw new Error('Post not found or not published yet')

    const comment = {
      id: uuidv4(),
      ...args.data
    }

    db.comments.push(comment)
    return comment
  },
  deleteComment(parent, args, {db}, info) {
    const commentIndex = db.comments.findIndex((comment) => comment.id === args.id)

    if (commentIndex === -1) throw new Error("Comment doesn't exists")

    const deletedComment = db.comments.splice(commentIndex, 1)

    return deletedComment[0]
  },
  updateComment(parent, args, {db}, info) {
    const {id, data} = args
    const comment = db.comments.find(comment => comment.id === id)

    if(!comment) throw new Error("Comment not found")

    if(typeof data.text === "string") {
      comment.text = data.text
    }

    return comment
  }
}

export default Mutation
