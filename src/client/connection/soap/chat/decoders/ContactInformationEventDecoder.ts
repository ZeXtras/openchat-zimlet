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

import {SoapEventDecoder} from "./SoapEventDecoder";
import {ChatEvent} from "../../../../events/ChatEvent";
import {ContactInformationEvent} from "../../../../events/chat/ContactInformationEvent";
import {BuddyStatus} from "../../../../BuddyStatus";
import {DateProvider} from "../../../../../lib/DateProvider";

export class ContactInformationEventDecoder extends SoapEventDecoder {

  private mDateProvider: DateProvider;

  constructor(dateProvider: DateProvider) {
    super(ContactInformationEvent.ID);
    this.mDateProvider = dateProvider;
  }

  public decodeEvent(
    eventObj: {
      from: string,
      timestampSent: number,
      statusType: number,
      message: string,
      id: number,
      isGroupChat: boolean
    },
    originEvent?: ChatEvent
  ): ChatEvent {
    return new ContactInformationEvent(
      eventObj["from"],
      this.mDateProvider.getDate(eventObj["timestampSent"]),
      this.mDateProvider.getNow(),
      new BuddyStatus(
        BuddyStatus.GetTypeFromNumber(eventObj["statusType"]),
        eventObj["message"],
        eventObj["id"]
      ),
      eventObj["isGroupChat"]
    );
  }

}