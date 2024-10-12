import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { describe, expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'


describe('A blog', () => {
    test('renders title, author, and likes only by default', () => {
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

        
        // { exact: false } for getting contained text
        const descriptionElement = screen.queryByText('testing description of', { exact: false })
        expect(descriptionElement).not.toBeInTheDocument()

        // queryByText does not cause an exception if it is not found
        const urlElement = screen.queryByText('http://testing.com') // returns null if not found
        expect(urlElement).not.toBeInTheDocument()
    })

    test('renders url and description when the show more button clicked', async () => {
        const blog = {
            title: 'Component testing is done with react-testing-library',
            author: 'testing author',
            description: 'testing description of blog post testing is done with react-testing-library',
            url: 'http://testing.com',
            likes: 0
        }

        const user = userEvent.setup()
        render(<Blog blog={blog} />)

        const button = screen.getByText('show more')

        await user.click(button)

        const descriptionElement = screen.getByText('testing description of blog post testing is done with react-testing-library')
        expect(descriptionElement).toBeDefined()

        const urlElement = screen.getByText('http://testing.com')
        expect(urlElement).toBeDefined()
        
        // expect the rest to also be defined
        const titleElement = screen.getByText('Component testing is done with react-testing-library')
        expect(titleElement).toBeDefined()

        const authorElement = screen.getByText('testing author')
        expect(authorElement).toBeDefined()

        const likesElement = screen.getByText('0')
        expect(likesElement).toBeDefined()
    })

    test('clicking the show more button twice renders the default', async () => {
        const blog = {
            title: 'Component testing is done with react-testing-library',
            author: 'testing author',
            description: 'testing description of blog post testing is done with react-testing-library',
            url: 'http://testing.com',
            likes: 0
        }

        const user = userEvent.setup()
        render(<Blog blog={blog} />)

        const button = screen.getByText('show more')

        await user.click(button)
        expect(button).toHaveTextContent('show less')

        await user.click(button)
        expect(button).toHaveTextContent('show more')

        const titleElement = screen.getByText('Component testing is done with react-testing-library')
        expect(titleElement).toBeDefined()

        const authorElement = screen.getByText('testing author')
        expect(authorElement).toBeDefined()

        const likesElement = screen.getByText('0')
        expect(likesElement).toBeDefined()

        const descriptionElement = screen.queryByText('testing description of blog post testing is done with react-testing-library')
        expect(descriptionElement).not.toBeInTheDocument()

        const urlElement = screen.queryByText('http://testing.com') // returns null if not found
        expect(urlElement).not.toBeInTheDocument()

    })

})