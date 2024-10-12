import { useState } from "react"
import { setToken } from "../../services/blogs"
import {login} from "../../services/login"

const LoginForm = ({ setUser, showNotification }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
        const user = await login({ username, password })
        setUser(user)
        setToken(user.token)
        window.localStorage.setItem('user', JSON.stringify(user))
        setUsername('')
        setPassword('')
        }
        catch (exception) {
        showNotification('Wrong credentials')
        }
    }

    return (
        <form className="login" onSubmit={handleLogin}>
        <h2>Login</h2>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit"> Login </button>
        </form>
    )
}

export default LoginForm
