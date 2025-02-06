import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
 
 class SignalRConn {
   
    private static conn: HubConnection | null
    
    
   static async init(userId: string) {
         SignalRConn.conn = new HubConnectionBuilder()
            .withUrl(`http://192.168.0.125:5125/notification-hub?userId=${userId}`)
            // .withUrl("http://192.168.0.102:5125/notification-hub")
             .withAutomaticReconnect()
            .build();

        await SignalRConn.conn.start();
    }
    
    static getConnection() {
        return SignalRConn.conn;   
    }
}

export default SignalRConn;