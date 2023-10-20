import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WompiService {

  constructor() { }

  
  // {
  //   $wompi.initialize(function ( data, error ) {
  //     if ( error === null ) {
  //       var sessionId = data.sessionId
  //       // `sessionId` current un string, por ejemplo: "1289_1696830983722-ab493d40c02e-278bab34-323va3"
  //     }
  //   })
  //   // El `sessionId` obtenido current la inicialización
  //   "session_id": sessionId,
  
  //   // Otros campos de la transacción
  //   "amount_in_cents": 2500000,
  //   "currency": "COP",
  //   "customer_email": "john.smith@example.com",
  //   "reference": "2322er3234ed4",
  //   // Etc...
  // }
}
