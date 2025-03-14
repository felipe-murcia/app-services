import * as SQLite from 'expo-sqlite';

export type Service = {
  id: number;
  service: string;
  quantity: number;
  year: number;
  month: string;
};

const db = await SQLite.openDatabaseAsync('services.db');

// Crear la tabla si no existe
export const setupDatabase = async () => {
  await db.execAsync(
      `CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        service TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        year INTEGER NOT NULL,
        month TEXT NOT NULL
      );`
  );

};

// // Insertar un service
// export const addService = (service: string, quantity: number, year: number, month: string, successCallback: () => void): void => {
//   db.transaction(tx => {
//     tx.executeSql(
//       'INSERT INTO services (service, quantity, year, month) VALUES (?, ?, ?, ?);',
//       [service, quantity, year, month],
//       () => successCallback(),
//       (_, error) => {
//         console.error('Error insertando service', error);
//         return false;
//       }
//     );
//   });
// };

// Obtener todos los services
export const getServices = async () => {
    const firstRow = await db.getAllAsync('SELECT * FROM services');
    console.log('data', firstRow); 
};


// // Actualizar un service
// export const updateService = (id: number, service: string, quantity: number, year: number, month: string, successCallback: () => void): void => {
//   db.transaction((tx:any) => {
//     tx.executeSql(
//       'UPDATE services SET service = ?, quantity = ?, year = ?, month = ? WHERE id = ?;',
//       [service, quantity, year, month, id],
//       () => successCallback(),
//       (error:any) => {
//         console.error('Error actualizando service', error);
//         return false;
//       }
//     );
//   });
// };

// // Eliminar un service
// export const deleteService = (id: number, successCallback: () => void): void => {
//   db.transaction(tx => {
//     tx.executeSql(
//       'DELETE FROM services WHERE id = ?;',
//       [id],
//       () => successCallback(),
//       (_, error) => {
//         console.error('Error eliminando service', error);
//         return false;
//       }
//     );
//   });
// };

//export default db;
