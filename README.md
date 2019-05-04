## org.slashlib core services for angular ##

Basic services for reuse with angular6/7 projects

## building the library ##

* Browse https://github.com/org-slashlib/ng-project-template and download (no fork required!) a zip/tar of the the project template.
* Run <code> npm install </code> in the project template folder.
* Download or fork this project and link it into the templates subfolder.
* Run: <code> grunt </code>
* Change to build directory: <code> cd build </code>
* Call <code> ng build ng-services-core </code>
* Call <code> ng test ng-services-core </code> if you want to run the tests
* Change to dist directory: <code> npm pack </code>
* Install built package for other projects: <br />
  <code> npm install path/to/@org.slashlib-ng-services-core-&lt;version&gt;.tgz</code>

## getting started ##

This guide assumes, that you are familiar with the use of npm.  

Either<br />
download/build <code>org.slashlib-ng-services-core-&lt;version&gt;.tgz</code><br />
and install <code> npm install path/to/@org.slashlib-ng-services-core-&lt;version&gt;.tgz</code><br />
<br />
or<br/>
<code>npm install @org.slashlib/ng-services-core --save-dev</code>

## usage ##

Add the following lines to your app module:

```javascript
import { SyncLoggingService }         from "@org.slashlib/ng-services-core";

@NgModule({
  imports:      [ ... ],
  declarations: [ ... ],
  providers:    [
    SyncLoggingService        // service for synchronous logging
  ],
  bootstrap:    [ ... ]
})
export class AppModule { }

```

Pseudocode snippet for example usage: getting rid of error messages.<br />
You can simply dump the errors to the SyncLoggingService.  
Some other component might register, get notified, filters, translates and displays the message to a user or transfers it to another part of the system.

```javascript
import { Http }                       from "@angular/http";
import { Response }                   from "@angular/http";
import { SyncLoggingService }         from "@org.slashlib/ng-services-core";

import { catchError }                 from "rxjs/operators";
import { map }                        from "rxjs/operators";
import { Observable }                 from "rxjs";

class ErrorHandler {

  constructor( private synclogsvc: SyncLoggingService ) { }

  /**
   *  Error handling on failed service requests.
   */
  public handleError<T>( url: string, result?: T ) {
    return ( error: any ): Observable<T> => {
      // log error to the loggingservice
      this.synclogsvc.log.error( error.toString());

      // handle the error ...

      // return (maybe empty) result => app won't crash.
      return observableOf( result as T );
    }
  }
}

@Injectable()
export class DataService extends ErrorHandler {

  constructor( synclogsvc: SyncLoggingService ) { super( synclogsvc ); }

  public getData(): Observable<Data> {
    let locActionUrl: string = "<your url here>";
    return this.http.get( locActionUrl )
                    .pipe( map(( response: Response ) => <Data[]>response.json()),
                           catchError( this.handleError( locActionUrl, [] as Array<Data> )));
  }
}
```
