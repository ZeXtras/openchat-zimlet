/*
 * Copyright (C) 2017 ZeXtras S.r.l.
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation, version 2 of
 * the License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License.
 * If not, see <http://www.gnu.org/licenses/>.
 */

import {ClientEvent} from "./ClientEvent";
import {IChatEvent} from "./IChatEvent";

/**
 * Container class for a Event generated by/for the ZeXtras Chat Server
 * @class
 */
export class ChatEvent extends ClientEvent implements IChatEvent {
  private mSender: string = void 0;
  private mSenderResource: string = void 0;
  private mDestination: string = void 0;
  private mDestinationResource: string = void 0;

  constructor(code: number, creationDate: Date, hasResponse: boolean) {
    super(code, creationDate, hasResponse);
  }

  /**
   * Set the sender address of the event.
   * It can be in the format "user@example.com" or "user@example.com/resource"
   * @param address
   * @return {ChatEvent}
   */
  public setSender(address: string): ChatEvent {
    if (typeof address !== "undefined" && address !== null) {
      const parts: string[] = address.split("/");
      this.mSender = parts[0];
      if (parts.length > 1) {
        this.mSenderResource = parts[1];
      } else {
        this.mSenderResource = parts[2];
      }
    }
    return this;
  }

  /**
   * Get the sender of the event
   * @return {string}
   */
  public getSender(): string {
    return this.mSender;
  }

  /**
   * Get the resource of the sender (if defined)
   * @return {string}
   */
  public getSenderResource(): string {
    return this.mSenderResource;
  }

  /**
   * Get the sender of the event, including his resource
   * @return {string}
   */
  public getSenderWithResource(): string {
    if (typeof this.mSender === "undefined") { return ""; }
    if (typeof this.mSenderResource === "undefined") {
      return this.mSender;
    } else {
      return this.mSender + "/" + this.mSenderResource;
    }
  }

  /**
   * Set the destination address of the event.
   * It can be in the format "user@example.com" or "user@example.com/resource"
   * @param address
   * @return {ChatEvent}
   */
  public setDestination(address: string): ChatEvent {
    if (typeof address !== "undefined") {
      if (/\//.test(address)) {
        const parts: string[] = address.split("/");
        this.mDestination = parts[0];
        if (parts.length > 1) {
          this.mDestinationResource = parts[1];
        } else {
          this.mDestinationResource = parts[2];
        }
      } else {
        this.mDestination = address;
      }
    }
    return this;
  }

  /**
   * Get the destination of the event
   * @return {string}
   */
  public getDestination(): string {
    return this.mDestination;
  }

  /**
   * Get the resource of the destination (if defined)
   * @return {string}
   */
  public getDestinationResource(): string {
    return this.mDestinationResource;
  }

  /**
   * Get the destination of the event, including his resource
   * @return {string}
   */
  public getDestinationWithResource(): string {
    if (typeof this.mDestination === "undefined") { return ""; }
    if (typeof this.mDestinationResource === "undefined") {
      return this.mDestination;
    } else {
      return this.mDestination + "/" + this.mDestinationResource;
    }
  }
}
