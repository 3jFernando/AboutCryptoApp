import React, { useEffect, useState } from 'react'
import { Text, SafeAreaView, View, StyleSheet, ScrollView } from 'react-native'

export default function Home({ route, navigation }) {

    const [currency, setCurrency] = useState({});

    useEffect(() => {

        setCurrency(route.params.currency);

        return () => {
            //
        };
    }, []);

    return (
        <SafeAreaView style={styles.body}>
            <ScrollView>
                {currency ? (
                    <View style={styles.content}>

                        {/** header */}
                        <View style={styles.header}>
                            <Text style={styles.symbol}>{currency.symbol} </Text>
                            <Text style={styles.subTitle}>$ {currency.price_usd}</Text>
                            <Text style={styles.title}>{currency.name} </Text>
                        </View>

                        {/** Mas detalles */}
                        <View style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                            <View style={styles.contentDetails2}>
                                <View style={styles.contentDetails2Item}>
                                    <Text style={styles.contentDetails2ItemTitle}>{currency.percent_change_1h} %</Text>
                                </View>
                                <Text>change 1h</Text>
                            </View>
                            <View style={styles.contentDetails2}>
                                <View style={styles.contentDetails2Item}>
                                    <Text style={styles.contentDetails2ItemTitle}>{currency.percent_change_24h} %</Text>
                                </View>
                                <Text>change 24h</Text>
                            </View>
                            <View style={styles.contentDetails2}>
                                <View style={styles.contentDetails2Item}>
                                    <Text style={styles.contentDetails2ItemTitle}>{currency.percent_change_7d} %</Text>
                                </View>
                                <Text>change 7d</Text>
                            </View>
                        </View>

                        {/** detalles */}
                        <View style={styles.contentDetails1}>
                            <View style={styles.contentDetails1Item}>
                                <Text style={styles.contentDetails1ItemTitle}>Price BTC: {currency.price_btc}</Text>
                            </View>
                            <View style={styles.contentDetails1Item}>
                                <Text style={styles.contentDetails1ItemTitle}>Price USD: {currency.price_usd}</Text>
                            </View>
                            <View style={styles.contentDetails1Item}>
                                <Text style={styles.contentDetails1ItemTitle}>Volume 24: {currency.volume24}</Text>
                            </View>
                            <View style={styles.contentDetails1Item}>
                                <Text style={styles.contentDetails1ItemTitle}>Volume 24a: {currency.volume24a}</Text>
                            </View>
                            <View style={styles.contentDetails1Item}>
                                <Text style={styles.contentDetails1ItemTitle}>Rank: {currency.rank}</Text>
                            </View>
                            <View style={styles.contentDetails1Item}>
                                <Text style={styles.contentDetails1ItemTitle}>CSupply: {currency.csupply}</Text>
                            </View>
                            <View style={styles.contentDetails1Item}>
                                <Text style={styles.contentDetails1ItemTitle}>MSupply: {currency.msupply}</Text>
                            </View>
                            <View style={styles.contentDetails1Item}>
                                <Text style={styles.contentDetails1ItemTitle}>TSupply: {currency.tsupply}</Text>
                            </View>
                            <View style={styles.contentDetails1Item}>
                                <Text style={styles.contentDetails1ItemTitle}>Market cap USD: {currency.market_cap_usd}</Text>
                            </View>
                        </View>

                    </View>
                ) : <Text>The crypto has problem :(</Text>}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'white',
        height: '100%'
    },
    content: {

    },
    header: {
        height: 350,
        alignItems: 'center',
        paddingTop: 100,
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25,
        marginBottom: 10
    },
    title: {
        fontSize: 18,
        color: 'black',
        fontWeight: '600'
    },
    symbol: {
        fontSize: 80,
        color: 'black',
        fontWeight: 'bold'
    },
    subTitle: {
        fontSize: 60,
        color: 'deepskyblue',
        fontWeight: 'bold'
    },
    contentDetails1: {
        padding: 10,
    },
    contentDetails1Item: {
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        borderColor: 'gainsboro',
        marginBottom: 4
    },
    contentDetails1ItemTitle: {
        color: 'black',
        fontWeight: "700",
        fontSize: 14
    },
    contentDetails2: {
        alignItems: 'center',
        margin: 10
    },
    contentDetails2Item: {
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        height: 70,
        width: 90,
        backgroundColor: 'deepskyblue',
        borderColor: 'deepskyblue',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentDetails2ItemTitle: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold'
    }
});