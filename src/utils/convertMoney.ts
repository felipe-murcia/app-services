import { servicesData } from "../constant/data";


export const convertMoney = (amount:any) => {

    try {
      amount = amount.toString()
      amount = amount.replace(/,/g, '');
      amount = amount.replace(/\$/g, '');
      let valorConvertido = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return '$'+valorConvertido
    } catch (e) {
      console.log("Error de moneda "+e)
      return null
    }
  }

  export const getNameService = (service:string) => {
    servicesData.map((item) => {
      if(item.id == service){
        return item.id
      }
    })
    return 'Null';
  }

  export const getItemService = (service:string) => {
    return servicesData.find((item) => item.id == service  )
  }