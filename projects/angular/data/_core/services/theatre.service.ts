import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HttpServiceConfig, HTTP_SERVICE_CONFIG } from '../configs';
import { Theatre, Attempt, RequestOptions } from '../models';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class TheatreService extends BaseService<Theatre> {
  constructor(
    @Inject(HTTP_SERVICE_CONFIG) public config: HttpServiceConfig,
    httpClient: HttpClient
  ) {
    super(config, 'theatres', httpClient);
  }

  list(venueId: number, options?: RequestOptions): Observable<Theatre[]> {
    this.loading.next(true);
    return this.httpClient
      .get<Attempt<Theatre[]>>(
        `${this.config.apiUrl}/venues/${venueId}/theatres`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<Theatre[]>) => {
          if (response.failure) return response.result;
          this.items.next(response.result);
          return response.result;
        }),
        finalize(() => this.loading.next(false))
      );
  }

  registerInterest(id: number, options?: RequestOptions): Observable<void> {
    return this.httpClient
      .post<Attempt<void>>(
        `${this.config.apiUrl}/${this.endpoint}/${id}/interested`,
        options?.getRequestOptions()
      )
      .pipe(
        map((response: Attempt<void>) => {
          return response.result;
        })
      );
  }
}
