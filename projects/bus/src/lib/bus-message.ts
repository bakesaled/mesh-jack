export interface BusMessage {
  /**
   * The originator of the message.
   */
  source: any;

  /**
   * The payload to pass along with the message.
   */
  data: any;
}
