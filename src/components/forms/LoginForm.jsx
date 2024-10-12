import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { setToken } from "../../services/blogs"
import { login } from "../../services/login"
import PropTypes from "prop-types"

const LoginForm = ({ setUser, showNotification }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
        const user = await login({ username, password })
            setUser(user)
            setToken(user.token)
            window.localStorage.setItem('user', JSON.stringify(user))
            setUsername('')
            setPassword('')
            navigate('/')
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

LoginForm.propTypes = {
    setUser: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired
}

export default LoginForm
