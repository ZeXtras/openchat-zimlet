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

import {IBuddy} from "../../client/IBuddy";
import {IBuddyStatus} from "../../client/IBuddyStatus";
import {MessageReceived} from "../../client/MessageReceived";
import {IDateProvider} from "../../lib/IDateProvider";
import {LearningClipUtils} from "../../lib/LearningClipUtils";
import {DwtComposite} from "../../zimbra/ajax/dwt/widgets/DwtComposite";
import {AjxStringUtil} from "../../zimbra/ajax/util/AjxStringUtil";
import {Conversation} from "./Conversation";
import {IMessageCreateHtmlData, Message} from "./Message";

import "./MessageStatus.scss";

export class MessageStatus extends Message {

  private mDate: Date;
  private mBuddy: IBuddy;
  private mStatus: IBuddyStatus;

  constructor(parent: Conversation, buddy: IBuddy, status: IBuddyStatus, dateProvider: IDateProvider) {
    super(
      parent,
      new MessageReceived("", buddy, dateProvider.getNow(), status.getMessage()),
      dateProvider,
      "com_zextras_chat_open.Widgets#MessageStatus",
    );
    this.mDate = dateProvider.getNow();
    this.mBuddy = buddy;
    this.mStatus = status;
    this._createHtml();
    this.getHtmlElement().setAttribute("status", AjxStringUtil.htmlEncode(status.getMessageLabel()));
  }

  protected _createHtml(data: IMessageCreateHtmlData = {}): void {
    const statusWidth: number = LearningClipUtils.getStringWidth(
      this.mMessage.getMessage(),
      "ZxChat_MessageStatusContent",
    );
    const shortNickname: string = LearningClipUtils.clip(
      this.mBuddy.getNickname(),
      198 - statusWidth,
      "ZxChat_MessageStatusSender",
    );
    data = {
      ...data,
      content: this.mMessage.getMessage(),
      id: this._htmlElId,
      sender: shortNickname,
    };
    DwtComposite.prototype._createHtmlFromTemplate.call(this, this.TEMPLATE, data);
    this.senderEl = document.getElementById(data.id + "_sender");
    this.contentEl = document.getElementById(data.id + "_content");
  }
}
