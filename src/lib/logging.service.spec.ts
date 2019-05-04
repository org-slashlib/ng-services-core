/**
 *  © 2019, slashlib.org.
 */
import { Message }                 from "./logging.service";
import { SyncLoggingService }      from "./logging.service";

describe( "Service: SyncLoggingService", () => {

  let service: SyncLoggingService;
  let callback: ( action: string, message: string ) => void;

  /**
   * Create the service which is to be tested and a testcallback.
   */
  beforeAll(() => {
    service  = new SyncLoggingService();
    callback = jasmine.createSpy( "callback" );
  });

  describe( "testing mockups", () => {
    /**
     *  Check if service is available
     */
    it( "Check testing precondition: instance of SyncLoggingService should exist", () => {
        // service must not be undefined
        expect( service ).toBeDefined();
        // service must not be null.
        // be aware that undefined is not null.. see test above.
        expect( service ).not.toBeNull();
    });

    /**
     *  Check if testcallback is available
     */
    it( "Check testing precondition: callback should exist", () => {
        // callback must not be undefined
        expect( callback ).toBeDefined();
        // callback must not be null.
        // be aware that undefined is not null.. see test above.
        expect( callback ).not.toBeNull();
    });
  });

  describe( "testing on completeness", () => {
    it( "SyncLoggingService::connect - method should exist", () => {
        // service member must not be undefined
        expect( service.connect ).toBeDefined();
        // service member must not be null.
        // be aware that undefined is not null.. see test above.
        expect( service.connect ).not.toBeNull();
    });

    it( "SyncLoggingService::disconnect - method should exist", () => {
        // service member must not be undefined
        expect( service.disconnect ).toBeDefined();
        // service member must not be null.
        // be aware that undefined is not null.. see test above.
        expect( service.disconnect ).not.toBeNull();
    });

    it( "SyncLoggingService::isConnected - method should exist", () => {
        // service member must not be undefined
        expect( service.isConnected ).toBeDefined();
        // service member must not be null.
        // be aware that undefined is not null.. see test above.
        expect( service.isConnected ).not.toBeNull();
    });

    it( "SyncLoggingService::notify - method should exist", () => {
        // service member must not be undefined
        expect( service.notify ).toBeDefined();
        // service member must not be null.
        // be aware that undefined is not null.. see test above.
        expect( service.notify ).not.toBeNull();
    });
  });

  describe( "functional testing", () => {
    it( "SyncLoggingService::connect should append callbacks", () => {
        // connected or not ...
        // we expect the spy to get connected
        let id = "callback";
        service.connect( id, callback );
        expect( service.isConnected( id )).toEqual( true );
    });

    it( "SyncLoggingService::disconnect should remove callbacks", () => {
        // connected or not ...
        // we expect the spy to get disconnected
        let id = "callback";
        service.disconnect( id );
        expect( service.isConnected( id )).toEqual( false );
    });

    it( "SyncLoggingService::notify should call callbacks", () => {
        let id = "callback";
        if ( ! service.isConnected( id )) {
             service.connect( id, callback );
        }
        // we expect the spy to bet connected
        expect( service.isConnected( id )).toEqual( true );

        // we expect the spy to be called
        service.notify({ action: "action", message: "message" });
        expect( callback ).toHaveBeenCalled();

        // we expect the spy to get disconnected
        service.disconnect( id );
        expect( service.isConnected( id )).toEqual( false );
    });
  });
});
