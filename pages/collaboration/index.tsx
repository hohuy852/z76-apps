import React, { useEffect, useRef, useState } from 'react';
import { HotTable, HotColumn } from "@handsontable/react-wrapper";
import { io } from 'socket.io-client';
import 'handsontable/dist/handsontable.full.css';

const socket = io('http://localhost:3333', {
    transports: ['websocket'], 
  });

  const CollaborativeTable = () => {
    const [data, setData] = useState<any[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [connectedUsers, setConnectedUsers] = useState<number>(0); // State to track connected users
  
    useEffect(() => {
      // Load initial data from server when the connection is established
      socket.on('load-data', (tableData: any[]) => {
        setData(tableData);
      });
  
      // Listen for updates to the connected users count
      socket.on('connected-users', (count: number) => {
        setConnectedUsers(count);
      });
  
      socket.on('connect', () => {
        setIsConnected(true);
      });
  
      socket.on('disconnect', () => {
        setIsConnected(false);
      });
  
      return () => {
        socket.off('load-data');
        socket.off('connected-users');
        socket.off('connect');
        socket.off('disconnect');
      };
    }, []);
  
    // Handle changes in the table
    const handleTableChange = (changes: any, source: string) => {
      if (source === 'edit') {
        // Send updated data to the server
        socket.emit('update-data', data);
      }
    };
  
    return (
      <div>
        <h1>Collaborative Table (Real-time Edit)</h1>
        <HotTable
          data={data}
          colHeaders={['First Name', 'Last Name', 'Email']}
          rowHeaders={true}
          columns={[{}, {}, {}]} // Set column types if needed
          contextMenu={true}
          width="100%"
          height="400"
          afterChange={handleTableChange}
          licenseKey="non-commercial-and-evaluation"
        >
          <HotColumn data={0} />
          <HotColumn data={1} />
          <HotColumn data={2} />
        </HotTable>
  
        <div>{isConnected ? 'Connected to the server' : 'Disconnected'}</div>
        <div>Connected users: {connectedUsers}</div> {/* Display the number of connected users */}
      </div>
    );
  };
  
  export default CollaborativeTable;
