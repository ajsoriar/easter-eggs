# easter-eggs [![Build Status](https://travis-ci.org/ajsoriar/easter-eggs.svg?branch=master)](https://travis-ci.org/ajsoriar/easter-eggs)

[![npm version](https://badge.fury.io/js/easter-eggs.svg)](https://badge.fury.io/js/easter-eggs)

Small and simple utility library to draw lines just using javascript and HTML Document Object Model.

![easter-eggs demo image](./demo/easter-eggs.gif?raw=true "easter-eggs demo image")

## Quick start.

#### 1 Download and Install easter-eggs:

 - yarn: **yarn add easter-eggs**
 - NPM: **npm install easter-eggs**
 - github: **https://github.com/ajsoriar/easter-eggs**


#### 2 Include dependences: 
2.1 easter-eggs.js or easter-eggs.min.js are under **dist** folder.

2.2 Include easter-eggs.js or easter-eggs.min.js, e.g.
```javascript
<script src="../dist/easter-eggs.min.js"></script>
```

#### 3 Use it. 
In your javascript code this way:
```javascript
EasterEggs.addSequence(null,[51,50,49],function(){
    console.log("MATCH!!! 3,2,1");
})
```

#### 4 License

easter-eggs.js is [MIT licensed](./LICENSE).