export interface IService {
    id: number;
    name: string;
	service: "RED" | "TEL" | "ELE" | "WAT" | "GAS" | "FOO" | "ENT" | "OTH";
	amount: number;
	month: number;
	year: number;
}