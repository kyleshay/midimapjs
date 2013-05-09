/*
Copyright (C) 2013 kyle.shay

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
function midi() {
  // private vars
  var mappings = {};
  var lookup = {};
  var mapId = null;

  // private methods
  // must be called each time a mapping is assigned
  function regenLookupMap() {
    for (var map in mappings) {
      lookup[mappings[map].id] = mappings[map];
    }
  }

  navigator.requestMIDIAccess(function(midiAccess) {
    console.log("MIDI ready!");
    var m = midiAccess;

    // find and print all inputs
    var inputs = m.getInputs();
    console.log(inputs.length + " inputs:");
    for (var i = 0; i < inputs.length; i++)
      console.log(i + ": " + inputs[i]);

    // just attach the first input
    if (inputs.length > 0) {
      m.getInput(inputs[0]).addEventListener("message", function(e) {
        var control = e.data[1];

        if (mapId) {
          mappings[control] = {};
          mappings[control].id = mapId;

          regenLookupMap();
          mapId = null;
        }
        if (!mappings[control]) return;

        mappings[control].value = e.data[2]/127;
      });
      console.log("Hooked up first input.");
    }
  }, function() { console.log("error loading midi"); });

  // privileged methods
  this.add = function(id) {
    mapId = id;
  }
  this.get = function(id) {
  	if(!lookup[id]) return 0;
    return lookup[id].value || 0;
  }
  this.map = function(m) {
    mappings = m;
    regenLookupMap();
  }
  this.mappings = function() {
    return mappings;
  }
  this.reset = function() {
    mappings = {}, lookup = {};
  }
}
