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

import {Store} from "redux";
import {RoomWindowManager} from "../../dwt/windows/RoomWindowManager";
import {RoomWindowMenuButton} from "../../dwt/windows/RoomWindowMenuButton";
import {IChatPlugin} from "../../lib/plugin/ChatPlugin";
import {ChatPluginManager} from "../../lib/plugin/ChatPluginManager";
import {IOpenChatState} from "../../redux/IOpenChatState";
import {RoomWindowSendHistoryMenuItemPlugin} from "./RoomWindowSendHistoryMenuItemPlugin";

export class RoomWindowManagerSendMailPlugin implements IChatPlugin {

  private mStore: Store<IOpenChatState>;

  constructor(
    store: Store<IOpenChatState>,
  ) {
    this.mStore = store;
  }

  public trigger(roomWindowManager: RoomWindowManager, roomWindowPluginManager: ChatPluginManager): void {
    roomWindowPluginManager.registerPlugin(
      RoomWindowMenuButton.AddMenuItemPlugin,
      new RoomWindowSendHistoryMenuItemPlugin(this.mStore),
    );
  }
}
