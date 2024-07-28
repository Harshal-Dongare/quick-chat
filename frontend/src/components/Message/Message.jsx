import "./Message.css";

const Message = ({ user, userText, classs, userId }) => {
    if (user) {
        return (
            <div className={`messageBox ${classs}`}>
                {`${user}: ${userText}`}
            </div>
        );
    } else {
        return (
            <div className={`messageBox ${classs}`}> {`You: ${userText}`}</div>
        );
    }
};

export default Message;
