import { render, screen } from '@testing-library/react'
import BlogCreator from './BlogCreator'
import { describe, expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'

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
})