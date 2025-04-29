import React, { useState, useEffect } from "react";
import { Avatar, Badge, Dropdown, Space, List, Typography } from "antd";
import { IoNotifications } from "react-icons/io5";
import useCustomFetch from "../../hooks/useCustomFetch";
import { getNotificationApi } from "../../services/userApi";
const { Text } = Typography;

const Notification = () => {
  const [hasNotifications, setHasNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isRead, setIsRead] = useState(false);

  // Fetch notifications from backend API
  const { data, refetch, loading } = useCustomFetch(getNotificationApi);

  // Update notifications when data changes
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setNotifications(data);
      setHasNotifications(data.length > 0);
    }
  }, [data]);

  // Update notification status
  useEffect(() => {
    if (notifications.length > 0 && !isRead) {
      setHasNotifications(true);
    }
  }, [notifications, isRead]);

  // Format date to be more readable with error handling
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch (error) {
      console.error("Invalid date format:", error);
      return dateString;
    }
  };

  // Get first character for avatar
  const getAvatarText = (sender) => {
    return sender && typeof sender === 'string' ? sender.charAt(0).toUpperCase() : "?";
  };

  const notificationsList = (
    <List
      className="notification-dropdown"
      loading={loading}
      itemLayout="horizontal"
      dataSource={notifications || []}
      style={{
        width: "300px",
        maxHeight: "400px",
        overflow: "auto",
        backgroundColor: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        borderRadius: "8px",
        padding: "8px",
      }}
      renderItem={(item) => (
        <List.Item
          style={{ borderBottom: "1px solid #f0f0f0", padding: "12px 8px" }}
        >
          <List.Item.Meta
            avatar={<Avatar>{getAvatarText(item?.sender)}</Avatar>}
            title={
              <>
                <Text strong>{item?.title || ""}</Text>
                <Text
                  type="secondary"
                  style={{ float: "right", fontSize: "12px" }}
                >
                  {formatDate(item?.sentAt)}
                </Text>
              </>
            }
            description={
              <>
                <Text type="secondary">{item?.sender || ""}</Text>
                <div style={{ marginTop: "4px" }}>{item?.content || ""}</div>
              </>
            }
          />
        </List.Item>
      )}
      locale={{ emptyText: "No notifications" }}
    />
  );

  const handleDropdownVisibleChange = (visible) => {
    if (visible) {
      // Mark notifications as read when dropdown is opened
      setIsRead(true);
      setHasNotifications(false);
    }
  };

  // Optional: function to manually refetch notifications
  const refreshNotifications = () => {
    setIsRead(false);
    refetch();
  };

  return (
    <Dropdown
      overlay={notificationsList}
      trigger={["hover"]}
      placement="bottomLeft"
      arrow
      onVisibleChange={handleDropdownVisibleChange}
    >
      <button className="relative">
        <Space direction="vertical">
          <Space size="large">
            <Badge dot={hasNotifications && !isRead} color="red">
              <Avatar
                shape="circle"
                size="large"
                style={{ backgroundColor: "#D9D9D9" }}
              />
            </Badge>
          </Space>
        </Space>
        <IoNotifications className="z-10 absolute top-2 left-2 size-6 text-[#0C8E5E]" />
      </button>
    </Dropdown>
  );
};

export default Notification;