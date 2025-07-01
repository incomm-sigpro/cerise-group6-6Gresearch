import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api';
import { Inventory } from '../../types';

const DashboardScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadInventories();
  }, []);

  const loadInventories = async () => {
    try {
      setLoading(true);
      const response = await apiService.getInventories(1, 5);
      setInventories(response.data);
    } catch (error) {
      console.error('Error loading inventories:', error);
      Alert.alert('Erro', 'Falha ao carregar inventários');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadInventories();
    setRefreshing(false);
  };

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', onPress: logout, style: 'destructive' },
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PREENCHENDO':
        return '#ff9500';
      case 'ANALISANDO':
        return '#007AFF';
      case 'CONSOLIDADO':
        return '#34c759';
      default:
        return '#999';
    }
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Bem-vindo,</Text>
          <Text style={styles.userName}>{user?.name}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Inventários Recentes</Text>
        
        {inventories.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Nenhum inventário encontrado</Text>
          </View>
        ) : (
          inventories.map((inventory) => (
            <TouchableOpacity
              key={inventory.id}
              style={styles.inventoryCard}
              onPress={() => {
                // Navegar para detalhes do inventário
              }}
            >
              <View style={styles.inventoryHeader}>
                <Text style={styles.inventoryName}>{inventory.name}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(inventory.status) },
                  ]}
                >
                  <Text style={styles.statusText}>{inventory.status}</Text>
                </View>
              </View>
              <Text style={styles.inventoryYear}>Ano: {inventory.year}</Text>
              {inventory.corporation && (
                <Text style={styles.corporationName}>
                  {inventory.corporation.name}
                </Text>
              )}
            </TouchableOpacity>
          ))
        )}

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
          
          <View style={styles.actionGrid}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => {
                // Navegar para criar inventário
              }}
            >
              <Text style={styles.actionTitle}>Novo Inventário</Text>
              <Text style={styles.actionDescription}>
                Criar um novo inventário
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => {
                // Navegar para categorias
              }}
            >
              <Text style={styles.actionTitle}>Categorias</Text>
              <Text style={styles.actionDescription}>
                Gerenciar categorias
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => {
                // Navegar para usuários
              }}
            >
              <Text style={styles.actionTitle}>Usuários</Text>
              <Text style={styles.actionDescription}>
                Gerenciar usuários
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => {
                // Navegar para configurações
              }}
            >
              <Text style={styles.actionTitle}>Configurações</Text>
              <Text style={styles.actionDescription}>
                Configurações do sistema
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  welcomeText: {
    fontSize: 14,
    color: '#666',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#ff4444',
    borderRadius: 6,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  inventoryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inventoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  inventoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  inventoryYear: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  corporationName: {
    fontSize: 14,
    color: '#007AFF',
  },
  quickActions: {
    marginTop: 24,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 12,
    color: '#666',
  },
});

export default DashboardScreen; 