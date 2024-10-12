import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import Notification from './Notification'

describe('A notification', () => {
    test('renders a message', () => {
        render(<Notification message="test message" />)
        const messageElement = screen.getByText('test message')
        expect(messageElement).toBeDefined()
    })

    test('does not render a message when message is empty', () => {
        render(<Notification message="" />)
        const messageElement = screen.queryByTestId('notification')
        expect(messageElement).not.toBeInTheDocument()
    })

    test('does not render a message when message is null', () => {
        render(<Notification message={null} />)
        const messageElement = screen.queryByTestId('notification')
        expect(messageElement).not.toBeInTheDocument()
    })

    test('does not render a message when message is undefined', () => {
        render(<Notification message={undefined} />)
        const messageElement = screen.queryByTestId('notification')
        expect(messageElement).not.toBeInTheDocument()
    })
})