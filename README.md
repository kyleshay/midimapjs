midimapjs
=========

midi mapping tool for your javascript applications.

the following shim is required before usage:
```html
<script src='http://cwilso.github.com/WebMIDIAPIShim/WebMIDIAPI.js'>
```

basic usage is as follows:
```javascript
m = new midi();
```
you may assign values to be mapped via midi to a unique id by using:
```javascript
m.add("xxxx"); // where xxxx is any valid value (string or numerical)
```
you can get the value for any assigned value by using:
```javascript
m.get("xxxx");
```
you may also preload configured mappings by doing the following:
```javascript
var korgNanoKontrol = {
  2:{id:"slider-1",value:0}, // id 2 is the first slider, I called it "slider-1"
  14:{id:"knob-1",value:0}, // id 14 is the first knob, I called it "knob-1"
};
m.map(korgNanoKontrol);
```
to view current mappings use:
```javascript
m.mappings();
```
to reset all mappings use:
```javascript
m.reset();
```
