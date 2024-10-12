import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'

import BlogCreator from './BlogCreator'

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

describe('A blog creator', () => {
    test('create button is disabled by default when any field is empty', () => {
        render(<BlogCreator />)
        const button = screen.getByText('Create')
        expect(button).toBeDisabled()
    })

    test('create button is enabled when all fields are filled', () => {
        const user = userEvent.setup()
        render(<BlogCreator />)
    })

    test('updates parent state and calls onSubmit', async () => {
        const user = userEvent.setup()

        const setNotification = vi.fn()
        const setBlogs = vi.fn()
        const setAddingBlog = vi.fn()

        // Set up the mock adapter for axios
        const api_mock = new MockAdapter(axios)

        // Mock the axios POST request that BlogCreator is making
        api_mock.onPost('/api/blogs').reply(201)

        api_mock.onGet('/api/blogs').reply(200, [
            {
                title: 'test title',
                author: 'test author',
                url: 'http://www.test.com',
                description: 'test description',
                likes: 0
            }
        ])

        render(<BlogCreator setNotification={setNotification} setBlogs={setBlogs} setAddingBlog={setAddingBlog} />)

        const titleInput = screen.getByTestId('title-input')
        await user.type(titleInput, 'test title')

        const authorInput = screen.getByTestId('author-input')
        await user.type(authorInput, 'test author')

        const urlInput = screen.getByTestId('url-input')
        await user.type(urlInput, 'http://www.test.com')

        const descriptionInput = screen.getByTestId('description-input')
        await user.type(descriptionInput, 'test description')

        const button = screen.getByText('Create')
        await user.click(button)

        console.log(setNotification.mock.calls)

        expect(setNotification).toHaveBeenCalledWith('Blog created successfully')
        expect(setBlogs).toHaveBeenCalled()
        expect(setAddingBlog).toHaveBeenCalledWith(false)


        // Ensure axios mock was called correctly
        expect(api_mock.history.post.length).toBe(1)
        expect(api_mock.history.post[0].url).toBe('/api/blogs')

    })
})