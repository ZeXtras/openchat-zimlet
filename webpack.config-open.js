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

var webpack = require("webpack");
var BannerPlugin = webpack.BannerPlugin;
var path = require("path");

var license = [];
license.push("Copyright (C) " + ((new Date()).getFullYear()) + " ZeXtras S.r.l.");
license.push("");
license.push("This program is free software; you can redistribute it and/or");
license.push("modify it under the terms of the GNU General Public License");
license.push("as published by the Free Software Foundation, version 2 of");
license.push("the License.");
license.push("");
license.push("This program is distributed in the hope that it will be useful,");
license.push("but WITHOUT ANY WARRANTY; without even the implied warranty of");
license.push("MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the");
license.push("GNU General Public License for more details.");
license.push("");
license.push("You should have received a copy of the GNU General Public License.");
license.push("If not, see <http://www.gnu.org/licenses/>.");

var cow = "function Cow() {}\nCow.prototype.moo = function() { console.log('Moo!'); };";

module.exports = {
  entry: {
    com_zextras_chat_open_bundle: "./src/OpenChatZimlet.ts"
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: '[name].js'
  },
  resolve: {
    extensions: [".js", ".json", ".ts"]
  },
  devtool: "source-map", // TODO: Remove source maps from production?
  module: {
    rules: [
      {
        test: /\.json$/,
        exclude: [],
        loader: "json-loader"
      },
      {
        test: /\.ts$/,
        exclude: [
          path.resolve(__dirname, "src/zimbra")
        ],
        loader: "awesome-typescript-loader"
      }
    ]
  },
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    // Banner required to avoid contamination caused by the YUI compressor.
    new BannerPlugin(
      {
        banner: cow,
        raw: true,
        entryOnly: false
      }
    ),
    new BannerPlugin(
      {
        banner: license.join('\n'),
        raw: false,
        entryOnly: false
      }
    )
  ]
};
