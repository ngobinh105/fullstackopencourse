const dummy = (blogs) => {
  return 1
}

const totalLikes = (list) => {
  return list.reduce((acc, cur) => {
    return acc + cur.likes
  }, 0)
}

const favoriteBlog = (bloglists) => {
  const favBlog = bloglists.reduce((acc, cur) => {
    if (acc.likes > cur.likes) {
      return acc
    } else {
      return cur
    }
  })
  return {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes,
  }
}
const mostBlogs = (bloglists) => {
  const uniqueAuthors = [...new Set(bloglists.map((item) => item.author))].map(
    (author) => ({
      author,
      blogs: bloglists.filter((blog) => blog.author === author).length,
    })
  )
  return uniqueAuthors.reduce((acc, cur) => {
    if (acc.blogs > cur.blogs) {
      return acc
    } else return cur
  })
}
const mostLikes = (bloglists) => {
  const uniqueAuthors = [...new Set(bloglists.map((item) => item.author))].map(
    (author) => ({
      author,
      likes: bloglists.reduce((acc, cur) => {
        if (cur.author === author) {
          return acc + cur.likes
        } else return acc
      }, 0),
    })
  )
  return uniqueAuthors.reduce((acc, cur) => {
    if (acc.likes > cur.likes) {
      return acc
    } else return cur
  })
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
