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

/**
 * Contains the data used for the DnD event.
 * The transfer type is used to define what object can be handled by
 * the drop target.
 */
export class TransferType {

  private mClassName: string;
  private mConstructorFcn: new (...args: any[]) => any;

  constructor(className: string, constructorFcn: new (...args: any[]) => any) {
    this.mClassName = className;
    this.mConstructorFcn = constructorFcn;

  }

  public getClassName(): string {
    return this.mClassName;
  }

  public getConstructor(): new (...args: any[]) => any {
    return this.mConstructorFcn;
  }

}
