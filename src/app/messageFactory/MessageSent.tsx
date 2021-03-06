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

import {ComponentChild, h, render} from "preact";

import "./MessageSent.scss";

import {AMessage, IAMessageProps, IAMessageState} from "./AMessage";

interface IMessageSentProps extends IAMessageProps {}

interface IMessageSentState extends IAMessageState {}

export class MessageSent extends AMessage<IMessageSentProps, IMessageSentState> {

  public render(): ComponentChild {
    return (
      <div className="MessageSent-align-wrapper">
        <div className="MessageSent">
          <div className="MessageSent-content">
            {this.props.children}
          </div>
          <div className="MessageSent-info-bottom">
            {this.getDateEl()}
            {this.getStatusIconEl()}
          </div>
        </div>
      </div>
    );
  }

}
