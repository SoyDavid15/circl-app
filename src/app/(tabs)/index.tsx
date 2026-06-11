import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import News from '@/components/news';
import { Post } from '@/components/post';
import { ThemedView } from '@/components/themed-view';
import { TopBar } from '@/components/topBar';
import { supabase } from '@/supabase';
import { RefreshControl } from 'react-native';

export default function HomeScreen() {
  const [incidentes, setIncidentes] = useState<any[]>([])
  const [refreshing, setRefreshing] = useState(false);

  const fetchIncidentes = async () => {
    const { data } = await supabase
      .from('incidentes')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setIncidentes(data)
  }

  // Refresh app with pull down to refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchIncidentes();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    const fetchIncidentes = async () => {
      const { data } = await supabase
        .from('incidentes')
        .select('*')
        .order('created_at', { ascending: false })

      if (data) setIncidentes(data)
    }
    fetchIncidentes()
  }, [])

  return (
    <ThemedView style={styles.container}>
      <TopBar />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <News />
        {incidentes.map((item) => (
          <Post
            key={item.id}
            descripcion={item.descripcion}
            barrio={item.barrio}
            fecha={item.fecha_y_hora}
          />
        ))}

      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: "#1d1d1dff"
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    alignItems: 'center',
    gap: 0,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ccc",
  },


  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cityButton: {
    padding: 24,
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: 20,
    alignItems: "center",
    width: 200,
  },

  cityButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ccc",
  },
});
