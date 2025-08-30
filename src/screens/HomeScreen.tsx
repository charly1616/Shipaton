import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { styles } from './HomeScreen.styles';
import { Feather, MaterialIcons } from '@expo/vector-icons';

type UserType = 'identified' | 'unidentified' | 'not_seen';

type User = {
  id: number;
  name: string;
  type: UserType;
  lastSeen?: string;
};

const initialUsers: User[] = [
  { id: 1, name: 'Sabrina', type: 'identified', lastSeen: '14:20' },
  { id: 2, name: 'Carlos', type: 'unidentified', lastSeen: '09:05' },
  { id: 3, name: 'María', type: 'not_seen' },
];

const HomeScreen = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState<UserType>('identified');

  const alertsCount = users.filter((u) => u.type === 'unidentified').length;

  function addUser() {
    if (!newName.trim()) {
      Alert.alert('Name required', 'Please enter a name');
      return;
    }
    const id = Date.now();
    const user: User = {
      id,
      name: newName.trim(),
      type: newType,
      lastSeen: newType === 'not_seen' ? undefined : new Date().toTimeString().slice(0, 5),
    };
    setUsers((s) => [user, ...s]);
    setNewName('');
    setNewType('identified');
    setModalVisible(false);
  }

  function toggleRefresh() {
    // Example refresh: shuffle lastSeen times or mark all as not_seen randomly
    setUsers((prev) =>
      prev.map((u) => {
        if (u.type === 'not_seen') return u;
        // toggle between identified and unidentified for demo
        const nextType: UserType = u.type === 'identified' ? 'unidentified' : 'identified';
        return {
          ...u,
          type: nextType,
          lastSeen: new Date().toTimeString().slice(0, 5),
        };
      })
    );
  }

  function changeType(id: number) {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u;
        const next: UserType = u.type === 'identified' ? 'unidentified' : u.type === 'unidentified' ? 'not_seen' : 'identified';
        return {
          ...u,
          type: next,
          lastSeen: next === 'not_seen' ? undefined : new Date().toTimeString().slice(0, 5),
        };
      })
    );
  }

  function renderStatus(u: User) {
    if (u.type === 'identified') {
      return (
        <View style={styles.statusRow}>
          <Text style={[styles.statusText, styles.statusGreen]}>Visto {u.lastSeen}</Text>
        </View>
      );
    }
    if (u.type === 'unidentified') {
      return (
        <View style={styles.statusRow}>
          <MaterialIcons name="warning" size={16} color="#c0392b" />
          <Text style={[styles.statusText, styles.statusRed]}> Visto {u.lastSeen}</Text>
        </View>
      );
    }
    return (
      <View style={styles.statusRow}>
        <Text style={[styles.statusText, styles.statusGray]}>No visto hoy</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cameraRow}>
            <Feather name="video" size={28} color="#333" />
          </View>
          <View style={styles.bellRow}>
            <Feather name="bell" size={24} color="#333" />
            {alertsCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{alertsCount}</Text>
              </View>
            )}
          </View>
        </View>

        <Text style={styles.messageBold}>No han habido actividades inusuales ultimadamente</Text>

        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          style={styles.userList}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.userRow} onPress={() => changeType(item.id)}>
              <View style={styles.avatar} />
              <View style={styles.userCenter}>
                <Text style={styles.userName}>{item.name}</Text>
              </View>
              <View style={styles.userRight}>{renderStatus(item)}</View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Floating buttons */}
      <View style={styles.fabRow} pointerEvents="box-none">
        <TouchableOpacity style={[styles.fab, styles.fabLeft]} onPress={toggleRefresh}>
          <Feather name="refresh-ccw" size={22} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.fab, styles.fabRight]} onPress={() => setModalVisible(true)}>
          <Feather name="plus" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Add user modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Agregar usuario</Text>
            <TextInput
              placeholder="Nombre"
              style={styles.input}
              value={newName}
              onChangeText={setNewName}
            />
            <View style={styles.typeRow}>
              <TouchableOpacity onPress={() => setNewType('identified')} style={[styles.typeButton, newType === 'identified' && styles.typeSelected]}>
                <Text style={styles.typeText}>Identificado</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setNewType('unidentified')} style={[styles.typeButton, newType === 'unidentified' && styles.typeSelected]}>
                <Text style={styles.typeText}>No identificado</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setNewType('not_seen')} style={[styles.typeButton, newType === 'not_seen' && styles.typeSelected]}>
                <Text style={styles.typeText}>No visto</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalBtnSecondary}>
                <Text>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={addUser} style={styles.modalBtnPrimary}>
                <Text style={{ color: '#fff' }}>Agregar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
