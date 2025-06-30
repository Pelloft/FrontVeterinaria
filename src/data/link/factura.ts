const Factura = '/servicios/';
// const response = await axios.get('https://localhost:44362/api/servicios');



const FacturaUrls = {

    Factura: `${Factura}`,
    // ReservasSaveWithDoc: `${Factura}SaveWithDoc/`,
    // ReservasUpdateWithDoc: `${Factura}UpdateWithDoc/`,


};

export default FacturaUrls;


// async update(dataSave: CargaActualizacion): Promise < Carga > {
//     try {
//         const config: AxiosRequestConfig = {
//             method: 'PUT',
//             url: `${FacturaUrls.Factura}`,
//             headers: { 'Content-Type': 'application/json' },
//             data: dataSave
//         };
//         const result = await AxiosHelper.executeRequestWithoutType(config);
//         const data: JsonResponse<Carga> = result.data;
//         if(data.status === ResponseStatus.success) {
//     return data.data;
// } else {
//     throw new Error(data.message);
// }
//     } catch (error) {
//     throw error;
// }
// }