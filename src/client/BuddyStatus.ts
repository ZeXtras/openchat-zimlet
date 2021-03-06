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

import {StringUtils} from "../lib/StringUtils";
import {ZimbraUtils} from "../lib/ZimbraUtils";
import {BuddyStatusType} from "./BuddyStatusType";
import {IBuddyStatus} from "./IBuddyStatus";

export class BuddyStatus implements IBuddyStatus {

  /**
   * Get the CSS style associated to a status type.
   * @return {string} CSS Style
   */
  public static getCSS(type: BuddyStatusType): string {
    if (ZimbraUtils.isUniversalUI()) {
      return BuddyStatus.getCssForUniversalUI(type);
    } else {
      return BuddyStatus.getLegacyCss(type);
    }
  }

  public static GetTypeFromNumber(id: number): BuddyStatusType {
    switch (id) {
      case 0: return BuddyStatusType.OFFLINE;
      case 1: return BuddyStatusType.ONLINE;
      case 2: return BuddyStatusType.BUSY;
      case 3: return BuddyStatusType.AWAY;
      case 4: return BuddyStatusType.INVISIBLE;
      case 5: return BuddyStatusType.NEED_RESPONSE;
      case 6: return BuddyStatusType.INVITED;
      case 7: return BuddyStatusType.UNREACHABLE;
      case 8: return BuddyStatusType.UNSUBSCRIBED;
      default: return BuddyStatusType.ONLINE;
    }
  }

  public static GetNumberFromType(type: BuddyStatusType): number {
    switch (type) {
      case BuddyStatusType.OFFLINE: return 0;
      case BuddyStatusType.ONLINE: return 1;
      case BuddyStatusType.BUSY: return 2;
      case BuddyStatusType.AWAY: return 3;
      case BuddyStatusType.INVISIBLE: return 4;
      case BuddyStatusType.NEED_RESPONSE: return 5;
      case BuddyStatusType.INVITED: return 6;
      case BuddyStatusType.UNREACHABLE: return 7;
      case BuddyStatusType.UNSUBSCRIBED: return 8;
      default: return BuddyStatusType.ONLINE;
    }
  }

  private static sOrderMapStatus: BuddyStatusType[] = [
    BuddyStatusType.NEED_RESPONSE,
    BuddyStatusType.ONLINE,
    BuddyStatusType.AWAY,
    BuddyStatusType.BUSY,
    BuddyStatusType.INVITED,
    BuddyStatusType.OFFLINE,
    BuddyStatusType.INVISIBLE,
    BuddyStatusType.UNREACHABLE,
    BuddyStatusType.UNSUBSCRIBED,
  ];

  private static getCssForUniversalUI(type: BuddyStatusType): string {
    switch (type) {
      case BuddyStatusType.ONLINE:
        return "_ImSmallAvailable";
      case BuddyStatusType.BUSY:
        return "_ImSmallDnD";
      case BuddyStatusType.AWAY:
        return "_ImSmallAway";
      case BuddyStatusType.NEED_RESPONSE:
      case BuddyStatusType.INVITED:
        return "_ImSmallUnavailable"; // TODO: We need an invited|need_response icon
      case BuddyStatusType.INVISIBLE:
        return "_ImSmallInvisble"; // Todo: There is a typo, notify to synacor
      case BuddyStatusType.UNREACHABLE:
      case BuddyStatusType.OFFLINE:
      case BuddyStatusType.UNSUBSCRIBED:
      default:
        return "_ImSmallInvisble"; // _ImSmallUnavailable
    }
  }

  private static getLegacyCss(type: BuddyStatusType): string {
    switch (type) {
      case BuddyStatusType.ONLINE:
        return "ZxChat_available";
      case BuddyStatusType.BUSY:
        return "ZxChat_busy";
      case BuddyStatusType.AWAY:
        return "ZxChat_away";
      case BuddyStatusType.NEED_RESPONSE:
        return "ZxChat_pending-request";
      case BuddyStatusType.INVITED:
        return "ZxChat_pending";
      case BuddyStatusType.UNREACHABLE:
        return "ZxChat_deleted";
      case BuddyStatusType.OFFLINE:
        return "ZxChat_offline";
      case BuddyStatusType.INVISIBLE:
        return "ZxChat_offline";
      case BuddyStatusType.UNSUBSCRIBED:
        return "ZxChat_offline";
      default:
        return "";
    }
  }

  private mType: BuddyStatusType;
  private mMessage: string;
  private mId: number;

  /**
   * Create new status object.
   * @param {BuddyStatusType} statusType
   * @param {string} statusMessage
   * @param {number} id
   * @constructor
   */
  constructor(statusType: BuddyStatusType = BuddyStatusType.OFFLINE,
              statusMessage: string = "",
              id: number = 0) {
    this.mType = statusType;
    this.mMessage = statusMessage;
    this.mId = id;
  }

  /**
   * Compare the types between the status instance and another status.
   * @param {BuddyStatus} other
   * @return {boolean}
   */
  public sameType(other: IBuddyStatus): boolean {
    return this.mType === other.getType();
  }

  /**
   * Stringify the status object into a human-readable format
   * @return {string}
   */
  public toString(): string {
    return "id=" + this.mId + ", type=" + this.mType + ", message=" + this.mMessage;
  }

  /**
   * Compare the equality between the status instance and another status.
   * @param {BuddyStatus} other
   * @return {boolean}
   */
  public equals(other: IBuddyStatus): boolean {
    return this.mId === other.getId() &&
      this.mType === other.getType() &&
      this.mMessage === other.getMessage();
  }

  /**
   * Compare the status priority between another status.
   * Lowest priority is considered more important.
   * @param {BuddyStatus} other
   * @return {boolean}
   */
  public isMoreAvailableThan(other: IBuddyStatus): boolean {
    return this.getStatusPriority() < other.getStatusPriority();
  }

  /**
   * Get the priority of the status.
   * @return {number}
   */
  public getStatusPriority(): number {
    switch (this.mType) {
      case BuddyStatusType.ONLINE:
        return 0;
      case BuddyStatusType.BUSY:
        return 1;
      case BuddyStatusType.AWAY:
        return 2;
      case BuddyStatusType.NEED_RESPONSE:
        return 3;
      case BuddyStatusType.INVITED:
        return 4;
      case BuddyStatusType.UNREACHABLE:
        return 5;
      case BuddyStatusType.OFFLINE:
        return 6;
      case BuddyStatusType.INVISIBLE:
        return 7;
      case BuddyStatusType.UNSUBSCRIBED:
        return 8;
      default:
        return 10;
    }
  }

  /**
   * Get status message label, this tag is used to be translated.
   * @param {boolean=false} returnReal if true return the real message, not the 'politically correct' version.
   * @return {string}
   */
  public getMessageLabel(returnReal: boolean = false): string {
    switch (this.mType) {
      case BuddyStatusType.ONLINE:
        return "st_available";
      case BuddyStatusType.BUSY:
        return "st_busy";
      case BuddyStatusType.AWAY:
        return "st_away";
      case BuddyStatusType.NEED_RESPONSE:
        return "pending";
      case BuddyStatusType.INVITED:
        return "waiting_for_response";
      case BuddyStatusType.UNREACHABLE:
        return "st_unreachable";
      case BuddyStatusType.OFFLINE:
        return "st_offline";
      case BuddyStatusType.INVISIBLE:
        if (returnReal) {
          return "st_invisible";
        } else {
          return "st_offline";
        }
      case BuddyStatusType.UNSUBSCRIBED:
        return "st_offline";
      default:
        return this.mMessage;
    }
  }

  /**
   * Get status message.
   * @param {boolean=} returnReal if true return the real message, not the 'politically correct' version.
   * @return {string}
   */
  public getMessage(returnReal: boolean = false): string {
    return StringUtils.getMessage(this.getMessageLabel(returnReal));
  }

  /**
   * Get if the user which have this status can chat. (Based on status type)
   * @return {boolean}
   */
  public canChat(): boolean {
    switch (this.mType) {
      case BuddyStatusType.ONLINE:
      case BuddyStatusType.BUSY:
      case BuddyStatusType.AWAY:
      case BuddyStatusType.OFFLINE:
      case BuddyStatusType.INVISIBLE:
        return true;
      default:
        return false;
    }
  }

  /**
   * Get the status type
   * @return {BuddyStatusType}
   */
  public getType(): BuddyStatusType {
    return this.mType;
  }

  /**
   * Return the status ID.
   * @return {number}
   */
  public getId(): number {
    return this.mId;
  }

  /**
   * Get if the status represent an "Online" status
   * @return {boolean}
   */
  public isOnline(): boolean {
    switch (this.mType) {
      case BuddyStatusType.ONLINE:
      case BuddyStatusType.BUSY:
      case BuddyStatusType.AWAY:
        return true;
      default:
        return false;
    }
  }

  /**
   * Get if the status represent an "Offline" status
   * @return {boolean}
   */
  public isOffline(): boolean {
    switch (this.mType) {
      case BuddyStatusType.UNREACHABLE:
      case BuddyStatusType.OFFLINE:
      case BuddyStatusType.INVISIBLE:
      case BuddyStatusType.UNSUBSCRIBED:
        return true;
      default:
        return false;
    }
  }

  /**
   * Get if the status represent an "Available" status
   * @return {boolean}
   */
  public isAvailable(): boolean {
    return this.mType === BuddyStatusType.ONLINE;
  }

  /**
   * Get if the status represent an "Available" status
   * @return {boolean}
   */
  public isBusy(): boolean {
    return this.mType === BuddyStatusType.BUSY;
  }

  /**
   * Get if the status represent an "Available" status
   * @return {boolean}
   */
  public isAway(): boolean {
    return this.mType === BuddyStatusType.AWAY;
  }

  /**
   * Get if the status represent an "Invited" status
   * @return {boolean}
   */
  public isInvited(): boolean {
    return this.mType === BuddyStatusType.INVITED;
  }

  /**
   * GGet if the status represent an "Is waiting for friendship" status
   * @return {boolean}
   */
  public isWaitingForResponse(): boolean {
    return this.mType === BuddyStatusType.NEED_RESPONSE;
  }

}
