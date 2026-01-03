import React, { useEffect, useState } from 'react';
import { Text, FlatList, View, StyleSheet, ScrollView, Dimensions, RefreshControlBase, RefreshControl } from 'react-native';

import { FeatureContainer, ReusableStyles } from '../components';
import { emptyList, emptyObject, injectQuery, odooApi } from '../common/store/reduxApi';
import MenuView from '../components/MenuView';
import DebugView from '../components/DebugView';
import { CustomButton } from '../components/CustomButtons';
import { ScreenNames } from '../navigation/app.navigator';


export default ({ navigation, route }) => {
  const rs = ReusableStyles
  const { useQuery } = injectQuery('obi.dashboard.screen');
  const query = useQuery({
    kwargs: {
      fields: [
        'id',
        'name',
      ],
      domain: [
        // ['id', '=', recordId],
      ]
    },
  },
  );
  const { data, isLoading, refetch } = query
  const records = data?.records ?? emptyList

  return (
    query.error ? <Text style={rs.textDanger}>{JSON.stringify(query.error, null, 2)}</Text>
      :
      <ScrollView refreshControl={<RefreshControl refreshing={query.isLoading || query.isFetching} onRefresh={query.refetch}/>}>
        {records.map(screenRecord => <CustomButton icon='arrow-right' style={styles.button} key={screenRecord.id} onPress={() => navigation.navigate(ScreenNames.DashboardView, { recordId: screenRecord.id })}>{screenRecord.name}</CustomButton>)}
      </ScrollView>
  );
};


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#CBC3E3',
    margin: 16,
  },
});
