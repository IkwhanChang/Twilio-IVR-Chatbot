import React from "react";
import moment from "moment";
import { Comment, Image } from "semantic-ui-react";

const isOwnMessage = (message, user) => {
  return message.id === "IVRobot"
  // return message.user.id === user.uid ? "message__self" : "";
};

const isImage = message => {
  return message.hasOwnProperty("image") && !message.hasOwnProperty("content");
};

const timeFromNow = timestamp => moment(timestamp).fromNow();

const Message = ({ message, user }) => (
  <Comment>
    <Comment.Avatar src={"http://gravatar.com/avatar/15ef5bd18c36ed4a2b8e582022117d97?d=identicon"} />
    <Comment.Content className={isOwnMessage(message, user)}>
      <Comment.Author as="a">{message.senderName}</Comment.Author>
      <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
      {isImage(message) ? (
        <Image src={message.image} className="message__image" />
      ) : (
        <Comment.Text>{message.message}</Comment.Text>
      )}
    </Comment.Content>
  </Comment>
);

export default Message;
