import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import BlogForm from './BlogForm'

describe('<Blog />', () => {
  let component
  const mockHandler = jest.fn()
  beforeEach(() => {
    const user = {
      username: 'test',
      name: 'test',
    }
    const blog = {
      title: 'test title',
      author: 'test author',
      url: 'test.com',
      likes: 10,
      user: { username: 'test', name: 'test' },
    }

    component = render(
      <Blog user={user} blog={blog} handleLike={mockHandler}></Blog>
    )
  })

  test('Blog list tests, step1', () => {
    expect(component.container).toHaveTextContent('test title')
    expect(component.container).toHaveTextContent('test author')
    const div = component.container.querySelector('.test-div2')
    expect(div).toHaveStyle('display: none')
  })

  test('Blog list tests, step2', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    const div = component.container.querySelector('.test-div2')
    expect(div).not.toHaveStyle('display: none')
  })

  test('Blog list tests,step3', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

test('Blog Form created test', () => {
  const createBlog = jest.fn()

  const component = render(<BlogForm handleNewBlog={createBlog}></BlogForm>)
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, { target: { value: 'testing title' } })
  fireEvent.change(author, { target: { value: 'testing author' } })
  fireEvent.change(url, { target: { value: 'testing url' } })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)

  expect(createBlog.mock.calls[0][0].title).toBe('testing title')
  expect(createBlog.mock.calls[0][0].author).toBe('testing author')
  expect(createBlog.mock.calls[0][0].url).toBe('testing url')
})
