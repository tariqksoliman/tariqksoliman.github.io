var scene, camera, renderer;
var geometry, material, mesh;
var width, height;
var pw, ph, prw, prh;
var mousePos;

init();
animate();

function init() {

	scene = new THREE.Scene();
	width = window.innerWidth;
	height = window.innerHeight;

	camera = new THREE.PerspectiveCamera( 75, width / height, 1, 8000 );
	camera.position.z = 500;

	pw = width * 2;
	ph = pw / 2;
	prw = 256;
	prh = prw / 2;

	geometry = new THREE.PlaneBufferGeometry( pw, ph, prw - 1, prh - 1 );
	material = new THREE.MeshBasicMaterial( {color: 0x000000, wireframe: true, opacity: 0.04, transparent: true, depthWrite: false } );
	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

	renderer = new THREE.WebGLRenderer( { alpha: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.sortObjects = false;

	document.getElementById( 'webgl' ).appendChild( renderer.domElement );

	document.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
	document.addEventListener( 'mouseout', this.onDocumentMouseOut, false );

}

function animate() {

	requestAnimationFrame( animate );

	modifyMesh();

	renderer.render( scene, camera );

}

function modifyMesh() {
	var p = mesh.geometry.attributes.position.array;

	for( var i = 0; i < p.length; i++ ) {
		p[i]   = p[i];
		p[++i] = p[i];
		p[++i] = zt( p[i-2], p[i-1], p[i] );
	}

	function zt( x, y, z ) {
		if( mousePos ) {
			var d = Math.sqrt( Math.pow( x - mousePos.x, 2 ) + Math.pow( y - mousePos.y, 2 ) );
			if( d < 300 ) {
				d = ( 300 - d ) / 300; 
				return Math.max( z - ( d * ( d ) * 10 ), -200 );
			}
		}
		return z;//Math.min( z * 0.99, 0 );
	}
	geometry.attributes.position.needsUpdate = true;
}

function onDocumentMouseMove( event ) {
	var vector = new THREE.Vector3();

	vector.set(
		( event.clientX / window.innerWidth ) * 2 - 1,
		- ( event.clientY / window.innerHeight ) * 2 + 1,
		0.5 );

	vector.unproject( camera );

	var dir = vector.sub( camera.position ).normalize();

	var distance = - camera.position.z / dir.z;

	mousePos = camera.position.clone().add( dir.multiplyScalar( distance ) );	
}

function onDocumentMouseOut( event ) {
	mousePos = null;
}