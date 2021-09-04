// TODO: setup the auth page, where request shall be made to POST/user,
// with id and email in the request body,

// Example,
// {
//   "id": "dummyid#1",
//   "email": "dummy@email.com"
// }

// the POST req will give response as a mongo document,
// which can be used to render the user display page
// further next-auth or firebase should be used for storing tokens, displayName
// as well as displayImage of the user.

// {
//   "id": "dummyid#1",
//   "email": "dummy@email.com",
//   "bookmarks": [],
//   "followers": [],
//   "following": [],
//   "blogs": [],
//   "_id": "61336a406052fccda99c7015",
//   "__v": 0
// }

// then only POST req to blogs can be made,
// POST/blogs requires data,

// {
//   "user_id": "dummyid#1",
//   "title": "title",
//   "imgUrl": "imageUrl",
//   "content": "lorem ipsum"
// }

// this will output a result of the blog that was created
// Example,
// {
//   "title": "title",
//   "imgUrl": "imageUrl",
//   "content": "lorem ipsum",
//   "likes": [],
//   "_id": "61336c8c41ff67ee5c3ea86d",
//   "comments": [],
//   "user": {
//       "_id": "61336a406052fccda99c7015",
//       "id": "dummyid#1",
//       "email": "dummy@email.com",
//       "bookmarks": [],
//       "followers": [],
//       "following": [],
//       "blogs": [
//           "61336b996052fccda99c7018",
//           "61336c8c41ff67ee5c3ea86d"
//       ],
//       "__v": 2
//   },
//   "__v": 0
// }

// So, now we can get blogs as an array,
// GET request to /blogs gives all the blogs
// as json => example provided at dummy_data.json
