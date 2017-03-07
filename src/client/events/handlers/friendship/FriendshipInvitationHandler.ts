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

import {FriendshipInvitationEvent} from "../../chat/friendship/FriendshipInvitationEvent";
import {ChatClient} from "../../../ChatClient";
import {Buddy} from "../../../Buddy";
import {BuddyStatusType} from "../../../BuddyStatusType";
import {BuddyStatus} from "../../../BuddyStatus";
import {ChatEventHandler} from "../ChatEventHandler";
import {ChatEvent} from "../../ChatEvent";
import {StringUtils} from "../../../../lib/StringUtils";
import {ChatZimletBase} from "../../../../ChatZimletBase";

export class FriendshipInvitationHandler implements ChatEventHandler {

  private mZimletContext: ChatZimletBase;

  constructor(zimletContext: ChatZimletBase) {
    this.mZimletContext = zimletContext;
  }

  public getEventCode(): number {
    return FriendshipInvitationEvent.TYPE;
  }

  public handleEvent(chatEvent: ChatEvent, client: ChatClient): boolean {
    let friendshipEvent = <FriendshipInvitationEvent> chatEvent,
      buddyList = client.getBuddyList(),
      buddy = buddyList.getBuddyById(friendshipEvent.getBuddyId());
    if (buddy == null) {
      buddy = new Buddy(friendshipEvent.getBuddyId(), friendshipEvent.getNickname());
      let defaultGroup = buddyList.getDefaultGroup();
      buddy.addGroup(defaultGroup);
      defaultGroup.addBuddy(buddy);
    }
    buddy.setStatus(new BuddyStatus(BuddyStatusType.NEED_RESPONSE));
    client.friendshipInvitationReceived(buddy);
    let title: string = StringUtils.getMessage("accept_friends_title");
    let message: string = StringUtils.getMessage("accept_friends_text", [buddy.getNickname()]);
    message = message.replace(/<b>/g, "");
    message = message.replace(/<\/b>/g, "");
    message = message.replace(/<br>/g, " ");
    this.mZimletContext.displayNotification(title, message, this.mZimletContext.getNotificationImage(), true);
    this.mZimletContext.displayNotification(title, message, this.mZimletContext.getNotificationImage(), false);
    return true;
  }
}