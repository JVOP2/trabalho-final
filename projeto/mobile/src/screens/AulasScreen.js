import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Text, Card, Chip, ActivityIndicator } from 'react-native-paper';
import api from '../services/api';

const diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export default function AulasScreen() {
  const [aulas, setAulas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [diaSelecionado, setDiaSelecionado] = useState('Segunda');

  useEffect(() => {
    carregarAulas();
  }, [diaSelecionado]);

  const carregarAulas = async () => {
    setLoading(true);
    try {
      const response = await api.get('/aulas', {
        params: { diaSemana: diaSelecionado }
      });
      setAulas(response.data.dados || []);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as aulas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.diasContainer}>
        {diasSemana.map(dia => (
          <Chip
            key={dia}
            selected={dia === diaSelecionado}
            onPress={() => setDiaSelecionado(dia)}
            style={styles.chip}
          >
            {dia}
          </Chip>
        ))}
      </ScrollView>

      {loading ? (
        <ActivityIndicator size="large" style={styles.loading} />
      ) : (
        <ScrollView style={styles.lista}>
          {aulas.length === 0 ? (
            <Text style={styles.vazio}>Nenhuma aula para {diaSelecionado}</Text>
          ) : (
            aulas.map(aula => (
              <Card key={aula._id} style={styles.card}>
                <Card.Content>
                  <Text variant="titleMedium">{aula.disciplina?.nome}</Text>
                  <Text variant="bodyMedium">Prof: {aula.professor?.nome}</Text>
                  <Text variant="bodySmall">Lab: {aula.laboratorio?.nome}</Text>
                  <Text variant="bodySmall">Blocos: {aula.blocos.join(', ')}</Text>
                </Card.Content>
              </Card>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  diasContainer: { padding: 10, maxHeight: 60 },
  chip: { marginRight: 8 },
  loading: { marginTop: 50 },
  lista: { flex: 1, padding: 10 },
  vazio: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#666' },
  card: { marginBottom: 10 },
});
