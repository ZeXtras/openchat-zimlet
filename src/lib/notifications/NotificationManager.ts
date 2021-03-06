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

import {AjxDispatcher} from "../../zimbra/ajax/boot/AjxDispatcher";
import {ZmAppCtxt} from "../../zimbra/zimbraMail/core/ZmAppCtxt";
import {Callback} from "../callbacks/Callback";
import {CallbackManager} from "../callbacks/CallbackManager";
import {TimedCallbackFactory} from "../callbacks/TimedCallbackFactory";
import {DesktopNotification} from "./DesktopNotification";
import {DesktopNotificationFactory} from "./DesktopNotificationFactory";
import {INotificationTask} from "./NotificationTask";
import {NotificationTaskType} from "./NotificationTaskType";
import {SoundNotification} from "./SoundNotification";
import {TitlebarNotification} from "./TitlebarNotification";
import {ToastNotification} from "./ToastNotification";

export class NotificationManager {
  private static TIMEOUT: number = 10000;

  private defaultTitle: string;
  private defaultIcon: string;
  private context: ZmAppCtxt;
  private onPermissionGrantedCbkMgr: CallbackManager = new CallbackManager();
  private notifications: {[id: string]: INotificationTask} = {};
  private enableDesktop: boolean = true;
  private enableSound: boolean = true;
  private enableTitlebar: boolean = true;
  private mTimedCallbackFactory: TimedCallbackFactory;

  constructor(defaultTitle: string,
              defaultIcon: string,
              timedCallbackFactory: TimedCallbackFactory,
              context?: ZmAppCtxt,
  ) {
    if (typeof AjxDispatcher !== "undefined") {
      AjxDispatcher.require(["Alert"], false);
    }
    this.defaultTitle = defaultTitle;
    this.defaultIcon = defaultIcon;
    this.mTimedCallbackFactory = timedCallbackFactory;
    this.context = context;
  }

  public setDesktopEnabled(enable: boolean): void {
    this.enableDesktop = enable;
  }

  public setSoundEnabled(enable: boolean): void {
    this.enableSound = enable;
  }

  public setTitlebarEnabled(enable: boolean): void {
    this.enableTitlebar = enable;
  }

  /**
   * Show a notification.
   * @param {string} message
   * @param {string=} title
   * @param {string=} icon
   * @param {boolean=} toast Display as toast notification
   * @deprecated
   */
  public notify(message: string,
                title: string = this.defaultTitle,
                icon: string = this.defaultIcon,
                toast: boolean = false) {
    if (toast) {
      this.pushNotification(new ToastNotification(message));
    } else {
      if (this.enableDesktop) {
        this.pushNotification(new DesktopNotification(title, message, icon, this.mTimedCallbackFactory));
      }
      if (this.enableSound) {
        this.pushNotification(new SoundNotification());
      }
      if (this.enableTitlebar) {
        this.pushNotification(new TitlebarNotification(title));
      }
    }
  }

  /**
   * Handle a notification according to the user settings.
   * @param {INotificationTask} task The task to handle.
   */
  public pushNotification(task: INotificationTask): void {
    task.setAppContext(this.context);
    this.notifications[task.getId()] = task;

    switch (task.getType()) {
      case NotificationTaskType.SOUND:
        if (this.enableSound) { task.start(); }
        break;
      case NotificationTaskType.DESKTOP:
        if (this.enableDesktop) {
          if (DesktopNotificationFactory.getPermission() === DesktopNotificationFactory.GRANTED) {
            task.start();
          } else if (DesktopNotificationFactory.getPermission() === DesktopNotificationFactory.DENIED) {
            // Do nothing :(
          } else {
            this.requestNotificationPermission(task);
          }
        }
        break;
      case NotificationTaskType.TITLEBAR:
        if (this.enableTitlebar) { task.start(); }
        break;
      default:
        task.start();
    }
  }

  /**
   * Request the permission to show notifications.
   * @private
   */
  private requestNotificationPermission(task?: INotificationTask): void {
    DesktopNotificationFactory.requestPermission(new Callback(this, this.onPermissionRequested, task));
  }

  /**
   * Callback invoked when the permission is requested successfully.
   * @param permission
   */
  private onPermissionRequested(task: INotificationTask, permission: string): void {
    if (permission === DesktopNotificationFactory.GRANTED) {
      this.onPermissionGrantedCbkMgr.run();
    }
    if (typeof task !== "undefined") {
      this.pushNotification(task);
    }
  }
}
