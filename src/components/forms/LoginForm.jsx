const LoginForm = ({ login, username, setUsername, password, setPassword }) => {
    return (
        <form className="login" onSubmit={login}>
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
