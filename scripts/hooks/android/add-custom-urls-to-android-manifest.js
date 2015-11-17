#!/usr/bin/env node

//var _ = require('lodash');

var root = __dirname+'/../..';
var AndroidManifest = require('androidmanifest');
var manifestFilePath = root+'/platforms/android/AndroidManifest.xml'

var FILEPATH = 'platforms/android/AndroidManifest.xml';
//var xml = fs.readFileSync(FILEPATH, 'utf8');
var manifest = new AndroidManifest().readFile(FILEPATH);

console.log('manifest', manifest);
//console.log('manifest.subclass', manifest.subclass('.MainActivity'));
console.log('manifest.subclass.intent-filter', manifest.activity('MainActivity').find('intent-filter'));

var MainActivity = manifest.activity('MainActivity');

var intentFilter = manifest.$('<intent-filter>');

console.log('length', MainActivity.find('intent-filter > data[android\\:scheme=copay]').length);
if(MainActivity.find('intent-filter > data[android\\:scheme=copay]').length === 0){
  intentFilter.append('<data android:scheme="copay" />');
  intentFilter.append('<action android:name="android.intent.action.VIEW" />');
  intentFilter.append('<category android:name="android.intent.category.DEFAULT" />');
  intentFilter.append('<category android:name="android.intent.category.BROWSABLE" />');
  MainActivity.append(intentFilter);
}

var intentFilter = manifest.$('<intent-filter>');

if(MainActivity.find('intent-filter > data[android\\:scheme=bitcoin]').length === 0){
  intentFilter.append('<data android:scheme="bitcoin" />');
  intentFilter.append('<action android:name="android.intent.action.VIEW" />');
  intentFilter.append('<category android:name="android.intent.category.DEFAULT" />');
  intentFilter.append('<category android:name="android.intent.category.BROWSABLE" />');
  MainActivity.append(intentFilter);
}

var intentFilter = manifest.$('<intent-filter>');

if(MainActivity.find('intent-filter > data[android\\:scheme=bitauth]').length === 0){
  intentFilter.append('<data android:scheme="bitauth" />');
  intentFilter.append('<action android:name="android.intent.action.VIEW" />');
  intentFilter.append('<category android:name="android.intent.category.DEFAULT" />');
  intentFilter.append('<category android:name="android.intent.category.BROWSABLE" />');
  MainActivity.append(intentFilter);
}

manifest.writeFile(FILEPATH);
