/* wtfpl */
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
