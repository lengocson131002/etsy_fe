import { Message } from '@/interface/conversation';
import './index.less';
import { FC } from 'react';
import { Col, Image, Row, Typography } from 'antd';
import { dateToStringWithFormat } from '@/utils/datetime';

const { Text } = Typography;

interface MessageProps {
  message: Message;
  end: boolean;
}

const MessageItem: FC<MessageProps> = ({ message, end }) => {
  const { content, time, isAdmin } = message;
  console.log(end);

  return (
    <div className={`message-wrapper ${end ? 'message-wrapper-end' : ''}`}>
      <Row className={`message-content-wrapper`}>
        <Col xs={20} sm={18} className={`${isAdmin ? 'message-right' : ''}`}>
          <div className="message-content">
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
            <span className={`message-extra`}></span>
          </div>
          {message.images?.length > 0 && (
            <div className="message-images">
              {message.images?.map(img => (
                <Image className="message-image" src={img} />
              ))}
            </div>
          )}
          <Text className="message-time">{dateToStringWithFormat(new Date(time))}</Text>
        </Col>
      </Row>
    </div>
  );
};

export default MessageItem;
