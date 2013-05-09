midimapjs
=========

midi mapping tool for your javascript applications.

the following shim is required before usage:
```html
<script src='http://cwilso.github.com/WebMIDIAPIShim/WebMIDIAPI.js'>
```

basic usage is as follows:
```javascript
m = new midimap();
```
you may assign values to be mapped via midi to a unique id by using:  
```javascript
m.add("xxxx"); // where xxxx is any valid value (string or numerical)
// after the add function is called, wiggle the 
// physical midi control to map it to that id
```
you can get the value for any assigned value by using:
```javascript
m.get("xxxx"); // returns the percentage of the control between 0 - 1, not 0 - 127
```
you may also preload configured mappings by doing the following:
```javascript
var korgNanoKontrol = {
  2:{id:"slider-1"},        // id 2 is the first slider, I called it "slider-1"
  14:{id:"knob-1",value:0}, // value can be defaulted between 0 and 1, or excluded.
};
m.map(korgNanoKontrol);
```
to view the current mappings object (useful for saving the mappings) use:
```javascript
m.mappings();
```
to reset all mappings use:
```javascript
m.reset();
```
