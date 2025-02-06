import React, {useState, useCallback, useMemo} from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import ButtomSheetBackDrop from "@/components/ButtomSheetBackDrop";

type CthubBottomSheetProps = {
    children: React.ReactNode;
    bottomSheetRef: React.RefObject<BottomSheet>;
    componetSnapPoint: number[];
    hasPrevious: boolean
    back?: () => void 
}
import Feather from '@expo/vector-icons/Feather';
export function CTHubBottomSheet({children, 
                                     bottomSheetRef, 
                                     componetSnapPoint, 
                                     hasPrevious, 
                                     back
                                 }: CthubBottomSheetProps ) {

    const [idx, setIdx] = useState<number>(0);
    const snapPoints: number | number[] = componetSnapPoint //|| [150, 300, 450];

    const handleSheetChanges = useCallback((index: number) => {
        setIdx(index);
        console.log('handleSheetChanges', index);
    }, []);


    return (
        // <GestureHandlerRootView style={[styles.container, { height: snapPoint}]}>
            <BottomSheet
                index={0}
                // index={0}
                ref={bottomSheetRef}
                onChange={handleSheetChanges}
                snapPoints={snapPoints}
                backdropComponent={() => <ButtomSheetBackDrop hasPrevious={hasPrevious} back={back} snapPoint={snapPoints[idx]} />}
            >
                <BottomSheetView  className="flex-1 p-5">
                    {children}
                </BottomSheetView>
            </BottomSheet>
        // </GestureHandlerRootView>
    );
}

// export default CThubBottomSheet;