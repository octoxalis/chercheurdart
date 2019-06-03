/**
 * loadJS: load a JS file asynchronously. [c]2014 @scottjehl, Filament Group, Inc.
 * (Based on http://goo.gl/REQGQ by Paul Irish). Licensed MIT
 */
(function( w )
{
  const loadJS = ( src, cb, ordered ) =>
  {
		"use strict"
		let tmp
		let ref = w.document.getElementsByTagName( "script" )[ 0 ]
		let script = w.document.createElement( "script" )

    if ( typeof(cb) === 'boolean' )
    {
			tmp = ordered
			ordered = cb
			cb = tmp
		}
		script.src = src
		script.async = !ordered
		ref.parentNode.insertBefore( script, ref )
    if ( cb && typeof(cb) === "function" ) script.onload = cb
		return script
	}
	
	if( typeof module !== "undefined" ) module.exports = loadJS    // : commonjs
	else w.loadJS = loadJS
}( typeof global !== "undefined" ? global : this ) )