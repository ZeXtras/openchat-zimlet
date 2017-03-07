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

import {ChatPlugin} from "../../lib/plugin/ChatPlugin";
import {RoomWindow} from "../../dwt/windows/RoomWindow";
import {DwtMenuItem} from "../../zimbra/ajax/dwt/widgets/DwtMenuItem";

export class RoomWindowHistoryEnablePlugin implements ChatPlugin {

  public static Name = "History Menu Item Enable";

  private mHistoryMenuItem: DwtMenuItem;

  constructor(historyMenuItem: DwtMenuItem) {
    this.mHistoryMenuItem = historyMenuItem;
  }

  public trigger(roomWindow: RoomWindow, enabled: boolean): void {
    this.mHistoryMenuItem.setVisible(enabled);
    this.mHistoryMenuItem.setEnabled(enabled);
  }
}