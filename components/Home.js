import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    View,
    StyleSheet,
    Button,
    FlatList,
    TouchableOpacity
} from 'react-native';

import axios from 'axios';

const Home = (props) => {

    const [filter, setFilter] = useState("");
    const [currencies, setCurrencies] = useState([]);
    const [currenciesTmp, setCurrenciesTmp] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCurrencies();

        return () => {
            // limpiar los datos del historico temporal
            setCurrencies([]);
            setCurrenciesTmp([]);
            setLoading(false);
        };
    }, []);

    /**
     * Cargar el historico de correncies de los endpoint
     * https://api.coinlore.net
     */
    const loadCurrencies = async () => {

        setLoading(true);

        await axios.get('https://api.coinlore.net/api/tickers/')
            .then(({ data: response }) => {
                setCurrencies(response.data)
                setCurrenciesTmp(response.data)
            })
            .catch(() => console.log("no es posible cargar datos..."))
            .finally(() => setLoading(false))
    }

    /**
     * Rendedirazar item de la lista
     * cargar un componente externo <Item>
     */
    const renderItem = ({ item }) => <CurrencyComponent navigation={props.navigation} currency={item} />

    /**
     * Buscar en el listado de currencies temporal
     * atraves de un string
     */
    const onHandleSearch = () => setCurrencies(filterByValue());

    /**
     * Lipiar los datos de la busqueda
     * Volver a cargar el historico temporal
     */
    const onHandleCancelSearch = () => {
        setCurrencies(currenciesTmp);
        setFilter("");
    }

    /**
     * Filtrar currencies por string
     * @returns Array de currencies
     */
    const filterByValue = () => {
        return currencies.filter(function (obj) {
            //loop through each object
            for (key in obj) {
                try {
                    if (obj[key].includes(filter)) return obj;
                } catch (e) { }
            }
        });

    }

    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <StatusBar />

            {/** content filter */}
            <View style={styles.contentSearch}>
                <TextInput
                    style={styles.input}
                    value={filter}
                    onChangeText={setFilter}
                    placeholder={"Filter crypto currency..."}
                />
                <Button
                    title="Search"
                    color="darkorchid"
                    accessibilityLabel="Search"
                    onPress={() => onHandleSearch()}
                />
                <View style={{ marginLeft: 8 }}>
                    <Button
                        title="Clear"
                        color="darkorchid"
                        onPress={() => onHandleCancelSearch()}
                    />
                </View>
            </View>

            <ScrollView contentInsetAdjustmentBehavior="automatic">

                {/** loading */}
                {loading && <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                    <Text>Loading...</Text>
                </View>}

                {/** body - list currencies */}
                <View style={{ padding: 10 }}>
                    <FlatList
                        data={currencies}
                        renderItem={renderItem}
                        keyExtractor={currency => currency.id}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const CurrencyComponent = ({ navigation, currency }) => {

    /**
    * Ver detalles la curreccy seleccionada
    */
    const setSelected = () => navigation.navigate('Details', { currency })
    return (
        <TouchableOpacity onPress={() => setSelected()}>
            <View style={styles.listItem}>
                <Text style={styles.listItemTitle}>Divisa: {currency.name} ({currency.symbol})</Text>
                <Text style={styles.listItemSubTitle}>Price USD: {currency.price_usd}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "darkviolet",
        padding: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 32,
        color: 'white'
    },
    contentSearch: {
        paddingHorizontal: 20,
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        height: 70,
    },
    listItem: {
        padding: 10
    },
    listItemTitle: {
        fontSize: 18,
        color: "darkviolet",
        fontWeight: 'bold'
    },
    listItemSubTitle: {
        fontSize: 15,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        margin: 0,
        marginRight: 10,
        borderColor: "gainsboro"
    },
});

export default Home;