import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { map, retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import * as _ from 'lodash';

import { Dataframe } from '../models/dataframe.model';

const SERVER_URL = 'http://110.35.173.17:14040';

interface DataframeResponse {
  rowCount: number;
  partitionCount: number;
  columns: Array<{
    name: string;
    type: string;
  }>;
}

@Injectable()
export class DataframeService {

  constructor(private http: HttpClient) { }

  getDataframe(name: string): Observable<Dataframe> {
    return this.http.get<DataframeResponse>(`${SERVER_URL}/getData`, {
      params: new HttpParams().set('name', name)
    })
    .pipe(
      retry(3),
      catchError(this.handleError),
      map<DataframeResponse, Dataframe>(res => ({
          ...res,
          id: _.uniqueId(),
          name: name,
          columns: res.columns.map(d => ({
            ...d,
            id: _.uniqueId(),
            isCategorical: d.type === 'string',
            isContinuous: d.type !== 'string',
            isDiscrete: d.type !== 'string',
          })),
        })
      ),
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  }
}
