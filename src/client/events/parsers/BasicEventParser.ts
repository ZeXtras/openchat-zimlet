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

import {BasicEvent} from "../BasicEvent";
import {IBasicEvent} from "../IBasicEvent";
import {IConnectionEventParser} from "./IConnectionEventParser";

export class BasicEventParser implements IConnectionEventParser {

  public encodeEvent(connectionEvent: IBasicEvent): {} {
    return {
      code: connectionEvent.getCode(),
      data: connectionEvent.getData(),
    };
  }

  public decodeEvent(originEvent: IBasicEvent, object: {code?: number}): IBasicEvent {
    const code = (typeof object.code !== "undefined") ? object.code : -1;
    const event = new BasicEvent(code, false);
    event.setData(object);
    return event;
  }

}
