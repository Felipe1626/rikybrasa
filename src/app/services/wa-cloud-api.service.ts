import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../wa-cloud/common/api-resources';
import { environment } from '../models/environment';
import { WACloudRequest } from '../wa-cloud/wa/interfaces/wa-cloud-request.interface';
import { WACloudResponse } from '../wa-cloud/wa/interfaces/wa-cloud-response.interface';
import { Parameter, PurchaseConfirmation } from '../wa-cloud/wa/interfaces/purchase-confimation.interface';

@Injectable({
  providedIn: 'root'
})
export class WaCloudApiService {

  private apiUrl = environment.waCloudUrl
  constructor(private http: HttpClient) { }

  sendMessage(_parameters: Parameter[]): Observable<WACloudResponse> {
    let purchase: PurchaseConfirmation
    purchase = {
      messaging_product: "whatsapp",
      to: environment.toNumber,
      type: "template",
      template: {
        name: "product_sold",
        language: { code: "en_Us" },
        components: [
          {
            type: "body",
            parameters: _parameters
          }
        ]
      }
    }
        
    return this.http.post<WACloudResponse>(this.apiUrl, purchase)
  }
}
