describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'binh',
      name: 'binh',
      password: 'testing',
    }
    const user1 = {
      username: 'binh1',
      name: 'binh1',
      password: 'testing',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user1)

    cy.visit('http://localhost:3000')
  })
  //   it('Login form is shown', function () {
  //     cy.contains('username')
  //     cy.contains('password')
  //   })
  //   describe('Login', function () {
  //     it('Login success with right credentials', function () {
  //       cy.get('#username').type('binh')
  //       cy.get('#password').type('testing')
  //       cy.get('#login-button').click()
  //       cy.contains('binh is logged in')
  //     })
  //     it('Login success with wrong credentials', function () {
  //       cy.get('#username').type('binh')
  //       cy.get('#password').type('wrong')
  //       cy.get('#login-button').click()
  //       cy.get('.error').should('contain', 'invalid username or password')
  //       cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
  //       cy.get('.error').should('have.css', 'border-style', 'solid')
  //     })
  //   })
  //   describe('When logged in', function () {
  //     beforeEach(function () {
  //       cy.get('#username').type('binh')
  //       cy.get('#password').type('testing')
  //       cy.get('#login-button').click()
  //     })
  //     it('A blog can be created & likes', function () {
  //       cy.contains('create a new blog').click()
  //       cy.get('#title').type('test')
  //       cy.get('#author').type('author')
  //       cy.get('#url').type('url.com')
  //       cy.get('#create-button').click()
  //       cy.contains('test')
  //       cy.contains('author')
  //       cy.contains('view').click()
  //       cy.get('#like-button').click()
  //       cy.contains('Likes').should('contain', 1)
  //     })
  //   })
  //   describe('Test delete function', function () {
  //     beforeEach(function () {
  //       cy.get('#username').type('binh')
  //       cy.get('#password').type('testing')
  //       cy.get('#login-button').click()
  //     })
  //     it('A blog can be created & deleted', function () {
  //       cy.contains('create a new blog').click()
  //       cy.get('#title').type('test')
  //       cy.get('#author').type('author')
  //       cy.get('#url').type('url.com')
  //       cy.get('#create-button').click()
  //       cy.contains('view').click()
  //       cy.get('#remove-button').click()
  //       cy.on('window:confirm', () => true)
  //       cy.contains('test').should('not.exist')
  //     })
  //     it('Other user cant delete blog', function () {
  //       cy.contains('create a new blog').click()
  //       cy.get('#title').type('test')
  //       cy.get('#author').type('author')
  //       cy.get('#url').type('url.com')
  //       cy.get('#create-button').click()
  //       cy.wait(1000)
  //       cy.get('#logout-button').click()

  //       cy.get('#username').type('binh1')
  //       cy.get('#password').type('testing')
  //       cy.get('#login-button').click()
  //       cy.contains('view').click()
  //       cy.contains('remove-button').should('not.exist')
  //     })
  //   })
  describe('Sorted blogs by number of likes', function () {
    beforeEach(function () {
      cy.login({ username: 'binh', password: 'testing' })
      const blog1 = {
        title: 'title1',
        author: 'author1',
        url: 'url1.com',
        likes: 1,
      }
      const blog2 = {
        title: 'title2',
        author: 'author2',
        url: 'url2.com',
        likes: 2,
      }
      const blog3 = {
        title: 'title3',
        author: 'author3',
        url: 'url3.com',
        likes: 3,
      }
      cy.createBlog(blog1)
      cy.createBlog(blog2)
      cy.createBlog(blog3)
      cy.get('#username').type('binh')
      cy.get('#password').type('testing')
      cy.get('#login-button').click()
    })
    it('Check order', function () {
      cy.get('.like-count')
        .then((like2) => {
          const likes = like2.map((i, el) => Number(el.innerHTML)).toArray()
          const sortedOrder = [...likes].sort((a, b) => {
            return b - a
          })
          if (JSON.stringify(likes) === JSON.stringify(sortedOrder)) {
            return 'the list is sorted'
          }
        })
        .should('contains', 'the list is sorted')
    })
  })
})
