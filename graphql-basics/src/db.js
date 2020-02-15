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

const db = {
  users,
  posts,
  comments
}

export default db