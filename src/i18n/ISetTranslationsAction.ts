/*
 * **** BEGIN LICENSE BLOCK *****
 * Copyright (C) 2011-2018 ZeXtras
 *
 * The contents of this file are subject to the ZeXtras EULA;
 * you may not use this file except in compliance with the EULA.
 * You may obtain a copy of the EULA at
 * http://www.zextras.com/zextras-eula.html
 * **** END LICENSE BLOCK *****
 */

import {Action} from "redux";

export interface ISetTranslationsAction extends Action {
  type: "SET_TRANSLATION";
  translations: {[label: string]: string};
}
