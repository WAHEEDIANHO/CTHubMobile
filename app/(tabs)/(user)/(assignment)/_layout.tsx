import React from 'react';
import { Stack } from 'expo-router';

function AssignmentLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            {/*<Stack.Screen name="driver" options={{ headerShown: false}} />*/}
        </Stack>
    );
}

export default AssignmentLayout;