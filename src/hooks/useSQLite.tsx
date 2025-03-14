

import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import { IDate } from '../interface/IDate';
import { IService } from '../interface/IService';


export const useSQLite = ({ month = 0 , year = 0 }:IDate) => {

    const database = SQLite.useSQLiteContext();

    const [ data, setData ] = useState<any>([]);
    // const [ loading, setLoading ] = useState<boolean>(true);

    useEffect(() => {
        loadData({ month, year});
    }, [ month, year ]);

    const loadData = async (data: IDate) => {
        try {          
            console.log('carga inical ', data);
            const result = await database.getAllAsync<IService>(`SELECT * FROM services WHERE month = ? AND year = ?; `, [ data.month, data.year]);
            console.log('result', result);
            setData(result);
        } catch (error) {
            console.log('Error loading data', error);
        }
    };

    const createData = async (data:IService) => {
        try {

            const response = await database.runAsync(
                `INSERT INTO services (name, service, amount, year, month) VALUES ( ?, ?, ?, ?, ?)`,
                [
                    data.name,
                    data.service,
                    data.amount,
                    data.year,
                    data.month
                ]
              );
            //loadData({ month, year});
            console.log("Item saved successfully:",  response?.changes!);
            return response?.changes!;
        } catch (error) {
            console.log('Error creating table', error);
            return false;
        }
    };

    return { data, loadData, createData };
}
