export interface BusMessage {
  /**
   * The originator of the message.
   */
  source: any;

  /**
   * The classification of the message.
   */
  type: string;

  /**
   * The payload to pass along with the message.
   */
  data?: any;
}
