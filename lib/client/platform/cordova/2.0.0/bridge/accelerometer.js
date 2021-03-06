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
var event = require('../../../../event'),
    _success,
    _error,
    _current = {x: 0, y: 0, z: 0, timestamp: (new Date()).getTime()},
    _interval;

event.on("AccelerometerInfoChangedEvent", function (accelerometerInfo) {
    _current.x = accelerometerInfo.accelerationIncludingGravity.x;
    _current.y = accelerometerInfo.accelerationIncludingGravity.y;
    _current.z = accelerometerInfo.accelerationIncludingGravity.z;
    _current.timestamp = (new Date()).getTime();
});

module.exports = {
    start: function (success, error) {
        _success = success;
        _error = error;
        // Possible HACK? update the timestamp of the last data to something current
        _interval = window.setInterval(function () {
            _current.timestamp = (new Date()).getTime();
            _success(_current);
        }, 50);
    },

    stop: function () {
        _success = null;
        _error = null;
        window.clearInterval(_interval);
    }
};
