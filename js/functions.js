const buildGround = (w,h,scene) => {

	var skyboxMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
    skyboxMaterial.backFaceCulling = false;
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
    skybox.material = skyboxMaterial;
    var setSkyConfig = function (property, from, to) {
		var keys = [
            { frame: 0, value: from },
			{ frame: 100, value: to }
        ];
		var animation = new BABYLON.Animation("animation", property, 100, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
		animation.setKeys(keys);
		
		scene.stopAnimation(skybox);
		scene.beginDirectAnimation(skybox, [animation], 0, 100, false, 1000);
    };
    	
	// window.addEventListener("keydown", function (evt) {
	// 	switch (evt.keyCode) {
	// 		case 49: setSkyConfig("material.inclination", skyboxMaterial.inclination, 0); break; // 1
	// 		case 50: setSkyConfig("material.inclination", skyboxMaterial.inclination, -0.5); break; // 2

	// 		case 51: setSkyConfig("material.luminance", skyboxMaterial.luminance, 0.1); break; // 3
	// 		case 52: setSkyConfig("material.luminance", skyboxMaterial.luminance, 1.0); break; // 4
			
	// 		case 53: setSkyConfig("material.turbidity", skyboxMaterial.turbidity, 40); break; // 5
	// 		case 54: setSkyConfig("material.turbidity", skyboxMaterial.turbidity, 5); break; // 6
			
    //         case 55: setSkyConfig("material.cameraOffset.y", skyboxMaterial.cameraOffset.y, 50); break; // 7
    //         case 56: setSkyConfig("material.cameraOffset.y", skyboxMaterial.cameraOffset.y, 0); break;  // 8
	// 		default: break;
	// 	}
    // });
	
	// Set to Day
	setSkyConfig("material.inclination", skyboxMaterial.inclination, 0.02);
	

    var mat = new BABYLON.StandardMaterial("mat", scene);
    //var texture = new BABYLON.Texture("img/nasim-4248.jpg", scene);
    var texture = new BABYLON.Texture("img/nasim-4248.jpg", scene);
    mat.diffuseTexture = texture;
    mat.diffuseTexture.uScale = 100;
    mat.diffuseTexture.vScale = 100;
    var faceUV = new Array(6);
    faceUV[4] = new BABYLON.Vector4(1, 0, 0, 1);
    var box = BABYLON.MeshBuilder.CreateBox("box", { width:w/2,height:1,depth:h/2,faceUV: faceUV }, scene);
    box.material = mat;
    



    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:w, height:h});
    const groundlMat = new BABYLON.StandardMaterial("boxMat");
    groundlMat.diffuseTexture = new BABYLON.Texture("img/concrete3.jpg");
    ground.material = groundlMat;
    return ground;


}

const buildCamera = (w,h,scene) =>{
    //const camera = new BABYLON.ArcRotateCamera("camera",- Math.PI/2,Math.PI/2, 10, new BABYLON.Vector3(-w/2+50,15,h/2-40));
    

    //camera = new BABYLON.UniversalCamera("MyCamera", new BABYLON.Vector3(0, 4,20), scene);
    camera = new BABYLON.UniversalCamera("MyCamera", new BABYLON.Vector3(-20, 4,30), scene);
   
    
    camera.attachControl(canvas);
    camera.speed =0.5;
    camera.setTarget(new BABYLON.Vector3(-20, 4,80));
    scene.activeCameras.push(camera);
    camera.upperBetaLimit = Math.PI / 2;
    camera.applyGravity = true;
    camera.ellipsoid = new BABYLON.Vector3(1,2, 1);
    camera.checkCollisions = true;

    $(document).ready(function(){
        var timeout;
        $('#left').mousedown(function(){
            timeout = setInterval(function(){
                camera.cameraRotation=new BABYLON.Vector2(0, -Math.PI/720 )
            }, 10);
            return false;
        });
        $('#right').mousedown(function(){
            timeout = setInterval(function(){
                camera.cameraRotation=new BABYLON.Vector2(0, Math.PI/720 )
            }, 10);
            return false;
        });
        $(document).mouseup(function(){
            clearInterval(timeout);
            return false;
        });
        $('#top').mousedown(function(){
            timeout = setInterval(function(){
                cameraTarget = camera.getTarget();
                let ratio = 800;
                let this_x = camera.position.x - (camera.position.x - cameraTarget.x)/ratio;
                let this_y = camera.position.y - (camera.position.y - cameraTarget.y)/ratio;
                let this_z = camera.position.z - (camera.position.z - cameraTarget.z)/ratio;
                this_y = 4;
                if(this_x <=-w/2+20){
                    this_x = -w/2+20;
                }else if(this_x >=w/2-20){
                    this_x=w/2-20;
                }
                if(this_z <=-h/2+20){
                    this_z = -h/2+20;
                }else if(this_z >=h/2-20){
                    this_z=h/2-20;
                }
                camera.position = new BABYLON.Vector3(this_x,this_y,this_z);
            }, 10);
            return false;
        });
        $('#down').mousedown(function(){
            timeout = setInterval(function(){
                cameraTarget = camera.getTarget();
                let ratio = 800;
                let this_x = camera.position.x + (camera.position.x - cameraTarget.x)/ratio;
                let this_y = camera.position.y + (camera.position.y - cameraTarget.y)/ratio;
                let this_z = camera.position.z + (camera.position.z - cameraTarget.z)/ratio;
                this_y = 4;
                if(this_x <=-w/2+20){
                    this_x = -w/2+20;
                }else if(this_x >=w/2-20){
                    this_x=w/2-20;
                }
                if(this_z <=-h/2+20){
                    this_z = -h/2+20;
                }else if(this_z >=h/2-20){
                    this_z=h/2-20;
                }
                camera.position = new BABYLON.Vector3(this_x,this_y,this_z);
            }, 10);
            return false;
        });
    });
    // scene.onPointerUp = function (evt,pic) {
    //     clearInterval(interval);
    // }

    // scene.onPointerDown = function (evt,pic) {
    //     interval = setInterval(function(){
    //         cameraTarget = camera.getTarget();
    //         let ratio = 800;
    //         let this_x = camera.position.x - (camera.position.x - cameraTarget.x)/ratio;
    //         let this_y = camera.position.y - (camera.position.y - cameraTarget.y)/ratio;
    //         let this_z = camera.position.z - (camera.position.z - cameraTarget.z)/ratio;
    //         this_y = 5;
    //         if(this_x <=-w/2+2){
    //             this_x = -w/2+2;
    //         }else if(this_x >=w/2){
    //             this_x=w/2-2;
    //         }

    //         if(this_y <=2){
    //             this_y = 2;
    //         }
    //         else if(this_y >=3){
    //             this_y=3;
    //         }


    //         if(this_z <=-h/2+2){
    //             this_z = -h/2+2;
    //         }else if(this_z >=h/2-2){
    //             this_z=h/2-2;
    //         }
            
    //          camera.position = new BABYLON.Vector3(this_x,this_y,this_z);
    //     }, 20);
    // }
    return camera;
}

const lamps = (w,h,scene)=>{

    let w_h = 40;
    const top_light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0,300,0));
    const bottom_light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0,-300,0));
    bottom_light.intensity = 0.8;

}

const buildHallLamp = (w,h,scene,color) =>{

    const lampLight = new BABYLON.SpotLight("lampLight", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, -1, 0), Math.PI, 1, scene);
    lampLight.diffuse = BABYLON.Color3.White();
    lampLight.intensity = 0.5;

    const whiteMat = new BABYLON.StandardMaterial("yellowMat");
    whiteMat.emissiveColor = BABYLON.Color3.White();

    const bulb = new BABYLON.MeshBuilder.CreateSphere("bulb", {});

    const bulbCover = BABYLON.MeshBuilder.CreateSphere("bulbCover", {arc:0.5, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
    bulbCover.rotation = new BABYLON.Vector3(Math.PI/2,0,0);
    bulbCover.scaling = new BABYLON.Vector3(2,2,2);
    bulb.material = whiteMat;
    bulb.position =new BABYLON.Vector3(0,5.45,0);
    bulbCover.position =new BABYLON.Vector3(0,5,0);

    lampLight.parent = bulb;


    return BABYLON.Mesh.MergeMeshes([bulb,bulbCover], true, false, null, false, true);
}

const BuildBooth_2_ = (w,h,scene,color) =>{


    const gray = new BABYLON.StandardMaterial("boxMat");
    gray.diffuseColor = new BABYLON.Color3(236/255, 240/255, 241/255);


    const kaf = BABYLON.MeshBuilder.CreateCylinder("cylinder", {tessellation:w*h});
    kaf.scaling = new BABYLON.Vector3(w,0.1,h);
    kaf.position = new BABYLON.Vector3(0,0.5,0);

    //top
    const top_a = BABYLON.MeshBuilder.CreateCylinder("cylinder", {tessellation:w*h});
    top_a.scaling = new BABYLON.Vector3(w,0.1,h);
    top_a.position = new BABYLON.Vector3(0,10,0);
    top_a.material = color;

    const top_b = BABYLON.MeshBuilder.CreateCylinder("cylinder", {tessellation:w*h});
    top_b.scaling = new BABYLON.Vector3(w-1,0.85,h-1);
    top_b.position = new BABYLON.Vector3(0,9,0);
    top_b.material = gray;

    const top_c = BABYLON.MeshBuilder.CreateCylinder("cylinder", {tessellation:w*h});
    top_c.scaling = new BABYLON.Vector3(w,0.1,h);
    top_c.position = new BABYLON.Vector3(0,8,0);
    top_c.material = color;
   

    const sotoon = BABYLON.MeshBuilder.CreateCylinder("cylinder", {tessellation:w*h});
    sotoon.scaling = new BABYLON.Vector3(1,4,1);
    sotoon.position = new BABYLON.Vector3(0,4,0);
    sotoon.material = gray;


    const stand1 = BuildStand_2(2,4,scene,color);
    stand1.translate(new BABYLON.Vector3(-6, 0, -2), 1, BABYLON.Space.WORLD);

    const desk1 = BuildDesk_1(5.5,2,scene,color);
    desk1.translate(new BABYLON.Vector3(0, 1, -h/2+3), 1, BABYLON.Space.WORLD);
    const desk2 = BuildDesk_1(4,2,scene,color);
    desk2.rotation = new BABYLON.Vector3(0,Math.PI/3,0);
    desk2.translate(new BABYLON.Vector3(-w/3+1, 1, -h/3+1), 1, BABYLON.Space.WORLD);
    const desk3 = BuildDesk_1(4,2,scene,color);
    desk3.rotation = new BABYLON.Vector3(0,-Math.PI/3,0);
    desk3.translate(new BABYLON.Vector3(w/3-1, 1, -h/3+1), 1, BABYLON.Space.WORLD);

    return BABYLON.Mesh.MergeMeshes(
        [kaf,sotoon,top_a,top_b,top_c,desk1,desk2,desk3,stand1]
        , true, false, null, false, true);
}

const BuildBooth_3_ = (w,h,scene,color) =>{
    const gray = new BABYLON.StandardMaterial("boxMat");
    gray.diffuseColor = new BABYLON.Color3(236/255, 240/255, 241/255);


    const kaf = BABYLON.MeshBuilder.CreateCylinder("cylinder", {tessellation:w*h});
    kaf.scaling = new BABYLON.Vector3(w,0.1,h);
    kaf.position = new BABYLON.Vector3(0,0.5,0);
    kaf.material = gray;

    const kaf2 = BABYLON.MeshBuilder.CreateCylinder("cylinder", {tessellation:w*h});
    kaf2.scaling = new BABYLON.Vector3(w/3,1,h/3);
    kaf2.position = new BABYLON.Vector3(0,1,0);
    kaf2.material = color;


    const sar = BABYLON.MeshBuilder.CreateCylinder("cylinder", {tessellation:w*h});
    sar.scaling = new BABYLON.Vector3(w/5,0.5,h/5);
    sar.position = new BABYLON.Vector3(0,9.5,0);
    sar.material = color;

    const sar2 = BABYLON.MeshBuilder.CreateCylinder("cylinder", {tessellation:w*h});
    sar2.scaling = new BABYLON.Vector3(w/6,1.5,h/6);
    sar2.position = new BABYLON.Vector3(0,10,0);
    sar2.material = gray;


    const sar3 = BABYLON.MeshBuilder.CreateBox("box", { width:w,height:0.1,depth:h}, scene);
    sar3.position.y = 10.5;
    sar3.material = color;

    return BABYLON.Mesh.MergeMeshes(
        [kaf,sar,sar2,sar3,kaf2,]
        , true, false, null, false, true);
}

const BuildBooth_4_ = (w,h,scene,color) =>{

}

const buildWindow = (w,h,scene,color) =>{

    //چهارچوب
    var top_a= BABYLON.MeshBuilder.CreateBox("box", { width:w,height:0.5,depth:0.5}, scene);
    top_a.position.y= 1;
    var top_b= BABYLON.MeshBuilder.CreateBox("box", { width:w,height:0.5,depth:0.5}, scene);
    top_b.position.y= h+1;
    var top_c= BABYLON.MeshBuilder.CreateBox("box", { width:0.5,height:h,depth:0.5}, scene);
    top_c.position.x= (w/2)-0.25;
    top_c.position.y = (h/2) +1;
    var top_d= BABYLON.MeshBuilder.CreateBox("box", { width:0.5,height:h,depth:0.5}, scene);
    top_d.position = new BABYLON.Vector3((-w/2)+0.25, (h/2)+1, 0);

    //خطوط افقی

    // var top_e= BABYLON.MeshBuilder.CreateBox("box", { width:w,height:0.25,depth:0.5}, scene);
    // top_e.position.y= 2.5;
    // var top_f= BABYLON.MeshBuilder.CreateBox("box", { width:w,height:0.25,depth:0.5}, scene);
    // top_f.position.y= 4.5;
    // var top_g= BABYLON.MeshBuilder.CreateBox("box", { width:w,height:0.25,depth:0.5}, scene);
    // top_g.position.y= 6.5;

    //خطوط عمودی

    var line_ver_1= BABYLON.MeshBuilder.CreateBox("box", { width:0.25,height:h,depth:0.5}, scene);
    line_ver_1.position = new BABYLON.Vector3((-w/2)+3.25, (h/2)+1, 0);
    var line_ver_2= BABYLON.MeshBuilder.CreateBox("box", { width:0.25,height:h,depth:0.5}, scene);
    line_ver_2.position = new BABYLON.Vector3((-w/2)+6.25, (h/2)+1, 0);
    var line_ver_3= BABYLON.MeshBuilder.CreateBox("box", { width:0.25,height:h,depth:0.5}, scene);
    line_ver_3.position = new BABYLON.Vector3((-w/2)+9.25, (h/2)+1, 0);
    var line_ver_4= BABYLON.MeshBuilder.CreateBox("box", { width:0.25,height:h,depth:0.5}, scene);
    line_ver_4.position = new BABYLON.Vector3((-w/2)+12.25, (h/2)+1, 0);
    var line_ver_5= BABYLON.MeshBuilder.CreateBox("box", { width:0.25,height:h,depth:0.5}, scene);
    line_ver_5.position = new BABYLON.Vector3((-w/2)+15.25, (h/2)+1, 0);
    var line_ver_6= BABYLON.MeshBuilder.CreateBox("box", { width:0.25,height:h,depth:0.5}, scene);
    line_ver_6.position = new BABYLON.Vector3((-w/2)+18.25, (h/2)+1, 0);
    var line_ver_7= BABYLON.MeshBuilder.CreateBox("box", { width:0.25,height:h,depth:0.5}, scene);
    line_ver_7.position = new BABYLON.Vector3((-w/2)+21.25, (h/2)+1, 0);
    var line_ver_8= BABYLON.MeshBuilder.CreateBox("box", { width:0.25,height:h,depth:0.5}, scene);
    line_ver_8.position = new BABYLON.Vector3((-w/2)+24.25, (h/2)+1, 0);
    var line_ver_9= BABYLON.MeshBuilder.CreateBox("box", { width:0.25,height:h,depth:0.5}, scene);
    line_ver_9.position = new BABYLON.Vector3((-w/2)+27.25, (h/2)+1, 0);
    var line_ver_10= BABYLON.MeshBuilder.CreateBox("box", { width:0.25,height:h,depth:0.5}, scene);
    line_ver_10.position = new BABYLON.Vector3((-w/2)+30.25, (h/2)+1, 0);
    var line_ver_11= BABYLON.MeshBuilder.CreateBox("box", { width:0.25,height:h,depth:0.5}, scene);
    line_ver_11.position = new BABYLON.Vector3((-w/2)+33.25, (h/2)+1, 0);
    var line_ver_12= BABYLON.MeshBuilder.CreateBox("box", { width:0.25,height:h,depth:0.5}, scene);
    line_ver_12.position = new BABYLON.Vector3((-w/2)+36.5, (h/2)+1, 0);
    var line_ver_13= BABYLON.MeshBuilder.CreateBox("box", { width:0.25,height:h,depth:0.5}, scene);
    line_ver_13.position = new BABYLON.Vector3((-w/2)+39.5, (h/2)+1, 0);
    var line_ver_14= BABYLON.MeshBuilder.CreateBox("box", { width:0.25,height:h,depth:0.5}, scene);
    line_ver_14.position = new BABYLON.Vector3((-w/2)+42.5, (h/2)+1, 0);

    top_a.material = top_b.material = top_c.material = top_d.material = color;
    line_ver_1.material = line_ver_2.material = line_ver_3.material = line_ver_4.material =line_ver_5.material = line_ver_6.material = line_ver_7.material = color;
    line_ver_8.material = line_ver_9.material = line_ver_10.material = line_ver_11.material =  line_ver_12.material = line_ver_13.material = line_ver_14.material = color;
    return BABYLON.Mesh.MergeMeshes([top_a, top_b, top_c, top_d, line_ver_1,line_ver_2, line_ver_3, line_ver_4, line_ver_5, line_ver_6, line_ver_7, line_ver_8, line_ver_9, line_ver_10, line_ver_11, line_ver_12, line_ver_13, line_ver_14], true, false, null, false, true); 

}

const build_door = (w, h, scene, color) =>{

    var d_1= BABYLON.MeshBuilder.CreateBox("box", { width:w,height:0.5,depth:0.5}, scene);
    d_1.position.y= 1;
    var d_2= BABYLON.MeshBuilder.CreateBox("box", { width:w,height:0.5,depth:0.5}, scene);
    d_2.position.y= h+1;
    var d_3= BABYLON.MeshBuilder.CreateBox("box", { width:0.5,height:h,depth:0.5}, scene);
    d_3.position.x= (w/2)-0.25;
    d_3.position.y = (h/2) +1;
    var d_4= BABYLON.MeshBuilder.CreateBox("box", { width:0.5,height:h,depth:0.5}, scene);
    d_4.position = new BABYLON.Vector3((-w/2)+0.25, (h/2)+1, 0);

    d_1.material = d_2.material = d_3.material = d_4.material = color;

        //خطوط افقی
        width_d = 30;

        var o_1= BABYLON.MeshBuilder.CreateBox("box", { width:width_d,height:0.25,depth:0.5}, scene);
        o_1.position= new BABYLON.Vector3(32.5,4,0);
        var o_2= BABYLON.MeshBuilder.CreateBox("box", { width:width_d,height:0.25,depth:0.5}, scene);
        o_2.position=new BABYLON.Vector3(32,6.5,0);
        var o_3 = BABYLON.MeshBuilder.CreateBox("box", { width:width_d,height:0.25,depth:0.5}, scene);
        o_3.position=new BABYLON.Vector3(32,9.5,0);
        var o_4 = BABYLON.MeshBuilder.CreateBox("box", { width:width_d,height:0.25,depth:0.5}, scene);
        o_4.position=new BABYLON.Vector3(32,12.5,0);
        var o_5 = BABYLON.MeshBuilder.CreateBox("box", { width:width_d,height:0.25,depth:0.5}, scene);
        o_5.position=new BABYLON.Vector3(32,15.5,0);
        var o_6 = BABYLON.MeshBuilder.CreateBox("box", { width:95,height:0.25,depth:0.5}, scene);
        o_6.position.y= 19;
        var o_7 = BABYLON.MeshBuilder.CreateBox("box", { width:95,height:0.25,depth:0.5}, scene);
        o_7.position.y= 22.5;

        //افقی چپ!
        
        var o_1_l= BABYLON.MeshBuilder.CreateBox("box", { width:width_d,height:0.25,depth:0.5}, scene);
        o_1_l.position= new BABYLON.Vector3(-32.5,4,0);
        var o_2_l= BABYLON.MeshBuilder.CreateBox("box", { width:width_d,height:0.25,depth:0.5}, scene);
        o_2_l.position=new BABYLON.Vector3(-32,6.5,0);
        var o_3_l = BABYLON.MeshBuilder.CreateBox("box", { width:width_d,height:0.25,depth:0.5}, scene);
        o_3_l.position=new BABYLON.Vector3(-32,9.5,0);
        var o_4_l = BABYLON.MeshBuilder.CreateBox("box", { width:width_d,height:0.25,depth:0.5}, scene);
        o_4_l.position=new BABYLON.Vector3(-32,12.5,0);
        var o_5_l = BABYLON.MeshBuilder.CreateBox("box", { width:width_d,height:0.25,depth:0.5}, scene);
        o_5_l.position=new BABYLON.Vector3(-32,15.5,0);


        //خطوط عمودی

        var line_ver_d_1= BABYLON.MeshBuilder.CreateBox("box", { width:0.5,height:h,depth:0.5}, scene);
        line_ver_d_1.position = new BABYLON.Vector3(-17, (h/2)+1, 0);
        var line_ver_d_3= BABYLON.MeshBuilder.CreateBox("box", { width:0.5,height:h,depth:0.5}, scene);
        line_ver_d_3.position = new BABYLON.Vector3(-25, (h/2)+1, 0);
        var line_ver_d_5= BABYLON.MeshBuilder.CreateBox("box", { width:0.5,height:h,depth:0.5}, scene);
        line_ver_d_5.position = new BABYLON.Vector3(-33, (h/2)+1, 0);
        var line_ver_d_7= BABYLON.MeshBuilder.CreateBox("box", { width:0.5,height:h,depth:0.5}, scene);
        line_ver_d_7.position = new BABYLON.Vector3(-41, (h/2)+1, 0);

        var line_ver_d_2= BABYLON.MeshBuilder.CreateBox("box", { width:0.5,height:h,depth:0.5}, scene);
        line_ver_d_2.position= new BABYLON.Vector3(17, (h/2)+1, 0);
        var line_ver_d_4= BABYLON.MeshBuilder.CreateBox("box", { width:0.5,height:h,depth:0.5}, scene);
        line_ver_d_4.position = new BABYLON.Vector3(25, (h/2)+1, 0);
        var line_ver_d_6= BABYLON.MeshBuilder.CreateBox("box", { width:0.5,height:h,depth:0.5}, scene);
        line_ver_d_6.position = new BABYLON.Vector3(33, (h/2)+1, 0);
        var line_ver_d_8= BABYLON.MeshBuilder.CreateBox("box", { width:0.5,height:h,depth:0.5}, scene);
        line_ver_d_8.position = new BABYLON.Vector3(41, (h/2)+1, 0);

    return BABYLON.Mesh.MergeMeshes([d_1,d_2,d_3,d_4,o_1,o_2,o_3, o_4, o_5, o_6, o_7, o_1_l,o_2_l,o_3_l, o_4_l, o_5_l, line_ver_d_1, line_ver_d_2, line_ver_d_3, line_ver_d_4, line_ver_d_5, line_ver_d_7,line_ver_d_6, line_ver_d_8], true, false, null, false, true); 
}

const BuildDesk_1 = (w,h,scene,color) =>{

    const gray = new BABYLON.StandardMaterial("boxMat");
    gray.diffuseColor = new BABYLON.Color3(236/255, 240/255, 241/255);
    const myPath = [
        new BABYLON.Vector3(0, 0, 0),
       new BABYLON.Vector3(0, h, 0),
        
    ];
    const miz_a = BABYLON.MeshBuilder.CreateCylinder("tube", {arc:0.5,path: myPath, radius: 0.5, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
    miz_a.scaling = new BABYLON.Vector3(w,h,w);
    miz_a.position = new BABYLON.Vector3(0,h/2,0)
    miz_a.material = color;

    const miz_b = BABYLON.MeshBuilder.CreateCylinder("tube", {arc:0.5,path: myPath, radius: 0.5, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
    miz_b.scaling = new BABYLON.Vector3(w+.1,0.2,w+.1);
    miz_b.position = new BABYLON.Vector3(0,0.75,0)
    miz_b.material = gray;
    
    const miz_c = BABYLON.MeshBuilder.CreateCylinder("tube", {arc:0.5,path: myPath, radius: 0.5, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
    miz_c.scaling = new BABYLON.Vector3(w+0.1,0.2,w+0.1);
    miz_c.position = new BABYLON.Vector3(0,h+.75,0)
    miz_c.material = gray;

    
    return BABYLON.Mesh.MergeMeshes(
        [miz_a,miz_b,miz_c]
        , true, false, null, false, true);
}

const BuildDesk_2 = (w,h,scene,color,logo) =>{

    const gray = new BABYLON.StandardMaterial("boxMat");
    gray.diffuseColor = new BABYLON.Color3(236/255, 240/255, 241/255);


    const logopo = BABYLON.MeshBuilder.CreateCylinder("tube", { sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
    logopo.position = new BABYLON.Vector3(0,h/2+0.6,-0.75);
    logopo.scaling = new BABYLON.Vector3(1,0.01,1);
    logopo.rotation = new BABYLON.Vector3(-Math.PI/2,0,0);
    logopo.material = logo;

    var desk_a= BABYLON.MeshBuilder.CreateBox("box", { width:w+.2,height:0.2,depth:1.2}, scene);
    desk_a.position = new BABYLON.Vector3(0,h/2-0.2,0);
    desk_a.material = color;

    var desk_b= BABYLON.MeshBuilder.CreateBox("box", { width:w,height:h,depth:1}, scene);
    desk_b.position = new BABYLON.Vector3(0,h/2,0);
    desk_b.material = gray;

    var desk_c= BABYLON.MeshBuilder.CreateBox("box", { width:w+.2,height:0.2,depth:1.2}, scene);
    desk_c.position = new BABYLON.Vector3(0,h-0.2,0);
    desk_c.material = color;

    return BABYLON.Mesh.MergeMeshes(
        [desk_a,desk_b,desk_c,logopo]
        , true, false, null, false, true);
}

const BuildStand_1 = (w,h,scene,color,img) =>{
    const gray = new BABYLON.StandardMaterial("boxMat");
    gray.diffuseColor = new BABYLON.Color3(236/255, 240/255, 241/255);

    
    var kaf= BABYLON.MeshBuilder.CreateBox("box", { width:1,height:0.2,depth:1}, scene);
    kaf.position = new BABYLON.Vector3(0,1,0);
    kaf.material = color;

    var pa= BABYLON.MeshBuilder.CreateBox("box", { width:0.2,height:h,depth:0.2}, scene);
    pa.position = new BABYLON.Vector3(0,h/2+1,0);
    pa.material = color;

    var safe= BABYLON.MeshBuilder.CreateBox("box", { width:w/2,height:0.2,depth:w/2}, scene);
    safe.rotation = new BABYLON.Vector4(-Math.PI/3,0,0);
    safe.position = new BABYLON.Vector3(0,1.4*h,0);
    safe.material = color;

    const faceUV = [];
    for(var i=0;i<=5;i++){
        faceUV[i] = new BABYLON.Vector4(0.0, 0.0, 0.0, 1.0); //front face
    }
    faceUV[4] = new BABYLON.Vector4(0.0, 0, 1.0, 1.0);
    var safe2= BABYLON.MeshBuilder.CreateBox("box", { width:w,height:0.2,depth:w,faceUV: faceUV, wrap: true}, scene);
    safe2.rotation = new BABYLON.Vector4(-Math.PI/3,0,0);
    safe2.position = new BABYLON.Vector3(0,1.5*h,0);
    safe2.material = img;

    
    return BABYLON.Mesh.MergeMeshes(
        [kaf,pa,safe,safe2]
        , true, false, null, false, true);
}

const BuildStand_2 = (w,h,scene,color,img) =>{
    const gray = new BABYLON.StandardMaterial("boxMat");
    gray.diffuseColor = new BABYLON.Color3(236/255, 240/255, 241/255);

    
    var kaf= BABYLON.MeshBuilder.CreateCylinder("cylinder", {arc:0.5});
    kaf.rotation = new BABYLON.Vector4(Math.PI/2,0,Math.PI/2);
    kaf.position = new BABYLON.Vector3(0,1,0);
    kaf.scaling = new BABYLON.Vector3(w/2,h/3.2,1);
    kaf.material = color;

    var pa= BABYLON.MeshBuilder.CreateBox("box", { width:w-.2,height:h,depth:0.1}, scene);
    pa.position = new BABYLON.Vector3(0,h/2+1.5,0);
    pa.material = color;



    const faceUV = [];
    for(var i=0;i<=5;i++){
        faceUV[i] = new BABYLON.Vector4(0.0, 0.0, 0.0, 1.0); //front face
    }
    faceUV[1] = new BABYLON.Vector4(0.0, 0, 1.0, 1.0);
    var pa2= BABYLON.MeshBuilder.CreateBox("box", { width:w-.5,height:h-0.3,depth:0.5,faceUV: faceUV, wrap: true}, scene);
    pa2.position = new BABYLON.Vector3(0,h/2+1.5,0);
    pa2.material = img;




    
    return BABYLON.Mesh.MergeMeshes(
        [kaf,pa,pa2]
        , true, false, null, false, true);
}

const BuildStand_3 = (w,h,scene,color) =>{
    const gray = new BABYLON.StandardMaterial("boxMat");
    gray.diffuseColor = new BABYLON.Color3(236/255, 240/255, 241/255);


    const b1= BABYLON.MeshBuilder.CreateBox("box", { width:w,height:0.1,depth:1}, scene);
    b1.position = new BABYLON.Vector3(0,1,0);
    b1.material = color;

    const b2= BABYLON.MeshBuilder.CreateBox("box", { width:w,height:h,depth:0.1}, scene);
    b2.position = new BABYLON.Vector3(0,h/2+1,-.45);
    b2.material = color;

    const b3= BABYLON.MeshBuilder.CreateBox("box", { width:w,height:0.1,depth:2}, scene);
    b3.rotation = new BABYLON.Vector4(-Math.PI/6,0,0);
    b3.position = new BABYLON.Vector3(0,h+.45+(Math.sin(Math.PI/6)*2),.4);
    b3.material = color;
}

const BuildMiddleBooth = (w,h,scene,color) =>{
    let bx=20;
    let bz=15;
    const booth4_a = buildMini4Wall();
    const booth4_b = buildMini4Wall();
    const booth4_c = buildMini4Wall();
    const booth4_d = buildMini4Wall();

    booth4_a.scaling = new BABYLON.Vector3(bx,10,bz);
    booth4_b.scaling = new BABYLON.Vector3(bx,10,bz);
    booth4_c.scaling = new BABYLON.Vector3(bx,10,bz);
    booth4_d.scaling = new BABYLON.Vector3(bx,10,bz);

    booth4_a.position = new BABYLON.Vector3(w/5,5,h/6);
    booth4_b.position = new BABYLON.Vector3(w/5,5,-h/6);
    booth4_c.position = new BABYLON.Vector3(-w/5,5,h/6);
    booth4_d.position = new BABYLON.Vector3(-w/5,5,-h/6);
}

const buildMini4Wall =()=>{
    const kaf = BABYLON.MeshBuilder.CreateBox("box", {width: 3,height:0.15,depth:2, faceUV: faceUV, wrap: true});
    kaf.position = new BABYLON.Vector3(0,-.5,0);
    const of = BABYLON.MeshBuilder.CreateBox("box", {width: 3,height:1.5,depth:0.01, faceUV: faceUV, wrap: true});
    const am1 = BABYLON.MeshBuilder.CreateBox("box", {width: 0.01,height:1.5,depth:2, faceUV: faceUV, wrap: true});
    am1.position = new BABYLON.Vector3(.5,0,0);
    const am2 = BABYLON.MeshBuilder.CreateBox("box", {width: 0.01,height:1.5,depth:2, faceUV: faceUV, wrap: true});
    am2.position = new BABYLON.Vector3(-.5,0,0);
    const sar = BABYLON.MeshBuilder.CreateBox("box", {width: 3,height:0.05,depth:2, faceUV: faceUV, wrap: true});
    sar.position = new BABYLON.Vector3(0,0.75,0);
    return BABYLON.Mesh.MergeMeshes([of,am1,am2,kaf,sar], false, false, null, false, false);
}

const build4Wall = (w,h,scene)=>{
    let w_h = 30;
    let w_w = w;

    const wallMat = new BABYLON.StandardMaterial("boxMat");
    wallMat.diffuseTexture = new BABYLON.Texture("img/w2.jpg");
    //wallMat.diffuseColor = new BABYLON.Color3(255/255, 255/255, 255/255);


    const seton_mat = new BABYLON.StandardMaterial("boxMat");
    seton_mat.diffuseTexture = new BABYLON.Texture("img/concrete3.jpg");

    
    
    const glassMat = new BABYLON.StandardMaterial("boxMat");
    glassMat.diffuseColor = new BABYLON.Color3(220/255, 220/255, 220/255);
   
    faceUV = [];
    faceUV[0] = new BABYLON.Vector4(w/8, w_h/8, 1.0, 1.0); //front face
    faceUV[1] = new BABYLON.Vector4(w/8, w_h/8, 1.0, 1.0); //front face


    const wall_b_u = BABYLON.MeshBuilder.CreateBox("box", {width: w+2,height:w_h/4, faceUV: faceUV, wrap: true});
    wall_b_u.material = wallMat;
    wall_b_u.position = new BABYLON.Vector3(0,7*w_h/8,-h/2);

    const wall_b_b = BABYLON.MeshBuilder.CreateBox("box", {width: w+2,height:w_h/2, faceUV: faceUV, wrap: true});
    wall_b_b.material = wallMat;
    wall_b_b.position = new BABYLON.Vector3(0,w_h/4,-h/2);


    // const w_b = BABYLON.SceneLoader.ImportMesh("", "3d_models/", "triangle-window-glass.babylon", scene, function (meshes) {
    //     meshes[0].scaling = new BABYLON.Vector3(w/4, 1.5*w_h, 0.2);
    //     meshes[0].position = new BABYLON.Vector3(0,w_h/2,-h/2);
    // });






    const wall_f_u = BABYLON.MeshBuilder.CreateBox("box", {width: w,height:w_h/4, faceUV: faceUV, wrap: true});
    wall_f_u.material = wallMat;
    wall_f_u.position = new BABYLON.Vector3(0,7*w_h/8,h/2);

    const wall_f_b = BABYLON.MeshBuilder.CreateBox("box", {width: w,height:w_h/2, faceUV: faceUV, wrap: true});
    wall_f_b.material = wallMat;
    wall_f_b.position = new BABYLON.Vector3(0,w_h/4,h/2);



    



    const wall_l_r = BABYLON.MeshBuilder.CreateBox("box", {width: h,height:w_h,depth:1, faceUV: faceUV, wrap: true});
    wall_l_r.material = wallMat;
    wall_l_r.rotation = new BABYLON.Vector3(0,-Math.PI/2,0);
    wall_l_r.position = new BABYLON.Vector3((w/2),(w_h/2),0);



    const wall_l_l = BABYLON.MeshBuilder.CreateBox("box", {width: h,height:w_h, faceUV: faceUV, wrap: true});
    wall_l_l.material = wallMat;
    wall_l_l.rotation = new BABYLON.Vector3(0,Math.PI/2,0);
    wall_l_l.position = new BABYLON.Vector3(-w/2,w_h/2,0);


    const roofMat = new BABYLON.StandardMaterial("boxMat");
    roofMat.diffuseTexture = new BABYLON.Texture("img/white-diamond.png");
    const roof = BABYLON.MeshBuilder.CreateBox("box", {width: w,height:2,depth:h, faceUV: faceUV, wrap: true});
    roof.material = roofMat;
    roof.position = new BABYLON.Vector3(0,w_h+1,0);
    
    const sotoonMat = new BABYLON.StandardMaterial("boxMat");
    sotoonMat.diffuseColor = new BABYLON.Color3(180/255, 180/255, 180/255);
   




    // BABYLON.SceneLoader.ImportMeshAsync("", "3d_models/", "door.babylon", scene,function (meshes) {
    //     meshes.forEach(mesh => {
    //         mesh.position = new BABYLON.Vector3(w/2,1,0);
    //     });
    // });










    let s_h =1.5;
    const s1 = BABYLON.MeshBuilder.CreateBox("box", {width: w,height:s_h, wrap: true});
    s1.position = new BABYLON.Vector3(0,w_h-s_h,0);
    const s2 = BABYLON.MeshBuilder.CreateBox("box", {width: w,height:s_h, wrap: true});
    s2.position = new BABYLON.Vector3(0,w_h-s_h,h/4);
    const s3 = BABYLON.MeshBuilder.CreateBox("box", {width: w,height:s_h, wrap: true});
    s3.position = new BABYLON.Vector3(0,w_h-s_h,h/2-1);
    const s4 = BABYLON.MeshBuilder.CreateBox("box", {width: w,height:s_h, wrap: true});
    s4.position = new BABYLON.Vector3(0,w_h-s_h,-h/4);
    const s5 = BABYLON.MeshBuilder.CreateBox("box", {width: w,height:s_h, wrap: true});
    s5.position = new BABYLON.Vector3(0,w_h-s_h,-h/2+1);
    s1.material = s2.material = s3.material = s4.material = sotoonMat;

    s_h = 2;
    s_options = {width: s_h, height:4,depth:h, wrap: true};
    const s6 = BABYLON.MeshBuilder.CreateBox("box", s_options);
    s6.position = new BABYLON.Vector3(0,w_h-s_h/2,0);
    const s7 = BABYLON.MeshBuilder.CreateBox("box", s_options);
    s7.position = new BABYLON.Vector3(w/6,w_h-s_h/2,0);
    const s8 = BABYLON.MeshBuilder.CreateBox("box", s_options);
    s8.position = new BABYLON.Vector3(2*w/6,w_h-s_h/2,0);
    const s9 = BABYLON.MeshBuilder.CreateBox("box", s_options);
    s9.position = new BABYLON.Vector3(3*w/6,w_h-s_h/2,0);
    const s10 = BABYLON.MeshBuilder.CreateBox("box",s_options);
    s10.position = new BABYLON.Vector3(-w/6,w_h-s_h/2,0);
    const s11 = BABYLON.MeshBuilder.CreateBox("box", s_options);
    s11.position = new BABYLON.Vector3(-2*w/6,w_h-s_h/2,0);
    const s12 = BABYLON.MeshBuilder.CreateBox("box", s_options);
    s12.position = new BABYLON.Vector3(-3*w/6,w_h-s_h/2,0);

    s6.material = s7.material = s8.material = s9.material = s10.material = s11.material = s12.material = sotoonMat;

    //ستون
    s_h=4;
    c_options = {width: s_h, height:w_h,depth:2, wrap: true};
    const c1 = BABYLON.MeshBuilder.CreateBox("box", c_options);
    c1.position = new BABYLON.Vector3(w/2,w_h/2,-h/2+1);
    const c2 = BABYLON.MeshBuilder.CreateBox("box", c_options);
    c2.position = new BABYLON.Vector3(w/3,w_h/2,-h/2+1);
    const c3 = BABYLON.MeshBuilder.CreateBox("box", c_options);
    c3.position = new BABYLON.Vector3(w/6,w_h/2,-h/2+1);
    const c4 = BABYLON.MeshBuilder.CreateBox("box", c_options);
    c4.position = new BABYLON.Vector3(-w/6,w_h/2,-h/2+1);
    const c5 = BABYLON.MeshBuilder.CreateBox("box", c_options);
    c5.position = new BABYLON.Vector3(-w/3,w_h/2,-h/2+1);
    const c6 = BABYLON.MeshBuilder.CreateBox("box", c_options);
    c6.position = new BABYLON.Vector3(-w/2,w_h/2,-h/2+1);
    const c7 = BABYLON.MeshBuilder.CreateBox("box", c_options);
    c7.position = new BABYLON.Vector3(0,w_h/2,-h/2+1);
    const c8 = BABYLON.MeshBuilder.CreateBox("box", c_options);
    c8.position = new BABYLON.Vector3(-w/2,w_h/2,h/4-1);
    const c9 = BABYLON.MeshBuilder.CreateBox("box", c_options);
    c9.position = new BABYLON.Vector3(-w/2,w_h/2,-h/4-1);
    const _c1 = BABYLON.MeshBuilder.CreateBox("box", c_options);
    _c1.position = new BABYLON.Vector3(w/2,w_h/2,h/2-1);
    const _c2 = BABYLON.MeshBuilder.CreateBox("box", c_options);
    _c2.position = new BABYLON.Vector3(w/3,w_h/2,h/2-1);
    const _c3 = BABYLON.MeshBuilder.CreateBox("box", c_options);
    _c3.position = new BABYLON.Vector3(w/6,w_h/2,h/2-1);
    const _c4 = BABYLON.MeshBuilder.CreateBox("box", c_options);
    _c4.position = new BABYLON.Vector3(-w/6,w_h/2,h/2-1);
    const _c5 = BABYLON.MeshBuilder.CreateBox("box", c_options);
    _c5.position = new BABYLON.Vector3(-w/3,w_h/2,h/2-1);
    const _c6 = BABYLON.MeshBuilder.CreateBox("box", c_options);
    _c6.position = new BABYLON.Vector3(-w/2+1,w_h/2,h/2-1);
    const _c7 = BABYLON.MeshBuilder.CreateBox("box", c_options);
    _c7.position = new BABYLON.Vector3(0,w_h/2,h/2-1);
    const _c8 = BABYLON.MeshBuilder.CreateBox("box", c_options);
    _c8.position = new BABYLON.Vector3(w/2,w_h/2,h/4-1);
    const _c9 = BABYLON.MeshBuilder.CreateBox("box", c_options);
    _c9.position = new BABYLON.Vector3(w/2,w_h/2,-h/4-1);

    c1.material = c2.material = c3.material = c4.material = c5.material = c6.material = c7.material =c8.material = c9.material= seton_mat;
    _c1.material = _c2.material = _c3.material = _c4.material = _c5.material = _c6.material = _c7.material =_c8.material = _c9.material= seton_mat;





    //پنجره
    var window_y = 14.2;
    const black = new BABYLON.StandardMaterial("boxMat");
    black.diffuseColor = new BABYLON.Color3(220/255, 220/255, 230/255);

    const w_1 =buildWindow(46,7,scene,black);
    w_1.translate(new BABYLON.Vector3((-w/6)+(w/12),window_y,h/2), 1, BABYLON.Space.WORLD);
    const w_2 =buildWindow(46,7,scene,black);
    w_2.translate(new BABYLON.Vector3((w/6)-(w/12),window_y,h/2), 1, BABYLON.Space.WORLD);
    const w_3 =buildWindow(46,7,scene,black);
    w_3.translate(new BABYLON.Vector3((w/6)+(w/12),window_y,h/2), 1, BABYLON.Space.WORLD);
    const w_4 =buildWindow(46,7,scene,black);
    w_4.translate(new BABYLON.Vector3((-w/6)-(w/12),window_y,h/2), 1, BABYLON.Space.WORLD);
    const w_5 =buildWindow(46,7,scene,black);
    w_5.translate(new BABYLON.Vector3((-w/6)-3*(w/12),window_y,h/2), 1, BABYLON.Space.WORLD);
    const w_6 =buildWindow(46,7,scene,black);
    w_6.translate(new BABYLON.Vector3((w/6)+3*(w/12),window_y,h/2), 1, BABYLON.Space.WORLD);

    const w_7 =buildWindow(46,7,scene,black);
    w_7.translate(new BABYLON.Vector3((-w/6)+(w/12),window_y,-h/2), 1, BABYLON.Space.WORLD);
    const w_8 =buildWindow(46,7,scene,black);
    w_8.translate(new BABYLON.Vector3((w/6)-(w/12),window_y,-h/2), 1, BABYLON.Space.WORLD);
    const w_9 =buildWindow(46,7,scene,black);
    w_9.translate(new BABYLON.Vector3((w/6)+(w/12),window_y,-h/2), 1, BABYLON.Space.WORLD);
    const w_10 =buildWindow(46,7,scene,black);
    w_10.translate(new BABYLON.Vector3((-w/6)-(w/12),window_y,-h/2), 1, BABYLON.Space.WORLD);
    const w_11 =buildWindow(46,7,scene,black);
    w_11.translate(new BABYLON.Vector3((-w/6)-3*(w/12),window_y,-h/2), 1, BABYLON.Space.WORLD);
    const w_12 =buildWindow(46,7,scene,black);
    w_12.translate(new BABYLON.Vector3((w/6)+3*(w/12),window_y,-h/2), 1, BABYLON.Space.WORLD);

}

const ceiling_box = (w,h,scene)=>{

    const roof_mat = new BABYLON.StandardMaterial("boxMat");
    roof_mat.diffuseTexture = new BABYLON.Texture("img/Sol.jpg");

    

    options = {width:w-1,height:1,depth:h-1};
    const b0 = BABYLON.MeshBuilder.CreateBox("box", options);
    b0.material = roof_mat;
    const b1 = BABYLON.MeshBuilder.CreateBox("box", options);
    b1.position = new BABYLON.Vector3(w,0,-h);
    const b2 = BABYLON.MeshBuilder.CreateBox("box", options);
    b2.position = new BABYLON.Vector3(0,0,-h);
    const b3 = BABYLON.MeshBuilder.CreateBox("box", options);
    b3.position = new BABYLON.Vector3(-w,0,-h);
    const b4 = BABYLON.MeshBuilder.CreateBox("box", options);
    b4.position = new BABYLON.Vector3(-w,0,0);
    const b5 = BABYLON.MeshBuilder.CreateBox("box", options);
    b5.position = new BABYLON.Vector3(-w,0,h);
    const b6 = BABYLON.MeshBuilder.CreateBox("box", options);
    b6.position = new BABYLON.Vector3(0,0,h);
    const b7 = BABYLON.MeshBuilder.CreateBox("box", options);
    b7.position = new BABYLON.Vector3(w,0,0);
    const b8 = BABYLON.MeshBuilder.CreateBox("box", options);
    b8.position = new BABYLON.Vector3(w,0,h);
    
    
    const l1 = buildHallLamp(1,1,scene,"White");
    l1.position = new BABYLON.Vector3(0,-6,0);

    return BABYLON.Mesh.MergeMeshes([b0,b1,b2,b3,b4,b5,b6,b7,b8,l1], true, false, null, false, true);
}

const ceiling = (w,h,scene)=>{
    let w_h = 29;
    ce_w = (w/6)/3;
    ce_h = (h/4)/3;
    const ce_1 = ceiling_box(ce_w,ce_h,scene);
    ce_1.position = new BABYLON.Vector3(3*ce_w/2,w_h,3*ce_h/2);
    const ce_2 = ceiling_box(ce_w,ce_h,scene);
    ce_2.position = new BABYLON.Vector3(-3*ce_w/2,w_h,-3*ce_h/2);
    const ce_3 = ceiling_box(ce_w,ce_h,scene);
    ce_3.position = new BABYLON.Vector3(-3*ce_w/2,w_h,3*ce_h/2);
    const ce_4 = ceiling_box(ce_w,ce_h,scene);
    ce_4.position = new BABYLON.Vector3(3*ce_w/2,w_h,-3*ce_h/2);

    const ce_5 = ceiling_box(ce_w,ce_h,scene);
    ce_5.position = new BABYLON.Vector3(9*ce_w/2,w_h,-3*ce_h/2);
    const ce_6 = ceiling_box(ce_w,ce_h,scene);
    ce_6.position = new BABYLON.Vector3(9*ce_w/2,w_h,+3*ce_h/2);
    const ce_7 = ceiling_box(ce_w,ce_h,scene);
    ce_7.position = new BABYLON.Vector3(9*ce_w/2,w_h,+9*ce_h/2);
    const ce_8 = ceiling_box(ce_w,ce_h,scene);
    ce_8.position = new BABYLON.Vector3(9*ce_w/2,w_h,-9*ce_h/2);

    const ce_9 = ceiling_box(ce_w,ce_h,scene);
    ce_9.position = new BABYLON.Vector3(-9*ce_w/2,w_h,-3*ce_h/2);
    const ce_10 = ceiling_box(ce_w,ce_h,scene);
    ce_10.position = new BABYLON.Vector3(-9*ce_w/2,w_h,+3*ce_h/2);
    const ce_11 = ceiling_box(ce_w,ce_h,scene);
    ce_11.position = new BABYLON.Vector3(-9*ce_w/2,w_h,+9*ce_h/2);
    const ce_12 = ceiling_box(ce_w,ce_h,scene);
    ce_12.position = new BABYLON.Vector3(-9*ce_w/2,w_h,-9*ce_h/2);
 

    const ce_13 = ceiling_box(ce_w,ce_h,scene);
    ce_13.position = new BABYLON.Vector3(-15*ce_w/2,w_h,-3*ce_h/2);
    const ce_14 = ceiling_box(ce_w,ce_h,scene);
    ce_14.position = new BABYLON.Vector3(-15*ce_w/2,w_h,+3*ce_h/2);
    const ce_15 = ceiling_box(ce_w,ce_h,scene);
    ce_15.position = new BABYLON.Vector3(-15*ce_w/2,w_h,+9*ce_h/2);
    const ce_16 = ceiling_box(ce_w,ce_h,scene);
    ce_16.position = new BABYLON.Vector3(-15*ce_w/2,w_h,-9*ce_h/2);


    const ce_17 = ceiling_box(ce_w,ce_h,scene);
    ce_17.position = new BABYLON.Vector3(15*ce_w/2,w_h,-3*ce_h/2);
    const ce_18 = ceiling_box(ce_w,ce_h,scene);
    ce_18.position = new BABYLON.Vector3(15*ce_w/2,w_h,+3*ce_h/2);
    const ce_19 = ceiling_box(ce_w,ce_h,scene);
    ce_19.position = new BABYLON.Vector3(15*ce_w/2,w_h,+9*ce_h/2);
    const ce_20 = ceiling_box(ce_w,ce_h,scene);
    ce_20.position = new BABYLON.Vector3(15*ce_w/2,w_h,-9*ce_h/2);

    const ce_21 = ceiling_box(ce_w,ce_h,scene);
    ce_21.position = new BABYLON.Vector3(3*ce_w/2,w_h,9*ce_h/2);
    const ce_22 = ceiling_box(ce_w,ce_h,scene);
    ce_22.position = new BABYLON.Vector3(-3*ce_w/2,w_h,-9*ce_h/2);
    const ce_23 = ceiling_box(ce_w,ce_h,scene);
    ce_23.position = new BABYLON.Vector3(-3*ce_w/2,w_h,9*ce_h/2);
    const ce_24 = ceiling_box(ce_w,ce_h,scene);
    ce_24.position = new BABYLON.Vector3(3*ce_w/2,w_h,-9*ce_h/2);
}

const build3gosh = (w,h,d) =>{
    var kaf0 = BABYLON.MeshBuilder.CreateBox("box", { width:d,height:0.5,depth:d});
    kaf0.position =new BABYLON.Vector3(d/2,0.5,d/2)
    var kaf1 = BABYLON.MeshBuilder.CreateBox("box", { width:w,height:0.5,depth:d});
    kaf1.position =new BABYLON.Vector3(-w/2,0.5,d/2)
    var kaf2 = BABYLON.MeshBuilder.CreateBox("box", { width:h,height:0.5,depth:d});
    kaf2.position =new BABYLON.Vector3(d/2,0.5,-h/2);
    kaf2.rotation =new BABYLON.Vector3(0,Math.PI/2,0);
    return BABYLON.Mesh.MergeMeshes(
        [kaf0,kaf1,kaf2]
        , true, false, null, false, true);
}

function showWorldAxis(size,scene) {
    var makeTextPlane = function(text, color, size) {
        var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
        dynamicTexture.hasAlpha = true;
        dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color , "transparent", true);
        var plane = BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
        plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
        plane.material.backFaceCulling = false;
        plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
        plane.material.diffuseTexture = dynamicTexture;
    return plane;
     };
    var axisX = BABYLON.Mesh.CreateLines("axisX", [ 
      BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0), 
      new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
      ], scene);
    axisX.color = new BABYLON.Color3(1, 0, 0);
    var xChar = makeTextPlane("X", "red", size / 10);
    xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);
    var axisY = BABYLON.Mesh.CreateLines("axisY", [
        BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( -0.05 * size, size * 0.95, 0), 
        new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( 0.05 * size, size * 0.95, 0)
        ], scene);
    axisY.color = new BABYLON.Color3(0, 1, 0);
    var yChar = makeTextPlane("Y", "green", size / 10);
    yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
    var axisZ = BABYLON.Mesh.CreateLines("axisZ", [
        BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0 , -0.05 * size, size * 0.95),
        new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0, 0.05 * size, size * 0.95)
        ], scene);
    axisZ.color = new BABYLON.Color3(0, 0, 1);
    var zChar = makeTextPlane("Z", "blue", size / 10);
    zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
}

const BuildBooth_gosh = (w,h,d,scene,color) =>{


    const gray = new BABYLON.StandardMaterial("boxMat");
    gray.diffuseColor = new BABYLON.Color3(236/255, 240/255, 241/255);


    const kaf = build3gosh(w,h,d);

    const sar_0 = build3gosh(w-.5,h-.5,d-.5);
    sar_0.position = new BABYLON.Vector3(0,7.5,0);
    const sar_1 = build3gosh(w-1,h-1,d-1);
    sar_1.scaling = new BABYLON.Vector3(1,3,1);
    sar_1.position = new BABYLON.Vector3(0,7.5,0);
    sar_1.material = color;
    const sar_2 = build3gosh(w-.5,h-.5,d-.5);
    sar_2.position = new BABYLON.Vector3(0,9.5,0);



    return BABYLON.Mesh.MergeMeshes(
        [kaf,sar_2,sar_1,sar_0]
        , true, false, null, false, true);
}


  



const build_bro = (w,h,link,color,scene) =>{

    const bro = BABYLON.MeshBuilder.CreateBox("box", {});
    bro.scaling = new BABYLON.Vector3(3,2,0.1);
    bro.position= new BABYLON.Vector3(0,8,0);
    bro.material = color;
    bro.actionManager = new BABYLON.ActionManager(scene);
	bro.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPickUpTrigger, 
            function () {
		        alert("this");
	        }
        )
    );
    return BABYLON.Mesh.MergeMeshes(
        [bro]
        , true, false, null, false, true);
}















































const BuildBooth_1 = (w,h,scene,color) =>{


    const gray = new BABYLON.StandardMaterial("boxMat");
    gray.diffuseColor = new BABYLON.Color3(236/255, 240/255, 241/255);


    
    var kaf = BABYLON.MeshBuilder.CreateBox("box", { width:w,height:0.5,depth:h}, scene);
    kaf.position.y = 0.5;
    kaf.material = gray;


    var w1 = BABYLON.MeshBuilder.CreateBox("box",  { width:0.1,height:10,depth:h}, scene);
    w1.position.x = w/2;
    w1.position.y = 5;


    var w2 = BABYLON.MeshBuilder.CreateBox("box", { width:0.1,height:10,depth:h}, scene);
    w2.position.x = -w/2;
    w2.position.y = 5;



    const backMat = new BABYLON.StandardMaterial("boxMat");
    backMat.diffuseTexture = new BABYLON.Texture("img/b1/back.jpg");
    var back = BABYLON.MeshBuilder.CreateBox("box",  { width:w,height:10,depth:.1}, scene);
    back.position.z = h/2-1;
    back.position.y = 5;
    back.material = backMat;


    //desk1
    const logo = new BABYLON.StandardMaterial("boxMat");
    logo.diffuseTexture = new BABYLON.Texture("img/b1/logo.jpg");

    const desk1= BuildDesk_2(3,3,scene,color,logo);
    desk1.translate(new BABYLON.Vector3(-w/2+3,0,-h/2+1), 1, BABYLON.Space.WORLD);

    const desk2= BuildDesk_2(8,3,scene,color,logo);
    desk2.translate(new BABYLON.Vector3(0,0,-h/2+1), 1, BABYLON.Space.WORLD);

    const desk3= BuildDesk_2(3,3,scene,color,logo);
    desk3.translate(new BABYLON.Vector3(w/2-3,0,-h/2+1), 1, BABYLON.Space.WORLD);


    var top_a= BABYLON.MeshBuilder.CreateBox("box", { width:w+1,height:0.2,depth:h+1}, scene);
    top_a.position = new BABYLON.Vector3(0,11.6,0);
    top_a.material = gray;




    const Banner = new BABYLON.StandardMaterial("boxMat");
    Banner.diffuseTexture = new BABYLON.Texture("img/b1/banner.jpg");
    var top_b= BABYLON.MeshBuilder.CreateBox("box", { width:w,height:2.5,depth:h}, scene);
    top_b.position = new BABYLON.Vector3(0,10,0);
    top_b.material = Banner;

    var top_c= BABYLON.MeshBuilder.CreateBox("box", { width:w+1,height:0.2,depth:h+1}, scene);
    top_c.position = new BABYLON.Vector3(0,8.6,0);
    top_c.material = gray;
  

    const p1 = new BABYLON.StandardMaterial("boxMat");
    p1.diffuseTexture = new BABYLON.Texture("img/b1/p1.jpg");
    const stand1 = BuildStand_1(2,2,scene,color,p1);
    stand1.translate(new BABYLON.Vector3(w/4,0,-h/2+2), 1, BABYLON.Space.WORLD);
    


    const p2 = new BABYLON.StandardMaterial("boxMat");
    p2.diffuseTexture = new BABYLON.Texture("img/b1/p2.jpg");
    const stand2 = BuildStand_1(2,2,scene,color,p2);
    stand2.translate(new BABYLON.Vector3(-w/4,0,-h/2+2), 1, BABYLON.Space.WORLD);


    return BABYLON.Mesh.MergeMeshes(
        [kaf,top_a,top_b,top_c,desk1,desk2,desk3,stand1,stand2,w1,w2,back]
        , true, false, null, false, true);
}

const BuildBooth_2 = (w,h,scene,color) =>{


    const gray = new BABYLON.StandardMaterial("boxMat");
    gray.diffuseColor = new BABYLON.Color3(236/255, 240/255, 241/255);


    // const faceUV = [];
    // for(var i=0;i<=5;i++){
    //     faceUV[i] = new BABYLON.Vector4(0.0, 0.0, 0.0, 1.0); //front face
    // }
    // faceUV[5] = new BABYLON.Vector4(0.0, 0, 1.0, 1.0);
    // const kafMat = new BABYLON.StandardMaterial("boxMat");
    // kafMat.diffuseTexture = new BABYLON.Texture("img/ar.jpeg");
    var kafMat = new BABYLON.StandardMaterial("mat", scene);
    var texture = new BABYLON.Texture("img/diamond-upholstery.png", scene);
    kafMat.diffuseTexture = texture;
    kafMat.diffuseTexture.uScale =8;
    kafMat.diffuseTexture.vScale = 8;
    var faceUV = new Array(6);
    faceUV[5] = new BABYLON.Vector4(1, 0, 0, 1);

    var kaf = BABYLON.MeshBuilder.CreateBox("box", { width:w,height:0.5,depth:h ,faceUV: faceUV, wrap: true}, scene);
    kaf.position.y = 0.5;
    kaf.material = kafMat;


    var w1 = BABYLON.MeshBuilder.CreateBox("box",  { width:0.1,height:10,depth:h}, scene);
    w1.position.x = w/2;
    w1.position.y = 5;
    w1.material = gray;


    var w2 = BABYLON.MeshBuilder.CreateBox("box", { width:0.1,height:10,depth:h}, scene);
    w2.position.x = -w/2;
    w2.position.y = 5;
    w2.material = gray;


    const backMat = new BABYLON.StandardMaterial("boxMat");
    backMat.diffuseTexture = new BABYLON.Texture("img/b2/back.jpg");
    var back = BABYLON.MeshBuilder.CreateBox("box",  { width:w,height:10,depth:.1}, scene);
    back.position.z = h/2-1;
    back.position.y = 5;
    back.material = backMat;


    //desk1
    const logo = new BABYLON.StandardMaterial("boxMat");
    logo.diffuseTexture = new BABYLON.Texture("img/b2/logo.jpg");
    const desk2= BuildDesk_2(8,3,scene,color,logo);
    desk2.translate(new BABYLON.Vector3(0,0,-h/2+1), 1, BABYLON.Space.WORLD);

    var top_a= BABYLON.MeshBuilder.CreateBox("box", { width:w+1,height:0.2,depth:h+1}, scene);
    top_a.position = new BABYLON.Vector3(0,11.6,0);
    top_a.material = gray;

    const Banner = new BABYLON.StandardMaterial("boxMat");
    Banner.diffuseTexture = new BABYLON.Texture("img/b2/banner.jpg");
    var top_b= BABYLON.MeshBuilder.CreateBox("box", { width:w,height:2.5,depth:h}, scene);
    top_b.position = new BABYLON.Vector3(0,10,0);
    top_b.material = Banner;

    var top_c= BABYLON.MeshBuilder.CreateBox("box", { width:w+1,height:0.2,depth:h+1}, scene);
    top_c.position = new BABYLON.Vector3(0,8.6,0);
    top_c.material = gray;
  

    const s1 = new BABYLON.StandardMaterial("boxMat");
    s1.diffuseTexture = new BABYLON.Texture("img/b2/s1.jpg");
    const stand1 = BuildStand_2(3,5,scene,color,s1);
    stand1.translate(new BABYLON.Vector3(w/3,0,-h/2+2), 1, BABYLON.Space.WORLD);

    const s2 = new BABYLON.StandardMaterial("boxMat");
    s2.diffuseTexture = new BABYLON.Texture("img/b2/s2.jpg");
    const stand2 = BuildStand_2(3,5,scene,color,s2);
    stand2.translate(new BABYLON.Vector3(-w/3,0,-h/2+2), 1, BABYLON.Space.WORLD);


    return BABYLON.Mesh.MergeMeshes(
        [kaf,top_a,top_b,top_c,desk2,stand1,stand2,w1,w2,back]
        , true, false, null, false, true);
}

const BuildBooth_3 = (w,h,d,scene,color) =>{


    const gray = new BABYLON.StandardMaterial("boxMat");
    gray.diffuseColor = new BABYLON.Color3(236/255, 240/255, 241/255);


    const kaf = build3gosh(w,h,d);
    kaf.material = gray;

    const sar_0 = build3gosh(w-1,h-1,d+0.5);
    sar_0.position = new BABYLON.Vector3(-0.5,8.5,-.5);
    sar_0.scaling = new BABYLON.Vector3(1,.5,1);




    const sar_1 = build3gosh(w,h,d);
    sar_1.scaling = new BABYLON.Vector3(1,5,1);
    sar_1.position = new BABYLON.Vector3(0,7.5,0);
    const Banner = new BABYLON.StandardMaterial("boxMat");
    Banner.diffuseTexture = new BABYLON.Texture("img/b3/banner.jpg");
    sar_1.material = Banner;
    
    const sar_2 = build3gosh(w-1,h-1,d+0.5);
    sar_2.position = new BABYLON.Vector3(-0.5,11.3,-.5);
    sar_2.scaling = new BABYLON.Vector3(1,.5,1);


    const logo = new BABYLON.StandardMaterial("boxMat");
    logo.diffuseTexture = new BABYLON.Texture("img/b3/logo.jpg");


    const desk1= BuildDesk_2(6,3,scene,color,logo);
    desk1.translate(new BABYLON.Vector3(-w/2,0,+1), 1, BABYLON.Space.WORLD);


    const desk2= BuildDesk_2(3,3,scene,color,logo);
    desk2.translate(new BABYLON.Vector3(1,0,-h/2), 1, BABYLON.Space.WORLD);
    desk2.rotation =  new BABYLON.Vector3(0,Math.PI/2,0);


    const p2 = new BABYLON.StandardMaterial("boxMat");
    p2.diffuseTexture = new BABYLON.Texture("img/b3/p2.jpg");
    const stand2 = BuildStand_1(2,2,scene,color,p2);
    stand2.translate(new BABYLON.Vector3(-5*w/6,0,1), 1, BABYLON.Space.WORLD);

    
    


    const p1 = new BABYLON.StandardMaterial("boxMat");
    p1.diffuseTexture = new BABYLON.Texture("img/b3/p1.jpg");
    const stand1 = BuildStand_1(2,2,scene,color,p1);
    stand1.translate(new BABYLON.Vector3(1,0,-3*h/4), 1, BABYLON.Space.WORLD);
    stand1.rotation =  new BABYLON.Vector3(0,Math.PI/2,0);


    const p4 = new BABYLON.StandardMaterial("boxMat");
    p4.diffuseTexture = new BABYLON.Texture("img/b3/p4.jpg");
    const stand4 = BuildStand_1(2,2,scene,color,p4);
    stand4.translate(new BABYLON.Vector3(1,0,-1*h/4), 1, BABYLON.Space.WORLD);
    stand4.rotation =  new BABYLON.Vector3(0,Math.PI/2,0);

    const p3 = new BABYLON.StandardMaterial("boxMat");
    p3.diffuseTexture = new BABYLON.Texture("img/b3/p3.jpg");
    const stand3 = BuildStand_1(2,2,scene,color,p3);
    stand3.translate(new BABYLON.Vector3(-1*w/6,0,1), 1, BABYLON.Space.WORLD);

    return BABYLON.Mesh.MergeMeshes(
        [kaf,sar_2,sar_1,desk1,desk2,stand1,stand3,sar_0,stand2,stand4]
        , true, false, null, false, true);
}

const BuildBooth_4 = (w,h,scene,color) =>{


    const gray = new BABYLON.StandardMaterial("boxMat");
    gray.diffuseColor = new BABYLON.Color3(236/255, 240/255, 241/255);


    
    var kaf = BABYLON.MeshBuilder.CreateBox("box", { width:w,height:0.5,depth:h}, scene);
    kaf.position.y = 0.5;
    kaf.material = gray;


    var w1 = BABYLON.MeshBuilder.CreateBox("box",  { width:0.1,height:10,depth:h}, scene);
    w1.position.x = w/2;
    w1.position.y = 5;


    var w2 = BABYLON.MeshBuilder.CreateBox("box", { width:0.1,height:10,depth:h}, scene);
    w2.position.x = -w/2;
    w2.position.y = 5;



    const backMat = new BABYLON.StandardMaterial("boxMat");
    backMat.diffuseTexture = new BABYLON.Texture("img/b4/back.jpg");
    var back = BABYLON.MeshBuilder.CreateBox("box",  { width:w,height:10,depth:.1}, scene);
    back.position.z = h/2-1;
    back.position.y = 5;
    back.material = backMat;


    //desk1
    const logo = new BABYLON.StandardMaterial("boxMat");
    logo.diffuseTexture = new BABYLON.Texture("img/b4/logo.png");

    const desk1= BuildDesk_2(3,3,scene,color,logo);
    desk1.translate(new BABYLON.Vector3(-w/2+3,0,-h/2+1), 1, BABYLON.Space.WORLD);




    var top_a= BABYLON.MeshBuilder.CreateBox("box", { width:w+1,height:0.2,depth:h+1}, scene);
    top_a.position = new BABYLON.Vector3(0,11.6,0);
    top_a.material = gray;




    const Banner = new BABYLON.StandardMaterial("boxMat");
    Banner.diffuseTexture = new BABYLON.Texture("img/b4/banner.jpg");
    var top_b= BABYLON.MeshBuilder.CreateBox("box", { width:w,height:2.5,depth:h}, scene);
    top_b.position = new BABYLON.Vector3(0,10,0);
    top_b.material = Banner;

    var top_c= BABYLON.MeshBuilder.CreateBox("box", { width:w+1,height:0.2,depth:h+1}, scene);
    top_c.position = new BABYLON.Vector3(0,8.6,0);
    top_c.material = gray;
  
    const s1 = new BABYLON.StandardMaterial("boxMat");
    s1.diffuseTexture = new BABYLON.Texture("img/b4/s1.jpg");
    const stand1 = BuildStand_2(3,5,scene,color,s1);
    stand1.translate(new BABYLON.Vector3(w/3,0,-h/2+2), 1, BABYLON.Space.WORLD);



    return BABYLON.Mesh.MergeMeshes(
        [kaf,top_a,top_b,top_c,desk1,w1,w2,back,stand1]
        , true, false, null, false, true);
}

const BuildBooth_5 = (w,h,scene,color) =>{


    const gray = new BABYLON.StandardMaterial("boxMat");
    gray.diffuseColor = new BABYLON.Color3(236/255, 240/255, 241/255);


    
    var kaf = BABYLON.MeshBuilder.CreateBox("box", { width:w,height:0.5,depth:h}, scene);
    kaf.position.y = 0.5;
    kaf.material = gray;


    var w1 = BABYLON.MeshBuilder.CreateBox("box",  { width:0.1,height:10,depth:h}, scene);
    w1.position.x = w/2;
    w1.position.y = 5;


    var w2 = BABYLON.MeshBuilder.CreateBox("box", { width:0.1,height:10,depth:h}, scene);
    w2.position.x = -w/2;
    w2.position.y = 5;



    const backMat = new BABYLON.StandardMaterial("boxMat");
    backMat.diffuseTexture = new BABYLON.Texture("img/b5/back.jpg");
    var back = BABYLON.MeshBuilder.CreateBox("box",  { width:w,height:10,depth:.1}, scene);
    back.position.z = h/2-1;
    back.position.y = 5;
    back.material = backMat;


    //desk1
    const logo = new BABYLON.StandardMaterial("boxMat");
    logo.diffuseTexture = new BABYLON.Texture("img/b5/logo.png");





    var top_a= BABYLON.MeshBuilder.CreateBox("box", { width:w+1,height:0.2,depth:h+1}, scene);
    top_a.position = new BABYLON.Vector3(0,11.6,0);
    top_a.material = gray;




    const Banner = new BABYLON.StandardMaterial("boxMat");
    Banner.diffuseTexture = new BABYLON.Texture("img/b5/banner.jpg");
    var top_b= BABYLON.MeshBuilder.CreateBox("box", { width:w,height:2.5,depth:h}, scene);
    top_b.position = new BABYLON.Vector3(0,10,0);
    top_b.material = Banner;

    var top_c= BABYLON.MeshBuilder.CreateBox("box", { width:w+1,height:0.2,depth:h+1}, scene);
    top_c.position = new BABYLON.Vector3(0,8.6,0);
    top_c.material = gray;
  
    const s1 = new BABYLON.StandardMaterial("boxMat");
    s1.diffuseTexture = new BABYLON.Texture("img/b5/s1.jpg");
    const stand1 = BuildStand_2(3,5,scene,color,s1);
    stand1.translate(new BABYLON.Vector3(w/3,0,-h/2+2), 1, BABYLON.Space.WORLD);

    const s2 = new BABYLON.StandardMaterial("boxMat");
    s2.diffuseTexture = new BABYLON.Texture("img/b5/s2.jpg");
    const stand2 = BuildStand_2(3,5,scene,color,s2);
    stand2.translate(new BABYLON.Vector3(-w/3,0,-h/2+2), 1, BABYLON.Space.WORLD);



    return BABYLON.Mesh.MergeMeshes(
        [kaf,top_a,top_b,top_c,stand2,w1,w2,back,stand1]
        , true, false, null, false, true);
}

const BuildBooth_6 = (w,h,d,scene,color) =>{


    const gray = new BABYLON.StandardMaterial("boxMat");
    gray.diffuseColor = new BABYLON.Color3(236/255, 240/255, 241/255);


    const kaf = build3gosh(w,h,d);
    kaf.material = gray;

    const sar_0 = build3gosh(w-1,h-1,d+0.5);
    sar_0.position = new BABYLON.Vector3(-0.5,8.5,-.5);
    sar_0.scaling = new BABYLON.Vector3(1,.5,1);




    const sar_1 = build3gosh(w,h,d);
    sar_1.scaling = new BABYLON.Vector3(1,5,1);
    sar_1.position = new BABYLON.Vector3(0,7.5,0);
    const Banner = new BABYLON.StandardMaterial("boxMat");
    Banner.diffuseTexture = new BABYLON.Texture("img/b6/banner.jpg");
    sar_1.material = Banner;
    
    const sar_2 = build3gosh(w-1,h-1,d+0.5);
    sar_2.position = new BABYLON.Vector3(-0.5,11.3,-.5);
    sar_2.scaling = new BABYLON.Vector3(1,.5,1);


    const logo = new BABYLON.StandardMaterial("boxMat");
    logo.diffuseTexture = new BABYLON.Texture("img/b6/logo.jpg");


    const desk1= BuildDesk_2(6,3,scene,color,logo);
    desk1.translate(new BABYLON.Vector3(-w/2,0,+1), 1, BABYLON.Space.WORLD);


    const desk2= BuildDesk_2(3,3,scene,color,logo);
    desk2.translate(new BABYLON.Vector3(1,0,-h/2), 1, BABYLON.Space.WORLD);
    desk2.rotation =  new BABYLON.Vector3(0,Math.PI/2,0);


    const p2 = new BABYLON.StandardMaterial("boxMat");
    p2.diffuseTexture = new BABYLON.Texture("img/b6/p2.jpg");
    const stand2 = BuildStand_1(2,2,scene,color,p2);
    stand2.translate(new BABYLON.Vector3(-5*w/6,0,1), 1, BABYLON.Space.WORLD);

    
    


    const p1 = new BABYLON.StandardMaterial("boxMat");
    p1.diffuseTexture = new BABYLON.Texture("img/b6/p1.jpg");
    const stand1 = BuildStand_1(2,2,scene,color,p1);
    stand1.translate(new BABYLON.Vector3(1,0,-3*h/4), 1, BABYLON.Space.WORLD);
    stand1.rotation =  new BABYLON.Vector3(0,Math.PI/2,0);


    const p4 = new BABYLON.StandardMaterial("boxMat");
    p4.diffuseTexture = new BABYLON.Texture("img/b6/p4.jpg");
    const stand4 = BuildStand_1(2,2,scene,color,p4);
    stand4.translate(new BABYLON.Vector3(1,0,-1*h/4), 1, BABYLON.Space.WORLD);
    stand4.rotation =  new BABYLON.Vector3(0,Math.PI/2,0);

    const p3 = new BABYLON.StandardMaterial("boxMat");
    p3.diffuseTexture = new BABYLON.Texture("img/b6/p3.jpg");
    const stand3 = BuildStand_1(2,2,scene,color,p3);
    stand3.translate(new BABYLON.Vector3(-1*w/6,0,1), 1, BABYLON.Space.WORLD);

    return BABYLON.Mesh.MergeMeshes(
        [kaf,sar_2,sar_1,desk1,desk2,stand1,stand3,sar_0,stand2,stand4]
        , true, false, null, false, true);
}

const BuildBooth_7 = (w,h,scene,color) =>{


    const gray = new BABYLON.StandardMaterial("boxMat");
    gray.diffuseColor = new BABYLON.Color3(236/255, 240/255, 241/255);


    
    var kaf = BABYLON.MeshBuilder.CreateBox("box", { width:w,height:0.5,depth:h}, scene);
    kaf.position.y = 0.5;
    kaf.material = gray;


    var w1 = BABYLON.MeshBuilder.CreateBox("box",  { width:0.1,height:10,depth:h}, scene);
    w1.position.x = w/2;
    w1.position.y = 5;


    var w2 = BABYLON.MeshBuilder.CreateBox("box", { width:0.1,height:10,depth:h}, scene);
    w2.position.x = -w/2;
    w2.position.y = 5;



    const backMat = new BABYLON.StandardMaterial("boxMat");
    backMat.diffuseTexture = new BABYLON.Texture("img/b7/back.jpg");
    var back = BABYLON.MeshBuilder.CreateBox("box",  { width:w,height:10,depth:.1}, scene);
    back.position.z = h/2-1;
    back.position.y = 5;
    back.material = backMat;


    //desk1
    const logo = new BABYLON.StandardMaterial("boxMat");
    logo.diffuseTexture = new BABYLON.Texture("img/b7/logo.jpg");



    const desk2= BuildDesk_2(5,3,scene,color,logo);
    desk2.translate(new BABYLON.Vector3(0,0,-h/2+1), 1, BABYLON.Space.WORLD);




    var top_a= BABYLON.MeshBuilder.CreateBox("box", { width:w+1,height:0.2,depth:h+1}, scene);
    top_a.position = new BABYLON.Vector3(0,11.6,0);
    top_a.material = gray;




    const Banner = new BABYLON.StandardMaterial("boxMat");
    Banner.diffuseTexture = new BABYLON.Texture("img/b7/banner.jpg");
    var top_b= BABYLON.MeshBuilder.CreateBox("box", { width:w,height:2.5,depth:h}, scene);
    top_b.position = new BABYLON.Vector3(0,10,0);
    top_b.material = Banner;

    var top_c= BABYLON.MeshBuilder.CreateBox("box", { width:w+1,height:0.2,depth:h+1}, scene);
    top_c.position = new BABYLON.Vector3(0,8.6,0);
    top_c.material = gray;
  

    const s1 = new BABYLON.StandardMaterial("boxMat");
    s1.diffuseTexture = new BABYLON.Texture("img/b7/s1.jpg");
    const stand1 = BuildStand_1(2,2,scene,color,s1);
    stand1.translate(new BABYLON.Vector3(5,0,-h/2+2), 1, BABYLON.Space.WORLD);
    


    const s2 = new BABYLON.StandardMaterial("boxMat");
    s2.diffuseTexture = new BABYLON.Texture("img/b7/s2.jpg");
    const stand2 = BuildStand_1(2,2,scene,color,s2);
    stand2.translate(new BABYLON.Vector3(-5,0,-h/2+2), 1, BABYLON.Space.WORLD);



    const faceUV = [];
    for(var i=0;i<=5;i++){
        faceUV[i] = new BABYLON.Vector4(0.0, 0.0, 0.0, 1.0); //front face
    }
    faceUV[1] = new BABYLON.Vector4(0.0, 0, 1.0, 1.0);
    const p1Mat = new BABYLON.StandardMaterial("boxMat");
    p1Mat.diffuseTexture = new BABYLON.Texture("img/b7/p1.jpg");
    var p1= BABYLON.MeshBuilder.CreateBox("box", { width:2,height:3,depth:2, faceUV: faceUV, wrap: true}, scene);
    p1.position = new BABYLON.Vector3(10,2.5,-h/2+2);
    p1.material = p1Mat;


    const p2Mat = new BABYLON.StandardMaterial("boxMat");
    p2Mat.diffuseTexture = new BABYLON.Texture("img/b7/p2.jpg");
    var p2= BABYLON.MeshBuilder.CreateBox("box", { width:2,height:3,depth:2, faceUV: faceUV, wrap: true}, scene);
    p2.position = new BABYLON.Vector3(15,2.5,-h/2+2);
    p2.material = p2Mat;

    const p3Mat = new BABYLON.StandardMaterial("boxMat");
    p3Mat.diffuseTexture = new BABYLON.Texture("img/b7/p3.jpg");
    var p3= BABYLON.MeshBuilder.CreateBox("box", { width:3,height:3,depth:2, faceUV: faceUV, wrap: true}, scene);
    p3.position = new BABYLON.Vector3(-10,2.5,-h/2+2);
    p3.material = p3Mat;

    const p4Mat = new BABYLON.StandardMaterial("boxMat");
    p4Mat.diffuseTexture = new BABYLON.Texture("img/b7/p4.jpg");
    var p4= BABYLON.MeshBuilder.CreateBox("box", { width:3,height:3,depth:2, faceUV: faceUV, wrap: true}, scene);
    p4.position = new BABYLON.Vector3(-15,2.5,-h/2+2);
    p4.material = p4Mat;


    return BABYLON.Mesh.MergeMeshes(
        [kaf,top_a,top_b,top_c,desk2,stand1,stand2,w1,w2,back,p1,p2,p3,p4]
        , true, false, null, false, true);
}

const BuildBooth_8 = (w,h,scene,color) =>{


    const gray = new BABYLON.StandardMaterial("boxMat");
    gray.diffuseColor = new BABYLON.Color3(236/255, 240/255, 241/255);


    
    var kaf = BABYLON.MeshBuilder.CreateBox("box", { width:w,height:0.5,depth:h}, scene);
    kaf.position.y = 0.5;
    kaf.material = gray;


    var w1 = BABYLON.MeshBuilder.CreateBox("box",  { width:0.1,height:10,depth:h}, scene);
    w1.position.x = w/2;
    w1.position.y = 5;


    var w2 = BABYLON.MeshBuilder.CreateBox("box", { width:0.1,height:10,depth:h}, scene);
    w2.position.x = -w/2;
    w2.position.y = 5;



    const backMat = new BABYLON.StandardMaterial("boxMat");
    backMat.diffuseTexture = new BABYLON.Texture("img/b8/back.jpg");
    var back = BABYLON.MeshBuilder.CreateBox("box",  { width:w,height:10,depth:.1}, scene);
    back.position.z = h/2-1;
    back.position.y = 5;
    back.material = backMat;


    //desk1
    const logo = new BABYLON.StandardMaterial("boxMat");
    logo.diffuseTexture = new BABYLON.Texture("img/b8/logo.jpg");
    const desk2= BuildDesk_2(4,3,scene,color,logo);
    desk2.translate(new BABYLON.Vector3(0,0,-h/2+1), 1, BABYLON.Space.WORLD);

    var top_a= BABYLON.MeshBuilder.CreateBox("box", { width:w+1,height:0.2,depth:h+1}, scene);
    top_a.position = new BABYLON.Vector3(0,11.6,0);
    top_a.material = gray;

    const Banner = new BABYLON.StandardMaterial("boxMat");
    Banner.diffuseTexture = new BABYLON.Texture("img/b8/banner.jpg");
    var top_b= BABYLON.MeshBuilder.CreateBox("box", { width:w,height:2.5,depth:h}, scene);
    top_b.position = new BABYLON.Vector3(0,10,0);
    top_b.material = Banner;

    var top_c= BABYLON.MeshBuilder.CreateBox("box", { width:w+1,height:0.2,depth:h+1}, scene);
    top_c.position = new BABYLON.Vector3(0,8.6,0);
    top_c.material = gray;
  


    const p1 = new BABYLON.StandardMaterial("boxMat");
    p1.diffuseTexture = new BABYLON.Texture("img/b8/p1.jpg");
    const stand1 = BuildStand_1(2,2,scene,color,p1);
    stand1.translate(new BABYLON.Vector3(-w/4,0,-h/2+1), 1, BABYLON.Space.WORLD);


    const p2 = new BABYLON.StandardMaterial("boxMat");
    p2.diffuseTexture = new BABYLON.Texture("img/b8/p2.jpg");
    const stand2 = BuildStand_1(2,2,scene,color,p2);
    stand2.translate(new BABYLON.Vector3(-w/4-4,0,-h/2+1), 1, BABYLON.Space.WORLD);


    const p3 = new BABYLON.StandardMaterial("boxMat");
    p3.diffuseTexture = new BABYLON.Texture("img/b8/p3.jpg");
    const stand3 = BuildStand_1(2,2,scene,color,p3);
    stand3.translate(new BABYLON.Vector3(w/4,0,-h/2+1), 1, BABYLON.Space.WORLD);

    const p4 = new BABYLON.StandardMaterial("boxMat");
    p4.diffuseTexture = new BABYLON.Texture("img/b8/p4.jpg");
    const stand4 = BuildStand_1(2,2,scene,color,p4);
    stand4.translate(new BABYLON.Vector3(w/4+4,0,-h/2+1), 1, BABYLON.Space.WORLD);



    return BABYLON.Mesh.MergeMeshes(
        [kaf,top_a,top_b,top_c,desk2,stand1,stand2,stand3,stand4,w1,w2,back]
        , true, false, null, false, true);
}

const BuildBooth_9 = (w,h,scene,color) =>{


    const gray = new BABYLON.StandardMaterial("boxMat");
    gray.diffuseColor = new BABYLON.Color3(236/255, 240/255, 241/255);


    
    var kaf = BABYLON.MeshBuilder.CreateBox("box", { width:w,height:0.5,depth:h}, scene);
    kaf.position.y = 0.5;
    kaf.material = gray;


    var w1 = BABYLON.MeshBuilder.CreateBox("box",  { width:0.1,height:10,depth:h}, scene);
    w1.position.x = w/2;
    w1.position.y = 5;


    var w2 = BABYLON.MeshBuilder.CreateBox("box", { width:0.1,height:10,depth:h}, scene);
    w2.position.x = -w/2;
    w2.position.y = 5;



    const backMat = new BABYLON.StandardMaterial("boxMat");
    backMat.diffuseTexture = new BABYLON.Texture("img/b9/back.jpg");
    var back = BABYLON.MeshBuilder.CreateBox("box",  { width:w,height:10,depth:.1}, scene);
    back.position.z = h/2-1;
    back.position.y = 5;
    back.material = backMat;


    //desk1
    const logo = new BABYLON.StandardMaterial("boxMat");
    logo.diffuseTexture = new BABYLON.Texture("img/b9/logo.jpg");

    const desk1= BuildDesk_2(3,3,scene,color,logo);
    desk1.translate(new BABYLON.Vector3(-w/2+3,0,-h/2+1), 1, BABYLON.Space.WORLD);

    const desk2= BuildDesk_2(8,3,scene,color,logo);
    desk2.translate(new BABYLON.Vector3(0,0,-h/2+1), 1, BABYLON.Space.WORLD);

    const desk3= BuildDesk_2(3,3,scene,color,logo);
    desk3.translate(new BABYLON.Vector3(w/2-3,0,-h/2+1), 1, BABYLON.Space.WORLD);


    var top_a= BABYLON.MeshBuilder.CreateBox("box", { width:w+1,height:0.2,depth:h+1}, scene);
    top_a.position = new BABYLON.Vector3(0,11.6,0);
    top_a.material = gray;




    const Banner = new BABYLON.StandardMaterial("boxMat");
    Banner.diffuseTexture = new BABYLON.Texture("img/b9/banner.jpg");
    var top_b= BABYLON.MeshBuilder.CreateBox("box", { width:w,height:2.5,depth:h}, scene);
    top_b.position = new BABYLON.Vector3(0,10,0);
    top_b.material = Banner;

    var top_c= BABYLON.MeshBuilder.CreateBox("box", { width:w+1,height:0.2,depth:h+1}, scene);
    top_c.position = new BABYLON.Vector3(0,8.6,0);
    top_c.material = gray;
  

    const p1 = new BABYLON.StandardMaterial("boxMat");
    p1.diffuseTexture = new BABYLON.Texture("img/b9/p1.jpg");
    const stand1 = BuildStand_1(2,2,scene,color,p1);
    stand1.translate(new BABYLON.Vector3(w/4,0,-h/2+2), 1, BABYLON.Space.WORLD);
    


    const p2 = new BABYLON.StandardMaterial("boxMat");
    p2.diffuseTexture = new BABYLON.Texture("img/b9/p2.jpg");
    const stand2 = BuildStand_1(2,2,scene,color,p2);
    stand2.translate(new BABYLON.Vector3(-w/4,0,-h/2+2), 1, BABYLON.Space.WORLD);


    return BABYLON.Mesh.MergeMeshes(
        [kaf,top_a,top_b,top_c,desk1,desk2,desk3,stand1,stand2,w1,w2,back]
        , true, false, null, false, true);
}

const BuildBooth_10 = (w,h,scene,color) =>{


    const gray = new BABYLON.StandardMaterial("boxMat");
    gray.diffuseColor = new BABYLON.Color3(236/255, 240/255, 241/255);


    
    var kaf = BABYLON.MeshBuilder.CreateBox("box", { width:w,height:0.5,depth:h}, scene);
    kaf.position.y = 0.5;
    kaf.material = gray;


    var w1 = BABYLON.MeshBuilder.CreateBox("box",  { width:0.1,height:10,depth:h}, scene);
    w1.position.x = w/2;
    w1.position.y = 5;


    var w2 = BABYLON.MeshBuilder.CreateBox("box", { width:0.1,height:10,depth:h}, scene);
    w2.position.x = -w/2;
    w2.position.y = 5;



    const backMat = new BABYLON.StandardMaterial("boxMat");
    backMat.diffuseTexture = new BABYLON.Texture("img/b10/back.jpg");
    var back = BABYLON.MeshBuilder.CreateBox("box",  { width:w,height:10,depth:.1}, scene);
    back.position.z = h/2-1;
    back.position.y = 5;
    back.material = backMat;


    //desk1
    const logo = new BABYLON.StandardMaterial("boxMat");
    logo.diffuseTexture = new BABYLON.Texture("img/b10/logo.jpg");

    const desk1= BuildDesk_2(3,3,scene,color,logo);
    desk1.translate(new BABYLON.Vector3(-w/2+3,0,-h/2+1), 1, BABYLON.Space.WORLD);

    const desk2= BuildDesk_2(8,3,scene,color,logo);
    desk2.translate(new BABYLON.Vector3(0,0,-h/2+1), 1, BABYLON.Space.WORLD);

    const desk3= BuildDesk_2(3,3,scene,color,logo);
    desk3.translate(new BABYLON.Vector3(w/2-3,0,-h/2+1), 1, BABYLON.Space.WORLD);


    var top_a= BABYLON.MeshBuilder.CreateBox("box", { width:w+1,height:0.2,depth:h+1}, scene);
    top_a.position = new BABYLON.Vector3(0,11.6,0);
    top_a.material = gray;




    const Banner = new BABYLON.StandardMaterial("boxMat");
    Banner.diffuseTexture = new BABYLON.Texture("img/b10/banner.jpg");
    var top_b= BABYLON.MeshBuilder.CreateBox("box", { width:w,height:2.5,depth:h}, scene);
    top_b.position = new BABYLON.Vector3(0,10,0);
    top_b.material = Banner;

    var top_c= BABYLON.MeshBuilder.CreateBox("box", { width:w+1,height:0.2,depth:h+1}, scene);
    top_c.position = new BABYLON.Vector3(0,8.6,0);
    top_c.material = gray;
  

    const p1 = new BABYLON.StandardMaterial("boxMat");
    p1.diffuseTexture = new BABYLON.Texture("img/b10/p1.jpg");
    const stand1 = BuildStand_1(2,2,scene,color,p1);
    stand1.translate(new BABYLON.Vector3(w/4,0,-h/2+2), 1, BABYLON.Space.WORLD);
    


    const p2 = new BABYLON.StandardMaterial("boxMat");
    p2.diffuseTexture = new BABYLON.Texture("img/b10/p2.jpg");
    const stand2 = BuildStand_1(2,2,scene,color,p2);
    stand2.translate(new BABYLON.Vector3(-w/4,0,-h/2+2), 1, BABYLON.Space.WORLD);


    return BABYLON.Mesh.MergeMeshes(
        [kaf,top_a,top_b,top_c,desk1,desk2,desk3,stand1,stand2,w1,w2,back]
        , true, false, null, false, true);
}

const BuildBooth_11 = (w,h,d,scene,color) =>{


    const gray = new BABYLON.StandardMaterial("boxMat");
    gray.diffuseColor = new BABYLON.Color3(236/255, 240/255, 241/255);


    const kaf = build3gosh(w,h,d);
    kaf.material = gray;

    const sar_0 = build3gosh(w-1,h-1,d+0.5);
    sar_0.position = new BABYLON.Vector3(-0.5,8.5,-.5);
    sar_0.scaling = new BABYLON.Vector3(1,.5,1);




    const sar_1 = build3gosh(w,h,d);
    sar_1.scaling = new BABYLON.Vector3(1,5,1);
    sar_1.position = new BABYLON.Vector3(0,7.5,0);
    const Banner = new BABYLON.StandardMaterial("boxMat");
    Banner.diffuseTexture = new BABYLON.Texture("img/b11/banner.jpg");
    sar_1.material = Banner;
    
    const sar_2 = build3gosh(w-1,h-1,d+0.5);
    sar_2.position = new BABYLON.Vector3(-0.5,11.3,-.5);
    sar_2.scaling = new BABYLON.Vector3(1,.5,1);


    const logo = new BABYLON.StandardMaterial("boxMat");
    logo.diffuseTexture = new BABYLON.Texture("img/b11/logo.jpg");


    const desk1= BuildDesk_2(6,3,scene,color,logo);
    desk1.translate(new BABYLON.Vector3(-w/2,0,+1), 1, BABYLON.Space.WORLD);


    const desk2= BuildDesk_2(3,3,scene,color,logo);
    desk2.translate(new BABYLON.Vector3(1,0,-h/2), 1, BABYLON.Space.WORLD);
    desk2.rotation =  new BABYLON.Vector3(0,Math.PI/2,0);


    const p2 = new BABYLON.StandardMaterial("boxMat");
    p2.diffuseTexture = new BABYLON.Texture("img/b11/p2.jpg");
    const stand2 = BuildStand_1(2,2,scene,color,p2);
    stand2.translate(new BABYLON.Vector3(-5*w/6,0,1), 1, BABYLON.Space.WORLD);

    
    


    const p1 = new BABYLON.StandardMaterial("boxMat");
    p1.diffuseTexture = new BABYLON.Texture("img/b11/p1.jpg");
    const stand1 = BuildStand_1(2,2,scene,color,p1);
    stand1.translate(new BABYLON.Vector3(1,0,-3*h/4), 1, BABYLON.Space.WORLD);
    stand1.rotation =  new BABYLON.Vector3(0,Math.PI/2,0);


    const p4 = new BABYLON.StandardMaterial("boxMat");
    p4.diffuseTexture = new BABYLON.Texture("img/b11/p4.jpg");
    const stand4 = BuildStand_1(2,2,scene,color,p4);
    stand4.translate(new BABYLON.Vector3(1,0,-1*h/4), 1, BABYLON.Space.WORLD);
    stand4.rotation =  new BABYLON.Vector3(0,Math.PI/2,0);

    const p3 = new BABYLON.StandardMaterial("boxMat");
    p3.diffuseTexture = new BABYLON.Texture("img/b11/p3.jpg");
    const stand3 = BuildStand_1(2,2,scene,color,p3);
    stand3.translate(new BABYLON.Vector3(-1*w/6,0,1), 1, BABYLON.Space.WORLD);

    return BABYLON.Mesh.MergeMeshes(
        [kaf,sar_2,sar_1,desk1,desk2,stand1,stand3,sar_0,stand2,stand4]
        , true, false, null, false, true);
}

const BuildBooth_12 = (w,h,scene,color) =>{


    const gray = new BABYLON.StandardMaterial("boxMat");
    gray.diffuseColor = new BABYLON.Color3(236/255, 240/255, 241/255);


    
    var kaf = BABYLON.MeshBuilder.CreateBox("box", { width:w,height:0.5,depth:h}, scene);
    kaf.position.y = 0.5;
    kaf.material = gray;


    var w1 = BABYLON.MeshBuilder.CreateBox("box",  { width:0.1,height:10,depth:h}, scene);
    w1.position.x = w/2;
    w1.position.y = 5;


    var w2 = BABYLON.MeshBuilder.CreateBox("box", { width:0.1,height:10,depth:h}, scene);
    w2.position.x = -w/2;
    w2.position.y = 5;



    const backMat = new BABYLON.StandardMaterial("boxMat");
    backMat.diffuseTexture = new BABYLON.Texture("img/b12/back.jpg");
    var back = BABYLON.MeshBuilder.CreateBox("box",  { width:w,height:10,depth:.1}, scene);
    back.position.z = h/2-1;
    back.position.y = 5;
    back.material = backMat;


    //desk1
    const logo = new BABYLON.StandardMaterial("boxMat");
    logo.diffuseTexture = new BABYLON.Texture("img/b12/logo.png");





    var top_a= BABYLON.MeshBuilder.CreateBox("box", { width:w+1,height:0.2,depth:h+1}, scene);
    top_a.position = new BABYLON.Vector3(0,11.6,0);
    top_a.material = gray;




    const Banner = new BABYLON.StandardMaterial("boxMat");
    Banner.diffuseTexture = new BABYLON.Texture("img/b12/banner.jpg");
    var top_b= BABYLON.MeshBuilder.CreateBox("box", { width:w,height:2.5,depth:h}, scene);
    top_b.position = new BABYLON.Vector3(0,10,0);
    top_b.material = Banner;

    var top_c= BABYLON.MeshBuilder.CreateBox("box", { width:w+1,height:0.2,depth:h+1}, scene);
    top_c.position = new BABYLON.Vector3(0,8.6,0);
    top_c.material = gray;
  
    const s1 = new BABYLON.StandardMaterial("boxMat");
    s1.diffuseTexture = new BABYLON.Texture("img/b12/s1.jpg");
    const stand1 = BuildStand_2(3,5,scene,color,s1);
    stand1.translate(new BABYLON.Vector3(w/3,0,-h/2+2), 1, BABYLON.Space.WORLD);

    const s2 = new BABYLON.StandardMaterial("boxMat");
    s2.diffuseTexture = new BABYLON.Texture("img/b12/s2.jpg");
    const stand2 = BuildStand_2(3,5,scene,color,s2);
    stand2.translate(new BABYLON.Vector3(-w/3,0,-h/2+2), 1, BABYLON.Space.WORLD);



    return BABYLON.Mesh.MergeMeshes(
        [kaf,top_a,top_b,top_c,stand2,w1,w2,back,stand1]
        , true, false, null, false, true);
}

const BuildBooth_13 = (w,h,scene,color) =>{


    const gray = new BABYLON.StandardMaterial("boxMat");
    gray.diffuseColor = new BABYLON.Color3(236/255, 240/255, 241/255);


    
    var kaf = BABYLON.MeshBuilder.CreateBox("box", { width:w,height:0.5,depth:h}, scene);
    kaf.position.y = 0.5;
    kaf.material = gray;


    var w1 = BABYLON.MeshBuilder.CreateBox("box",  { width:0.1,height:10,depth:h}, scene);
    w1.position.x = w/2;
    w1.position.y = 5;


    var w2 = BABYLON.MeshBuilder.CreateBox("box", { width:0.1,height:10,depth:h}, scene);
    w2.position.x = -w/2;
    w2.position.y = 5;



    const backMat = new BABYLON.StandardMaterial("boxMat");
    backMat.diffuseTexture = new BABYLON.Texture("img/b13/back.jpg");
    var back = BABYLON.MeshBuilder.CreateBox("box",  { width:w,height:8.5,depth:.1}, scene);
    back.position.z = h/2-1;
    back.position.y = 4.5;
    back.material = backMat;


    //desk1
    const logo = new BABYLON.StandardMaterial("boxMat");
    logo.diffuseTexture = new BABYLON.Texture("img/b13/logo.png");


    const desk1= BuildDesk_2(3,3,scene,color,logo);
    desk1.translate(new BABYLON.Vector3(-w/2+3,0,-h/2+1), 1, BABYLON.Space.WORLD);


    var top_a= BABYLON.MeshBuilder.CreateBox("box", { width:w+1,height:0.2,depth:h+1}, scene);
    top_a.position = new BABYLON.Vector3(0,11.6,0);
    top_a.material = gray;




    const Banner = new BABYLON.StandardMaterial("boxMat");
    Banner.diffuseTexture = new BABYLON.Texture("img/b13/banner.jpg");
    var top_b= BABYLON.MeshBuilder.CreateBox("box", { width:w,height:2.5,depth:h}, scene);
    top_b.position = new BABYLON.Vector3(0,10,0);
    top_b.material = Banner;

    var top_c= BABYLON.MeshBuilder.CreateBox("box", { width:w+1,height:0.2,depth:h+1}, scene);
    top_c.position = new BABYLON.Vector3(0,8.6,0);
    top_c.material = gray;
  
    const s1 = new BABYLON.StandardMaterial("boxMat");
    s1.diffuseTexture = new BABYLON.Texture("img/b13/s1.jpg");
    const stand1 = BuildStand_2(3,5,scene,color,s1);
    stand1.translate(new BABYLON.Vector3(w/3,0,-h/2+2), 1, BABYLON.Space.WORLD);




    return BABYLON.Mesh.MergeMeshes(
        [kaf,top_a,top_b,top_c,w1,w2,back,stand1,desk1]
        , true, false, null, false, true);
}

const BuildBooth_14 = (w,h,d,scene,color) =>{


    const gray = new BABYLON.StandardMaterial("boxMat");
    gray.diffuseColor = new BABYLON.Color3(236/255, 240/255, 241/255);


    const kaf = build3gosh(w,h,d);
    kaf.material = gray;

    const sar_0 = build3gosh(w-1,h-1,d+0.5);
    sar_0.position = new BABYLON.Vector3(-0.5,8.5,-.5);
    sar_0.scaling = new BABYLON.Vector3(1,.5,1);




    const sar_1 = build3gosh(w,h,d);
    sar_1.scaling = new BABYLON.Vector3(1,5,1);
    sar_1.position = new BABYLON.Vector3(0,7.5,0);
    const Banner = new BABYLON.StandardMaterial("boxMat");
    Banner.diffuseTexture = new BABYLON.Texture("img/b14/banner.jpg");
    sar_1.material = Banner;
    
    const sar_2 = build3gosh(w-1,h-1,d+0.5);
    sar_2.position = new BABYLON.Vector3(-0.5,11.3,-.5);
    sar_2.scaling = new BABYLON.Vector3(1,.5,1);


    const logo = new BABYLON.StandardMaterial("boxMat");
    logo.diffuseTexture = new BABYLON.Texture("img/b14/logo.jpg");


    const desk1= BuildDesk_2(6,3,scene,color,logo);
    desk1.translate(new BABYLON.Vector3(-w/2,0,+1), 1, BABYLON.Space.WORLD);


    const desk2= BuildDesk_2(3,3,scene,color,logo);
    desk2.translate(new BABYLON.Vector3(1,0,-h/2), 1, BABYLON.Space.WORLD);
    desk2.rotation =  new BABYLON.Vector3(0,Math.PI/2,0);


    const p2 = new BABYLON.StandardMaterial("boxMat");
    p2.diffuseTexture = new BABYLON.Texture("img/b14/p2.jpg");
    const stand2 = BuildStand_1(2,2,scene,color,p2);
    stand2.translate(new BABYLON.Vector3(-5*w/6,0,1), 1, BABYLON.Space.WORLD);

    
    


    const p1 = new BABYLON.StandardMaterial("boxMat");
    p1.diffuseTexture = new BABYLON.Texture("img/b14/p1.jpg");
    const stand1 = BuildStand_1(2,2,scene,color,p1);
    stand1.translate(new BABYLON.Vector3(1,0,-3*h/4), 1, BABYLON.Space.WORLD);
    stand1.rotation =  new BABYLON.Vector3(0,Math.PI/2,0);


    const p4 = new BABYLON.StandardMaterial("boxMat");
    p4.diffuseTexture = new BABYLON.Texture("img/b14/p4.jpg");
    const stand4 = BuildStand_1(2,2,scene,color,p4);
    stand4.translate(new BABYLON.Vector3(1,0,-1*h/4), 1, BABYLON.Space.WORLD);
    stand4.rotation =  new BABYLON.Vector3(0,Math.PI/2,0);

    const p3 = new BABYLON.StandardMaterial("boxMat");
    p3.diffuseTexture = new BABYLON.Texture("img/b14/p3.jpg");
    const stand3 = BuildStand_1(2,2,scene,color,p3);
    stand3.translate(new BABYLON.Vector3(-1*w/6,0,1), 1, BABYLON.Space.WORLD);

    return BABYLON.Mesh.MergeMeshes(
        [kaf,sar_2,sar_1,desk1,desk2,stand1,stand3,sar_0,stand2,stand4]
        , true, false, null, false, true);
}

const BuildBooth_15 = (w,h,scene,color) =>{


    const gray = new BABYLON.StandardMaterial("boxMat");
    gray.diffuseColor = new BABYLON.Color3(236/255, 240/255, 241/255);


    
    var kaf = BABYLON.MeshBuilder.CreateBox("box", { width:w,height:0.5,depth:h}, scene);
    kaf.position.y = 0.5;
    kaf.material = gray;


    var w1 = BABYLON.MeshBuilder.CreateBox("box",  { width:0.1,height:10,depth:h}, scene);
    w1.position.x = w/2;
    w1.position.y = 5;


    var w2 = BABYLON.MeshBuilder.CreateBox("box", { width:0.1,height:10,depth:h}, scene);
    w2.position.x = -w/2;
    w2.position.y = 5;



    const backMat = new BABYLON.StandardMaterial("boxMat");
    backMat.diffuseTexture = new BABYLON.Texture("img/b15/back.jpg");
    var back = BABYLON.MeshBuilder.CreateBox("box",  { width:w,height:10,depth:.1}, scene);
    back.position.z = h/2-1;
    back.position.y = 5;
    back.material = backMat;


    //desk1
    const logo = new BABYLON.StandardMaterial("boxMat");
    logo.diffuseTexture = new BABYLON.Texture("img/b15/logo.jpg");



    const desk2= BuildDesk_2(5,3,scene,color,logo);
    desk2.translate(new BABYLON.Vector3(0,0,-h/2+1), 1, BABYLON.Space.WORLD);




    var top_a= BABYLON.MeshBuilder.CreateBox("box", { width:w+1,height:0.2,depth:h+1}, scene);
    top_a.position = new BABYLON.Vector3(0,11.6,0);
    top_a.material = gray;




    const Banner = new BABYLON.StandardMaterial("boxMat");
    Banner.diffuseTexture = new BABYLON.Texture("img/b15/banner.jpg");
    var top_b= BABYLON.MeshBuilder.CreateBox("box", { width:w,height:2.5,depth:h}, scene);
    top_b.position = new BABYLON.Vector3(0,10,0);
    top_b.material = Banner;

    var top_c= BABYLON.MeshBuilder.CreateBox("box", { width:w+1,height:0.2,depth:h+1}, scene);
    top_c.position = new BABYLON.Vector3(0,8.6,0);
    top_c.material = gray;
  

    const s1 = new BABYLON.StandardMaterial("boxMat");
    s1.diffuseTexture = new BABYLON.Texture("img/b15/s1.jpg");
    const stand1 = BuildStand_1(2,2,scene,color,s1);
    stand1.translate(new BABYLON.Vector3(5,0,-h/2+2), 1, BABYLON.Space.WORLD);
    


    const s2 = new BABYLON.StandardMaterial("boxMat");
    s2.diffuseTexture = new BABYLON.Texture("img/b15/s2.jpg");
    const stand2 = BuildStand_1(2,2,scene,color,s2);
    stand2.translate(new BABYLON.Vector3(-5,0,-h/2+2), 1, BABYLON.Space.WORLD);



    const faceUV = [];
    for(var i=0;i<=5;i++){
        faceUV[i] = new BABYLON.Vector4(0.0, 0.0, 0.0, 1.0); //front face
    }
    faceUV[1] = new BABYLON.Vector4(0.0, 0, 1.0, 1.0);
    const p1Mat = new BABYLON.StandardMaterial("boxMat");
    p1Mat.diffuseTexture = new BABYLON.Texture("img/b15/p1.jpg");
    var p1= BABYLON.MeshBuilder.CreateBox("box", { width:2,height:3,depth:2, faceUV: faceUV, wrap: true}, scene);
    p1.position = new BABYLON.Vector3(10,2.5,-h/2+2);
    p1.material = p1Mat;


    const p2Mat = new BABYLON.StandardMaterial("boxMat");
    p2Mat.diffuseTexture = new BABYLON.Texture("img/b15/p2.jpg");
    var p2= BABYLON.MeshBuilder.CreateBox("box", { width:2,height:3,depth:2, faceUV: faceUV, wrap: true}, scene);
    p2.position = new BABYLON.Vector3(15,2.5,-h/2+2);
    p2.material = p2Mat;

    const p3Mat = new BABYLON.StandardMaterial("boxMat");
    p3Mat.diffuseTexture = new BABYLON.Texture("img/b15/p3.jpg");
    var p3= BABYLON.MeshBuilder.CreateBox("box", { width:3,height:3,depth:2, faceUV: faceUV, wrap: true}, scene);
    p3.position = new BABYLON.Vector3(-10,2.5,-h/2+2);
    p3.material = p3Mat;

    const p4Mat = new BABYLON.StandardMaterial("boxMat");
    p4Mat.diffuseTexture = new BABYLON.Texture("img/b15/p4.jpg");
    var p4= BABYLON.MeshBuilder.CreateBox("box", { width:3,height:3,depth:2, faceUV: faceUV, wrap: true}, scene);
    p4.position = new BABYLON.Vector3(-15,2.5,-h/2+2);
    p4.material = p4Mat;


    return BABYLON.Mesh.MergeMeshes(
        [kaf,top_a,top_b,top_c,desk2,stand1,stand2,w1,w2,back,p1,p2,p3,p4]
        , true, false, null, false, true);
}

const BuildBooth_16 = (w,h,scene,color) =>{


    const gray = new BABYLON.StandardMaterial("boxMat");
    gray.diffuseColor = new BABYLON.Color3(236/255, 240/255, 241/255);


    
    var kaf = BABYLON.MeshBuilder.CreateBox("box", { width:w,height:0.5,depth:h}, scene);
    kaf.position.y = 0.5;
    kaf.material = gray;


    var w1 = BABYLON.MeshBuilder.CreateBox("box",  { width:0.1,height:10,depth:h}, scene);
    w1.position.x = w/2;
    w1.position.y = 5;


    var w2 = BABYLON.MeshBuilder.CreateBox("box", { width:0.1,height:10,depth:h}, scene);
    w2.position.x = -w/2;
    w2.position.y = 5;



    const backMat = new BABYLON.StandardMaterial("boxMat");
    backMat.diffuseTexture = new BABYLON.Texture("img/b16/back.jpg");
    var back = BABYLON.MeshBuilder.CreateBox("box",  { width:w,height:10,depth:.1}, scene);
    back.position.z = h/2-1;
    back.position.y = 5;
    back.material = backMat;


    //desk1
    const logo = new BABYLON.StandardMaterial("boxMat");
    logo.diffuseTexture = new BABYLON.Texture("img/b16/logo.png");
    const desk2= BuildDesk_2(8,3,scene,color,logo);
    desk2.translate(new BABYLON.Vector3(0,0,-h/2+1), 1, BABYLON.Space.WORLD);

    var top_a= BABYLON.MeshBuilder.CreateBox("box", { width:w+1,height:0.2,depth:h+1}, scene);
    top_a.position = new BABYLON.Vector3(0,11.6,0);
    top_a.material = gray;

    const Banner = new BABYLON.StandardMaterial("boxMat");
    Banner.diffuseTexture = new BABYLON.Texture("img/b16/banner.jpg");
    var top_b= BABYLON.MeshBuilder.CreateBox("box", { width:w,height:2.5,depth:h}, scene);
    top_b.position = new BABYLON.Vector3(0,10,0);
    top_b.material = Banner;

    var top_c= BABYLON.MeshBuilder.CreateBox("box", { width:w+1,height:0.2,depth:h+1}, scene);
    top_c.position = new BABYLON.Vector3(0,8.6,0);
    top_c.material = gray;
  

    const s1 = new BABYLON.StandardMaterial("boxMat");
    s1.diffuseTexture = new BABYLON.Texture("img/b16/s1.jpg");
    const stand1 = BuildStand_2(3,5,scene,color,s1);
    stand1.translate(new BABYLON.Vector3(w/3,0,-h/2+2), 1, BABYLON.Space.WORLD);

    const s2 = new BABYLON.StandardMaterial("boxMat");
    s2.diffuseTexture = new BABYLON.Texture("img/b16/s2.jpg");
    const stand2 = BuildStand_2(3,5,scene,color,s2);
    stand2.translate(new BABYLON.Vector3(-w/3,0,-h/2+2), 1, BABYLON.Space.WORLD);



    //const bro = build_bro(1,1,'b16',color,scene);
        

    return BABYLON.Mesh.MergeMeshes(
        [kaf,top_a,top_b,top_c,desk2,stand1,stand2,w1,w2,back]
        , true, false, null, false, true);
}























