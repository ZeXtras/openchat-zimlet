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

import {ChatPluginManager} from "../../lib/plugin/ChatPluginManager";
import {ZimbraUtils} from "../../lib/ZimbraUtils";
import {Dwt} from "../../zimbra/ajax/dwt/core/Dwt";
import {DwtComposite} from "../../zimbra/ajax/dwt/widgets/DwtComposite";
import {DwtToolBarButton} from "../../zimbra/ajax/dwt/widgets/DwtToolBar";
import {RoomWindowType} from "./RoomWindow";
import {ZxPopupMenu} from "./WindowBase";

import "./RoomWindowMenuButton.scss";

export class RoomWindowMenuButton extends DwtToolBarButton {

  public static AddMenuItemPlugin = "Room Window Menu Button Add Menu Entry";
  public static _KEY_HIDE_OFFILINE = "hideOfflineBuddies";
  private mRoomWindow: RoomWindowType;
  private mMenu: ZxPopupMenu;

  constructor(
    roomWindow: RoomWindowType,
    parent: DwtComposite,
    roomWindowPluginManager: ChatPluginManager,
  ) {
    super({
      className: `ZxChat_Button ZxChat_TitleBar_Button${ZimbraUtils.isUniversalUI() ? "" : "_legacy"} ZToolbarButton`,
      parent: parent,
    });
    this.mRoomWindow = roomWindow;
    if (ZimbraUtils.isUniversalUI()) {
      this.setImage("MoreVertical,color=#b4d7eb");
    } else {
      this.setImage("ZxChat_icon-menu");
    }
    this.setDropDownImages("", "", "", "");
    this.dontStealFocus();

    this.mMenu = new ZxPopupMenu(this, "ActionMenu ZmPopupMenu_ZxChat_MainMenu");
    roomWindowPluginManager.triggerPlugins(RoomWindowMenuButton.AddMenuItemPlugin, this.mMenu);
    this.setMenu(this.mMenu, false, false, true);
    Dwt.delClass(this.getHtmlElement(), "ZHasDropDown");
    if (this.mMenu.getItemCount() === 0) {
      this.setVisible(false);
    }
  }

}
