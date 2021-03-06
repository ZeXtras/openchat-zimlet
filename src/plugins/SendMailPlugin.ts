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

import {BuddyTreeItemActionMenuFactory} from "../dwt/widgets/BuddyTreeItemActionMenuFactory";
import {RoomWindowManager} from "../dwt/windows/RoomWindowManager";
import {ChatPluginManager} from "../lib/plugin/ChatPluginManager";
import {IOpenChatState} from "../redux/IOpenChatState";
import {MainWindowCreateNewMailMenuItemPlugin} from "./sendMail/MainWindowCreateNewMailMenuItemPlugin";
import {RoomWindowManagerSendMailPlugin} from "./sendMail/RoomWindowManagerSendMailPlugin";

/**
 * @deprecated
 */
export class SendMailPlugin {
  /**
   * @deprecated
   */
  public static install(
    mainWindowPluginManager: ChatPluginManager,
    roomWindowManagerPluginManager: ChatPluginManager,
    store?: Store<IOpenChatState>,
  ): void {
    mainWindowPluginManager.registerPlugin(
      BuddyTreeItemActionMenuFactory.AddMenuItemPlugin,
      new MainWindowCreateNewMailMenuItemPlugin(),
    );
    roomWindowManagerPluginManager.registerPlugin(
      RoomWindowManager.CreateRoomWindowPluginManager,
      new RoomWindowManagerSendMailPlugin(store),
    );
  }

}
