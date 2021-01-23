import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { toCurrency } from 'utils/currency';
import { messages } from './notifications';
import {
  Container,
  PageHeader,
  DayTitle,
  NotificationContent,
  NotificationCard,
  Cover,
  Text,
  Strong,
  Status,
  Checkbox,
  CheckboxIcon,
  NotificationList,
  Body,
} from './styles';
import boleto from 'assets/images/boleto.png';
import { NotificationsTypes } from 'store/ducks/notifications';

export default function Notifications({ navigation }) {
  const notificationList = useSelector((state) => state.notifications.data);
  // const notificationList = [...messages];
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  function handleRemove(id) {
    const newNotifications = [...notifications];
    const filtered = newNotifications.filter(
      (notification) => notification.id !== id
    );
    setNotifications([...filtered]);
    dispatch({
      type: NotificationsTypes.SAVE_NOTIFICATIONS,
      notifications: filtered,
    });
  }

  function refreshNotifications() {
    setLoading(true);
    const newNotifications = [...notificationList];
    setNotifications(newNotifications);
    setLoading(false);
  }

  useEffect(() => {
    setNotifications([...notificationList]);
  }, [notificationList]);

  const NotificationItem = ({ item }) => (
    <NotificationCard onPress={() => {}}>
      <Cover source={boleto} />
      <Body>
        <Text>
          {/* Seu boleto <Strong>{item.name}</Strong> no valor de R$
        {toCurrency(item.value)} foi
        <Status> {item.status}</Status> hoje, {item.date} */}
          <Strong>{item.title}</Strong>
        </Text>
        <Text>{item.body}</Text>
      </Body>

      <Checkbox onPress={() => handleRemove(item.id)}>
        <CheckboxIcon />
      </Checkbox>
    </NotificationCard>
  );

  return (
    <Container>
      <PageHeader>Notificações</PageHeader>
      {/* <NavigationEvents
        onWillFocus={() => {
          setNotifications([...notificationList]);
        }}
      /> */}
      <NotificationContent>
        <DayTitle>Hoje</DayTitle>
        <NotificationList
          data={notifications}
          keyExtractor={(item) => String(item.id)}
          renderItem={NotificationItem}
          onRefresh={() => refreshNotifications()}
          refreshing={loading}
        />
      </NotificationContent>
    </Container>
  );
}

Notifications.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

Notifications.navigationOptions = {
  tabBarIcon: () => <Icon name="ios-notifications" size={24} color="#000" />,
  tabBarLabel: 'Notificações',
};
