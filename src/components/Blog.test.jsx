import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { describe, expect } from 'vitest'

test('renders title', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'testing author',
        description: 'testing description of blog post testing is done with react-testing-library',
        url: 'http://testing.com',
        likes: 0
    }

    render(<Blog blog={blog} />)

    const titleElement = screen.getByText('Component testing is done with react-testing-library')
    expect(titleElement).toBeDefined()

    const authorElement = screen.getByText('testing author')
    expect(authorElement).toBeDefined()

    const likesElement = screen.getByText('0')
    expect(likesElement).toBeDefined()

    const descriptionElement = screen.queryByText('testing description of blog post testing is done with react-testing-library')
    expect(descriptionElement).not.toBeInTheDocument()

    const urlElement = screen.queryByText('http://testing.com')
    expect(urlElement).not.toBeInTheDocument()

})
