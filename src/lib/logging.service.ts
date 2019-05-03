/**
 *  © 2019, slashlib.org.
 */
import { Injectable }               from "@angular/core";

// abstract class Message
export interface Message {
  // action property
  readonly action: string;
  // message property
  readonly message: string;
}

// abstract class AbstractMessage
abstract class AbstractMessage implements Message {
  // action property
  readonly action: string;
  // message
  private _message: string = "";
  // message property
  public get message(): string { return this._message; };
  // Constructor
  constructor( message: string ) { this._message = message; };
}

// class Error
class Error extends AbstractMessage {
  public static readonly ACTION: string = "Error";
  // action property
  public get action(): string { return Error.ACTION; };
  // Constructor
  constructor( message: string ) { super( message ); };
}

// class Warning
class Warning extends AbstractMessage {
  public static readonly ACTION: string = "Warning";
  // action property
  public get action(): string { return Warning.ACTION; };
  // Constructor
  constructor( message: string ) { super( message ); };
}

// class Info
class Info extends AbstractMessage {
  public static readonly ACTION: string = "Info";
  // action property
  public get action(): string { return Info.ACTION; };
  // Constructor
  constructor( message: string ) { super( message ); };
}

// class Debug
class Debug extends AbstractMessage {
  public static readonly ACTION: string = "Debug";
  // action property
  public get action(): string { return Debug.ACTION; };
  // Constructor
  constructor( message: string ) { super( message ); };
}

// class Log
export class Log {
  // TODO: private _messages: Message[] = [] as Message[];
  // constructor
  constructor( public service: SyncLoggingService ) { }
  // log a message to the messages
  private log( message: Message ) {
    // TODO: this._messages.push( message );
    this.service.notify( message );
  }
  // log error messages
  public error( message: string ) { this.log( new Error( message )); }
  // log warning messages
  public warning( message: string ) { this.log( new Warning( message )); }
  // log info messages
  public info( message: string ) { this.log( new Info( message )); }
  // log debug messages
  public debug( message: string ) { this.log( new Debug( message )); }
}

const NOTIFICATIONERROR = "SyncLogService::notify - error: ";
/**
 *  Synchronously logs messages and notifies consumers.
 */
@Injectable()
export class SyncLoggingService {
  // log
  private _log: Log;
  // consumers
  private _consumers: Map<string, ( action: string, message: string ) => void>;
  //
  public get log(): Log { return this._log; };
  /**
   *  Constructor
   */
  constructor() {
    this._log = new Log( this );
    this._consumers = new Map();
  }
  /**
   *  Connects a consumer to the services
   */
  public connect( name: string, callback: ( action: string, message: string ) => void ): void {
    this._consumers.set( name, callback );
  }
  /**
   *  Disconnects a consumer from the services
   */
  public disconnect( name: string ): boolean {
    return this._consumers.delete( name );
  }
  /**
   *  Returns true, if the named consumer is connected to the service.
   */
  public isConnected( name: string ): boolean {
    return this._consumers.has( name );
  }
  /**
   *  Notify the user via the snackbar.
   */
  public notify( message: Message ): void {
    this._consumers.forEach( function( value, key ) {
      try { value( message.action, message.message ); }
      catch( e ) { console.error( NOTIFICATIONERROR, e ); }
    });
  }
}
