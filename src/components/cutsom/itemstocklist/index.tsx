import React from 'react';
import { Text, Pressable, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../../utils/colors';
import styles from './styles';

interface ItemStockProps {
    item: any;
    index: number;
    selecteItemIndex: number;
    onStockItemClick: (item: any, index: number) => void;
}

const ItemStockList: React.FC<ItemStockProps> = ({
    item,
    index,
    selecteItemIndex,
    onStockItemClick,
}) => {
    const handleOnStockItemClick = () => {
        onStockItemClick(item, index);
    };
    return (
        <Pressable onPress={handleOnStockItemClick}>
            <LinearGradient
                style={styles.llContainer}
                colors={index === selecteItemIndex ? [Colors.light_white, Colors.black] : [Colors.light_gray, Colors.dark_gray]}>
                <View style={styles.vStockDetailContainer}>
                    <Text
                        numberOfLines={2}
                        style={styles.tTitle}>
                        {item.name}
                    </Text>
                    <Text style={styles.tTypeOfStock}>
                        {`${item.companyName}`}
                    </Text>
                </View>
            </LinearGradient>
        </Pressable>
    );
};

export default ItemStockList;
