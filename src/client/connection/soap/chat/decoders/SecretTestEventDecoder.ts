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

import {OpenChatEventCode} from "../../../../events/chat/OpenChatEventCode";
import {SecretTestEvent} from "../../../../events/chat/SecretTestEvent";
import {IChatEvent} from "../../../../events/IChatEvent";
import {ISoapEventObject} from "../SoapEventParser";
import {SoapEventDecoder} from "./SoapEventDecoder";

export class SecretTestEventDecoder extends SoapEventDecoder<SecretTestEvent> {

  constructor() {
    super(OpenChatEventCode.SECRET_TEST);
  }

  public decodeEvent(
    eventObj: ISecretTestEventObj,
    originEvent?: IChatEvent,
  ): SecretTestEvent {
    return new SecretTestEvent(
      eventObj.to,
      new Date(eventObj.timestampSent),
    );
  }
}

export interface ISecretTestEventObj extends ISoapEventObject {
  from: string;
  to: string;
  timestampSent: number;
}
