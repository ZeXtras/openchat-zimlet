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

import {Component, ComponentChild, h} from "preact";

import "./MessageReceived.scss";

import {AMessage, IAMessageProps, IAMessageState} from "./AMessage";

interface IMessageReceivedProps extends IAMessageProps {}

interface IMessageReceivedState extends IAMessageState {}

export class MessageReceived extends AMessage<IMessageReceivedProps, IMessageReceivedState> {

  public render(props: IMessageReceivedProps, state: IMessageReceivedState): ComponentChild {
    return (
      <div className="MessageReceived-align-wrapper">
        <div className="MessageReceived">
          <div className="MessageReceived-info">
            <div className="MessageReceived-info-sender">
              {props.username}
            </div>
            {this.getDateEl()}
          </div>
          <div className="MessageReceived-content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }

}
