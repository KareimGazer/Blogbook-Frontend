const Notification = ({ message }) => {
    return message && <p className="error" data-testid="notification">{message}</p>
}

export default Notification
