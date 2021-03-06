/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */
var _data = {},
    utils = require('./utils'),
    _self;

_self = {
    setInfo: function (info) {
        if (!info) {
            _data = {};
        }
        _data = info;
    },

    getInfo: function () {
        return utils.copy(_data);
    },

    isPreferenceReadOnly: function (key) {
        return (_data.preferences &&
                _data.preferences[key] &&
                _data.preferences[key].readonly &&
                _data.preferences[key].readonly === true);
    },

    validateVersion: function (configValidationObject) {
        // TODO: WTF figure this out, platform is empty object when require at require time
        // could be that the new platform _getBuilder code dies when called, before it is initialized
        var spec = require('./platform').current();

        if (typeof spec.config.validateVersion === "function" && configValidationObject) {
            return spec.config.validateVersion(configValidationObject);
        }

        return true;
    },

    saveInfo: function (configValidationObject) {
        var spec = require('./platform').current(),
            info = null;
        if (typeof spec.config.extractInfo === "function") {
            info = spec.config.extractInfo(configValidationObject);
        }

        if (info) {
            _self.setInfo(info);
        }
    }

};

module.exports = _self;
