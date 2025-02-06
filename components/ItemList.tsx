import React from 'react';
import {Text, TouchableOpacity} from "react-native";

type ItemListProps = {
    pressHandler: () => void;
    children?: React.ReactNode;
    value?: string;
}
export function ItemList({ pressHandler, children, value }: ItemListProps) {
    return (
        <TouchableOpacity
            className="px-4 py-6 border-b border-gray-200"
            onPress={pressHandler}
        >
            {children}
            <Text className="text-2xl">{value}</Text>
        </TouchableOpacity>
    );
}

// export default ItemList;