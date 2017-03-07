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
import {FriendshipAcceptedEvent} from "../../../../events/chat/friendship/FriendshipAcceptedEvent";
import {FriendshipBlockedEvent} from "../../../../events/chat/friendship/FriendshipBlockedEvent";
import {FriendshipDeniedEvent} from "../../../../events/chat/friendship/FriendshipDeniedEvent";
import {FriendshipInvitationEvent} from "../../../../events/chat/friendship/FriendshipInvitationEvent";
import {FriendshipRemovedEvent} from "../../../../events/chat/friendship/FriendshipRemovedEvent";
import {FriendshipRenameEvent} from "../../../../events/chat/friendship/FriendshipRenameEvent";
import {FriendshipEvent} from "../../../../events/chat/FriendshipEvent";
import {ObjectUtils} from "../../../../../lib/ObjectUtils";
import {DateProvider} from "../../../../../lib/DateProvider";

export class FriendshipEventDecoder extends SoapEventDecoder {
  private mDateProvider: DateProvider;

  constructor(dateProvider: DateProvider) {
    super(FriendshipEvent.ID);
    this.mDateProvider = dateProvider;
  }

  public decodeEvent(
    eventObj: {
      statusType: number,
      buddyAddress: string,
      buddyNickname: string,
      buddyGroup: string,
      from: string
    },
    originEvent?: ChatEvent
  ): ChatEvent {
    if (ObjectUtils.isEmpty(eventObj) && typeof originEvent !== "undefined") {
      return originEvent;
    }

    let statusType: number = eventObj["statusType"];

    switch (statusType) {
      case FriendshipInvitationEvent.TYPE:
        return new FriendshipInvitationEvent(
          eventObj["buddyAddress"],
          eventObj["buddyNickname"],
          (typeof eventObj["buddyGroup"] !== "undefined") ? eventObj["buddyGroup"] : "",
          this.mDateProvider.getNow()
        );
      case FriendshipAcceptedEvent.TYPE:
        return new FriendshipAcceptedEvent(eventObj["from"], this.mDateProvider.getNow());
      case FriendshipDeniedEvent.TYPE:
        return new FriendshipDeniedEvent(eventObj["from"], this.mDateProvider.getNow());
      case FriendshipBlockedEvent.TYPE:
        return new FriendshipBlockedEvent(eventObj["from"], this.mDateProvider.getNow());
      case FriendshipRemovedEvent.TYPE:
        return new FriendshipRemovedEvent(eventObj["buddyAddress"], this.mDateProvider.getNow());
      case FriendshipRenameEvent.TYPE:
        return new FriendshipRenameEvent(
          eventObj["buddyAddress"],
          eventObj["buddyNickname"],
          (typeof eventObj["buddyGroup"] !== "undefined") ? eventObj["buddyGroup"] : "",
          this.mDateProvider.getNow()
        );
      default:
        throw new Error("Unable to decode Friendship type '" + statusType + "'.");
    }
  }

}