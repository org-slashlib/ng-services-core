/**
 *  © 2019, slashlib.org.
 */

 import { SyncLoggingService }      from "./logging.service"
 describe( "Service: SyncLoggingService', () => {

   let service: SyncLoggingService;

   beforeEach(() => {
     service = new SyncLoggingService();
   });

   let callback: ( action: string, message: string ) => void;
       callback = function( action: string, message: string ) { console.log( action, message ); };

   describe( "#connect should append callbacks", () => {
     service.connect( "test", callback );
     expect( service.isConnected( "test" )).toEqual( true );
   });
 });
