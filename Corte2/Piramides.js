/**
 * Geomtria: Construye una geometria THREE.JS Y la retorna
 * ENTRADAS: vx = Arreglo de vertices para la geomtria /(arreglo de arreglos)
 * SALIDAS:  geom = geometria generada  apartir de vx
 */
function geometria(vx){
    Geom =new THREE.Geometry();    
    var largoVertice = vx.length;
    for (i = 0; i < largoVertice; i++) {
        x = vx[i][0];
        y = vx[i][1];
        z = vx[i][2];
        vector = new THREE.Vector3(x, y, z);
        Geom.vertices.push(vector);
    }
    return geometria;

}
/**
 * Traslacion: Construye la matriz de traslacion de THREEJS  a partir de vt  y la retorna 
 * ENTRADAS : vt = Vector de traslacion(arreglo de enteros) 
 * SALIDAS: matrizT = Matriz de traslacion para el vector vt 
 */
function traslacion(vt){
    var matrizT = new THREE.Matrix4();
    matrizT.set(1, 0, 0, vt[0],
            0, 1, 0, vt[1],
            0, 0, 1, vt[2],
            0, 0, 0, 1);

    return matrizT ;

}
/**
 * 
 
 
 */

function escalado(vs){
    var matrizS = new THREE.Matrix4();
    matrizS.set(vs[0], 0, 0, 0,
            0, vs[1], 0, 0,
            0, 0, vs[2], 0,
            0, 0, 0, 1);

     return matrizS;

}
/**
 *EscaladoReal: Aplica el vector de escalado vs al objeto fig
 * Entradas: fig = Objeto de tipo THREE.Line que representa el objeto grafico
 *           posini = Posicion inicial del objeto fig 
 *           vs = Vectoe escalado (arreglo de enteros )
 * Salida : 
 
 */

function escaladoReal(fig, vs){
    tr = [-posini[0], -posini[1], -posini[2]];
    fig.applyMatrix(traslacion(tr));
    fig.applyMatrix(escalado(vs));
    fig.applyMatrix(traslacion(posini));

}


function init() {

    // Escena
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);    
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);

    var size = 700;
    var arrowSize = 40;
    var divisions = 20;
    var origin = new THREE.Vector3( 0, 0, 0 );
    var x = new THREE.Vector3( 1, 0, 0 );
    var y = new THREE.Vector3( 0, 1, 0 );
    var z = new THREE.Vector3( 0, 0, 1 );
    var color2 = new THREE.Color( 0x333333 );  /// 0x333333
    var colorR = new THREE.Color( 0xAA0000 );
    var colorG = new THREE.Color( 0x00AA00 );
    var colorB = new THREE.Color( 0x0000AA );

    //Crear la Grilla
    var gridHelperXZ = new THREE.GridHelper( size, divisions, color2, color2);

    //Flechas
    var arrowX = new THREE.ArrowHelper( x, origin, arrowSize, colorR );
    var arrowY = new THREE.ArrowHelper( y, origin, arrowSize, colorG );
    var arrowZ = new THREE.ArrowHelper( z, origin, arrowSize, colorB );
        
    //Cámara
    camera.position.x = 000;
    camera.position.y = 100;
    camera.position.z = 400;
    camera.lookAt(scene.position);

    //Creación de las Figuras
    //Piramide #1    
    lado = 30;
    h = 45;
    [v1, v2, v3, v4, v5] = [[0,0,0],[lado,0,lado],[lado,0,0], [0,0,lado], [lado/2, h, lado/2]];
    var vertices = [v1,v2,v3,v4,v5,v1,v4,v3,v5,v2];
    geomPiramide = geometria(vertices);

    // Colores
    color = [{color:0x00ff00},{color:0xFF0000}];

    //Material para las piramides
    Material = [];
    for (i=0; i<2; i++)
        Material [i] = new THREE.ParticleBasicMaterial((color[i]));

    
    //Figuras par las piramides
    piramide =[];
    for(i=0; i<2; i++)
        piramide.push(new THREE.Line(geomPiramide, material[i]));

    // Grirar la segunda piramide 
    

    // En el documento HTML
    document.body.appendChild(renderer.domElement);

    // Agregar elementos al escenario
    scene.add(gridHelperXZ);
    scene.add(arrowX);	
    scene.add(arrowY);	
    scene.add(arrowZ);
    scene.add(Cuadrado);
    scene.add(Cuadrado2);

    for (i= 0; i<2; i++)
        scene.add(piramide[i]);

    renderer.render(scene, camera);
}

init();  // otra forma: window.onload = init;
