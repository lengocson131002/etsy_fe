import { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './index.less';
import { getConversationDetail } from '@/api/converation.api';
import { ConversationDetail } from '@/interface/conversation';
import { Affix, Divider, Empty, Image, Layout, theme } from 'antd';
import { LayoutContext } from 'antd/es/layout/layout';
import { Typography } from 'antd';
import { AiOutlineExclamation, AiOutlineHistory, AiOutlineRight, AiOutlineStop } from 'react-icons/ai';
import MessageItem from './message';
import UserIcon from '@/assets/user.png';
import { getLastTimestamp } from '@/utils/datetime';

const { useToken } = theme;

const { Text } = Typography;

const ConversateDetail: FC = () => {
  const { id } = useParams();
  const [conversation, setConversation] = useState<ConversationDetail>();
  const { token } = useToken();

  useEffect(() => {
    const loadConversation = async (id: number) => {
      const { result, status } = await getConversationDetail(id);
      if (result && status) {
        setConversation(result);
      }
    };

    if (id && Number.parseInt(id)) {
      loadConversation(Number.parseInt(id));
    }
  }, []);

  return conversation ? (
    <div className="conversation-wrapper">
      <div className="conversation-header">
        <div className="conversation-header-image">
          <Image preview={false} src={conversation.customerImage ? conversation.customerImage : UserIcon} />
        </div>
        <div className="conversation-header-meta">
          <div className="conversation-header-meta-name" style={{ color: token.colorPrimary }}>
            {conversation.customerName}
          </div>
          <Text className="conversation-header-meta-unread">
            <AiOutlineStop />
            {conversation.unreadCount} unread messages
          </Text>
          <Text className="conversation-header-meta-time">
            <AiOutlineHistory />
            {conversation.lastMessageTime && getLastTimestamp(new Date(conversation.lastMessageTime))}
          </Text>
        </div>
        <div className="conversation-header-shop">
          <Link className="conversation-header-shop-name" to={`/shop/${conversation.shopId}`}>
            <span>{conversation.shopName}</span>
            <span className="shop-name-icon">
              <AiOutlineRight />
            </span>
          </Link>
        </div>
      </div>
      <div className="conversation-content">
        {conversation.messages?.length > 0 ? (
          <div>
            {conversation.messages.map((message, idx) => {
              let end = true;
              if (idx < conversation.messages.length - 1) {
                end = !(message.isAdmin === conversation.messages[idx + 1].isAdmin);
              }
              console.log('IS END:', idx, end);

              return <MessageItem end={end} message={message} />;
            })}
          </div>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>
    </div>
  ) : (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  );
};

export default ConversateDetail;
