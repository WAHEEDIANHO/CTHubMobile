import React, {RefObject, useCallback, useEffect, useRef} from 'react';
import {CTHubBottomSheet} from "@/components/CTHubBottomSheet";
import {FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import {useStopsQuery} from "@/hooks/stops/useStopsQuery";
import {ItemList} from "@/components/ItemList";
import {useRideStore} from "@/store/rideStore";
import {useUserStore} from "@/store/userStore";
import {SheetStatusProps} from "@/app/(tabs)/(user)";

type WhereToProps = {
    // bottomSheetRef:  React.RefObject<BottomSheetMethods>
    activeSheet: SheetStatusProps;
    setActiveSheet: React.Dispatch<React.SetStateAction<SheetStatusProps>>;
}
function WhereTo({ activeSheet, setActiveSheet }: WhereToProps) {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const { isPending, isError, data, error, isSuccess } = useStopsQuery();
    const [search, setSearch] = React.useState<string>("");
    // const setRide = useRideStore(state => state.setRide);
    const {updateRide, setRide} = useRideStore(state => state);
    const  user = useUserStore(state => state.user);
    
    
    const filterStop = data?.items
        .filter(
            (item: any) => (item.stopName.toLowerCase().includes(search.toLowerCase()))); 
    // if (isSuccess) 
    
    const start = data?.items.filter((item: any) => (item.stopName.toLowerCase() == "main gate"))[0];
    
    // const [filterStop, setFilterStop] = React.useState<any>();
    // if (isSuccess) setFilterStop(data.items);
    // console.log(filterStop, "filterStop");
    
    if (isPending) return <Text>Loading...</Text>
    if (isError) return <Text>"Error occured</Text>

    // console.log(data.items[0].stopName, "data");
    // const renderItem = useCallback(
    //     ({ item }: {item: any}) => (
    //         <View>
    //             <Text>{item.stopName}</Text>
    //         </View>
    //     ),
    //     []
    // );
    
    const searchHandler = (e: any) => {
        setSearch(e)
        // console.log(e, "search");
    }

    const handelSelection = ({id, name}: {id: string,  name: string}) => {
        console.log({id, name})
        setRide(user.id)
        updateRide({endStopId: id, startStopId: start.id})
        setActiveSheet({...activeSheet, whereTo: false, rideType: true})
    }
    
      
    return (
        <CTHubBottomSheet hasPrevious={false} bottomSheetRef={bottomSheetRef} componetSnapPoint={[300, 400]}>
            <View className="flex-row items-center bg-gray-100 p-3 rounded-3xl">
                <View
                    className="flex-row flex gap-x-3 items-center self-start bg-gray-200 justify-center w-[50] h-[50] rounded-['50%']">
                    <Feather name="search" size={32} color="black"/>
                </View>
                <View className="flex-1 ps-3">
                    <TextInput
                        placeholder="Where to?"
                        className="w-full placeholder:text-black placeholder:font-bold"
                        onFocus={() => bottomSheetRef.current?.expand()}
                        onChangeText={searchHandler}
                    />
                </View>
            </View>
            
            
            <BottomSheetFlatList
                className="mt-5"
                // keyExtractor={(item) => item}
                data={filterStop}
                renderItem={({item}: any) => <ItemList 
                        pressHandler={() => handelSelection({ id: item.id, name: item.stopName })} value={item?.stopName?.toUpperCase()} />                 // console.log(item.stopName, "stopName");
                }
                />
        </CTHubBottomSheet>
    );
}
export default WhereTo;