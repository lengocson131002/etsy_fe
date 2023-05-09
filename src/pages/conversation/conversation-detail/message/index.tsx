import { Message } from '@/interface/conversation';
import './index.less';
import { FC } from 'react';
import { Col, Row, Typography } from 'antd';
import { dateToStringWithFormat } from '@/utils/datetime';

const { Text } = Typography;

interface MessageProps {
  message: Message;
  end: boolean
}

const MessageItem: FC<MessageProps> = ({ message, end }) => {
  const { content, time, isAdmin } = message;
  console.log(end);

  return (
    <div className={`message-wrapper ${end ? 'message-wrapper-end' : ''}`}>
      <Row className={`message-content-wrapper`}>
        <Col xs={20} sm={18} className={ `message-content ${isAdmin ? 'message-right' : ''}`}>
          <div>{content}</div>
          <Text className="message-time">{dateToStringWithFormat(new Date(time))}</Text>
          <span className={`message-extra ${isAdmin ? 'message-extra-right' : ''}`}></span>
        </Col>
      </Row>
    </div>
  );
};

export default MessageItem;
