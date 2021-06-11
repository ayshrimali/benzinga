import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, ActivityIndicator, Pressable, Button, Platform, Alert, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../router';
import { fetchStockDetail } from '../../api/apiservice'
import styles from './styles';
import ItemStockList from '../../components/cutsom/itemstocklist'
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryCandlestick } from "victory-native";
import moment from 'moment'
import Config from '../../utils/config';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Colors from '../../utils/colors';


interface ChartScreenProps {
    navigation: StackNavigationProp<RootStackParamList>;
    commonState: CommonStateProps;
}

interface CommonStateProps {
    isLoading: false;
}

interface Stock {
    name: string;
    typeOfStock: string;
    companyName: string;
}

interface PriceChart {
    x: Date;
    open: number;
    close: number;
    high: number;
    low: number;
}

interface VolumeChart {
    time: number;
    volume: number;
}

const ChartScreen: React.FC<ChartScreenProps> = ({ navigation }) => {
    const pickerRef = useRef<any>();
    const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [showStartDate, setShowStartDate] = useState<boolean>(false);
    const [showEndDate, setShowEndDate] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<Date>(moment().add(-7, 'days').toDate())
    const [endDate, setEndDate] = useState<Date>(new Date())
    const [interval, setInterval] = useState<string>('1d')
    const [volumeChartData, setVolumeChartData] = useState<VolumeChart[]>([])
    const [priceChartData, setPriceChartData] = useState<PriceChart[]>([])
    const [stockList, setStockList] = useState<Stock[]>([
        {
            name: 'UPWK',
            typeOfStock: 'Common Stock',
            companyName: 'Upwork Inc.'
        },
        {
            name: 'TSLA',
            typeOfStock: 'Common Stock',
            companyName: 'Tesla, Inc.'
        },
        {
            name: 'RKT',
            typeOfStock: 'Common Stock',
            companyName: 'Rocket Companies,Inc.'
        },
        {
            name: 'REAL',
            typeOfStock: 'Common Stock',
            companyName: 'The RealReal,Inc.'
        }
    ]);

    useEffect(() => {
        if (selectedItemIndex === 0) {
            fetchChartData(stockList[0].name, startDate, endDate, interval)
        }
    }, [])

    const fetchChartData = (stockName: string, startDate: Date, endDate: Date, interval: string) => {
        setLoading(true);
        const volumeData: React.SetStateAction<VolumeChart[]> = [];
        const priceData: React.SetStateAction<PriceChart[]> = [];
        const strStartDate = moment(startDate).format(Config.DATE_FORMAT);
        const strEndDate = moment(endDate).format(Config.DATE_FORMAT);
        fetchStockDetail(stockName, strStartDate, strEndDate, interval).then((stockInfo: any) => {
            if (stockInfo.length) {
                stockInfo[0]?.candles?.forEach((element: any) => {
                    volumeData.push({
                        time: element.time/1000,
                        volume: +element.volume
                    });
                    priceData.push({
                        x: new Date(element.time/1000),
                        open: element.open,
                        close: element.close,
                        high: element.high,
                        low: element.low
                    })
                });
                setVolumeChartData(volumeData);
                setPriceChartData(priceData);
            }
            setLoading(false);
        }).catch((e: any) => {
            console.error(e)
            setLoading(false);
        })
    }

    const handleOnClick = (item: any, index: number) => {
        setSelectedItemIndex(index)
        fetchChartData(item.name, startDate, endDate, interval)
    }
    const renderStockList = (props: any) => {
        return (
            <ItemStockList
                {...props}
                onStockItemClick={handleOnClick}
                selecteItemIndex={selectedItemIndex}
            />)
    }

    const onStartDateChange = (event: Event, selectedDate?: Date) => {
        setShowStartDate(Platform.OS === 'ios');
        if (selectedDate) {
            setStartDate(selectedDate);
            fetchChartData(stockList[selectedItemIndex].name, selectedDate, endDate, interval)
        }
    };

    const onEndDateChange = (event: Event, selectedDate?: Date) => {
        setShowEndDate(Platform.OS === 'ios');
        if (selectedDate) {
            setEndDate(selectedDate);
            fetchChartData(stockList[selectedItemIndex].name, startDate, selectedDate, interval)
        }
    };

    const onIntervalChange = (itemValue: string, itemIndex: number) => {
        setInterval(itemValue)
        fetchChartData(stockList[selectedItemIndex].name, startDate, endDate, itemValue)
    }

    return (
        <View style={styles.vContainer}>
            <View style={{flex: 1}}>
                <View style={styles.toolbarContainer}>
                    <Button onPress={() => { setShowStartDate(true) }} title={moment(startDate).format(Config.DATE_FORMAT)} />
                    <View style={styles.intervalPicker}>
                        <Pressable style={{width: 100, height: 30}} onPress={() => {pickerRef.current?.focus()}}>
                            <Text style={{height: '100%', paddingTop: 6, textAlign: 'center'}}>{interval}</Text>
                        <Picker
                            ref={pickerRef}
                            selectedValue={interval}
                            mode={'dialog'}
                            enabled={true}
                            prompt={'Select Interval'}
                            style={{width: 0}}
                            dropdownIconColor={'white'}
                            onValueChange={onIntervalChange}>
                            <Picker.Item label="5m" value="5m" />
                            <Picker.Item label="15m" value="15m" />
                            <Picker.Item label="30m" value="30m" />
                            <Picker.Item label="1h" value="1h" />
                            <Picker.Item label="1d" value="1d" />
                        </Picker>
                        </Pressable>
                    </View>
                    <Button onPress={() => { setShowEndDate(true) }} title={moment(endDate).format(Config.DATE_FORMAT)} />
                    {showStartDate && <DateTimePicker
                        value={startDate}
                        mode={'date'}
                        display="default"
                        onChange={onStartDateChange}
                        />}
                    {showEndDate && <DateTimePicker
                        value={endDate}
                        mode={'date'}
                        display="default"
                        onChange={onEndDateChange}
                        />}
                </View>
                <View style={styles.priceChartContainer}>
                    <VictoryChart
                        theme={VictoryTheme.material}
                        domainPadding={20}
                        height={320}>
                        <VictoryAxis
                            dependentAxis
                            tickFormat={(x) => (`${x/1000}k`)} />
                        <VictoryAxis
                            tickFormat={(y) => (moment.unix(y).format(Config.SHORT_DATE_FORMAT))}
                        />
                        <VictoryCandlestick
                            candleColors={{ positive: Colors.candle_green, negative: Colors.candle_red }}
                            data={priceChartData}
                            animate={{
                                duration: 1000,
                                onLoad: { duration: 1000 }
                              }}
                            />
                    </VictoryChart>
                </View>
                <View style={styles.volumeChartContainer}>
                    <VictoryChart
                        theme={VictoryTheme.material}
                        domainPadding={20}
                        height={180}>
                        <VictoryAxis
                            dependentAxis
                            tickFormat={(x) => (`${x/1000}k`)} />
                        <VictoryAxis
                            tickFormat={(y) => (moment.unix(y).format(Config.SHORT_DATE_FORMAT))}
                        />
                        <VictoryBar
                            barRatio={0.6}
                            data={volumeChartData}
                            x="time"
                            y="volume"
                            animate={{
                                duration: 2000,
                                onLoad: { duration: 1000 }
                              }}
                        />
                    </VictoryChart>
                </View>
                {loading && <View style={styles.loadingContainer}>
                    <ActivityIndicator
                        size={32}
                        color={'white'} />
                </View>}
            </View>
            <View style={{margin: 8}}>
                <FlatList
                    keyExtractor={(item, index) => `Flatlist-${index}`}
                    data={stockList}
                    renderItem={renderStockList}
                    overScrollMode='never'
                    bounces={false}
                />
            </View>
        </View>
    );
};


export default ChartScreen;

