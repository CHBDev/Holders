var HHg = {

  returnNTestedObjects:function(arr, test, n){
    n ? n : n = arr.length;
    var returnArr = [];
    var count = 0;
      for(var i = 0; i < arr.length; i++){
        test(arr[i]) ? returnArr.push(arr[i]): false ;
        if(count >= n){
          break;
        }
      }

    return returnArr;
  },
  hashCounter: 0,

  returnRandomHash: function(optional){
    if(optional === undefined){
      optional = "" + HHg.hashCounter;
      HHg.hashCounter++;
    }else{
      optional = "" + optional + "_";
    }
    return optional + ( +new Date() ) + "_" + HHg.returnRandomInt(100,999) + "_" + HHg.returnRandomInt(100,999) + "_" + HHg.returnRandomInt(100,999) + "r";
  },

  returnRandomFloatLowIncHighExcl : function(lowInc, highExcl){
    return Math.random() * (highExcl - lowInc) + lowInc;
  },

  returnRandomInt : function(lowInc, highExcl){
  return Math.floor(Math.random() * (highExcl - lowInc) + lowInc);

  },

  doRemoveThingFromArray: function(arr,thing){
  for(var i = 0; i < arr.length; i++){
    if(arr[i] === thing){
      arr.splice(i,1);
      return true;
    }
  }
  return false;
  },

  doForEach: function(arr, func){
    for(var i = 0; i < arr.length; i++){
      func(arr[i]);
    }
  },

  doDegreesToRads: function(degrees){
    return degrees*Math.PI/180;
  },

  returnPositionProps: function(props){

    if(props === undefined) return undefined;


    if(props instanceof HHgVector2){
      return props;
    }

    if(!isNaN(props)){
      return new HHgVector2(props,props);
    }

    if(props.x !== undefined){
      return new HHgVector2(props.x, props.y);
    }

    if(props.X  !== undefined){
      return new HHgVector2(props.X, props.Y);
    }

    if(props.positionX  !== undefined){
      return new HHgVector2(props.positionX, props.positionY);
    }

    var check;
    if(props.position !== undefined){
      check = HHg.returnPositionProps(props.position);
      if(check !== undefined) return check;
    }

    if(props.positionXY !== undefined){
      check = HHg.returnPositionProps(props.positionXY);
      if(check !== undefined) return check;
    }

    return new HHgVector2(0,0);

  },

  returnZIndexProps: function(props){

    if(props === undefined) return undefined;


    if(!isNaN(props) ){
      return props;
    }

    if(props.zIndex !== undefined){
      return props.zIndex;
    }

    if(props.ZIndex !== undefined){
      return props.ZIndex;
    }

    if(props.z !== undefined){
      return props.z;
    }

    if(props.Z !== undefined){
      return props.Z;
    }

    return undefined;
  },

  returnSizeProps: function(props){

    if(props === undefined) return undefined;


    if(props instanceof HHgVector2){
      return props;
    }

    if(props.w !== undefined){
      return new HHgVector2(props.w, props.h);
    }

    if(props.W !== undefined){
      return new HHgVector2(props.W, props.H);
    }

    if(props.width !== undefined){
      return new HHgVector2(props.width, props.height);
    }

    var check;
    if(props.size !== undefined){
      check = HHg.returnSizeProps(props.size);
      if(check !== undefined) return check;
    }
      if(props.sizeXY !== undefined){
      check = HHg.returnSizeProps(props.sizeXY);
      if(check !== undefined) return check;
    }

    return undefined;

  },

  returnScaleProps: function(props){

    if(props === undefined) return undefined;


    if(props instanceof HHgVector2){
      return props;
    }

    if(!isNaN(props)){
      return new HHgVector2(props, props);
    }

    if(props.x !== undefined){
      return new HHgVector2(props.x, props.y);
    }

    if(props.X !== undefined){
      return new HHgVector2(props.X, props.Y);
    }

    if(props.scaleX !== undefined){
      return new HHgVector2(props.scaleX, props.scaleY);
    }

    var check;
    if(props.scale !== undefined){
      check = HHg.returnScaleProps(props.scale);
      if(check !== undefined) return check;
    }
    if(props.scaleXY !== undefined){
      check = HHg.returnScaleProps(props.scaleXY);
      if(check !== undefined) return check;
    }

    return undefined;

  },

  returnRotationProps: function(props){

    if(props === undefined) return undefined;


    if(!isNaN(props)){
      return props;
    }

    if(props.rotation !== undefined){
      return props.rotation;
    }

    if(props.rot !== undefined){
      return props.rot;
    }

    if(props.rotate !== undefined){
      return props.rotate;
    }

    return undefined;

  },

  returnSpeedNProps: function(props){

    if(props === undefined) return undefined;


    if(!isNaN(props)){
      return props;
    }

    if(props.speed !== undefined){
      return props.speed;
    }

    if(props.s !== undefined){
      return props.s;
    }

    return undefined;

  },

  returnSpeedXYProps: function(props){

    if(props === undefined) return undefined;


    if(!isNaN(props)){
      return new HHgVector2(props, props);
    }

    if(props instanceof HHgVector2){
      return props;
    }

        if(props.x !== undefined){
          return HHgVector2(props.x, props.y);
        }

      if(props.X  !== undefined){
        return new HHgVector2(props.X, props.Y);
      }

    var check;
    if(props.speed !== undefined){
      check = HHg.returnSpeedXYProps(props.speed);
      if(check !== undefined) return check;
    }

    if(props.speedXY !== undefined){
      check = HHg.returnSpeedXYProps(props.speedXY);
      if(check !== undefined) return check;
    }

    return undefined;
  },

  returnTimeProps: function(props){

    if(props === undefined) return undefined;


    if(!isNaN(props)){
      return props;
    }

    if(props.time !== undefined){
      return props.time;
    }

    if(props.t !== undefined){
      return props.t;
    }

    if(props.seconds !== undefined){
      return props.seconds;
    }

    return undefined;

  },

  returnEaseProps: function(props){

    if(props === undefined) return undefined;


    if(props.easeIn !== undefined){

    }else if(props.in !== undefined){
      props.easeIn = props.in;
    }

    if(props.easeOut !== undefined){

    }else if(props.out !== undefined){
      props.easeOut = props.out;
    }

    if(props.easeIn !== undefined || props.easeOut !== undefined){
      return {easeOut: props.easeOut, easeIn: props.easeIn};
    }

    if(props.ease !== undefined){
      if(!isNaN(props.ease)){
        return {easeOut: props.ease, easeIn: props.ease};
      }
    }

    return undefined;

  },

  returnOnCompleteProps: function(props){

    if(props === undefined) return undefined;


    if(props.onComplete){
      return props.onComplete;
    }

    if(props.complete){
      return props.complete;
    }

    if(props.onFinish){
      return props.onFinish;
    }

    return undefined;

  },

  returnControlPositionProps: function(props){

  if(props === undefined) return undefined;


    if(props.control instanceof HHgVector2){
      return props.control;
    }else if(props.controlXY instanceof HHgVector2){
      return props.controlXY;
    }else if(props.controlPosition instanceof HHgVector2){
      return props.controlPosition;
    }

    if("control" in props){
      return new HHgVector2(props.control, props.control);
    }

    if("cx" in props ){
      props.control = new HHgVector2(props.cx, props.cy);
      return props.control;
    }

    if("cX" in props){
      props.control = new HHgVector2(props.cX, props.cY);
      return props.control;
    }

    return undefined;

  },

  returnColorProps: function(props){

    if(props === undefined) return undefined;

    if(props instanceof HHgColorRGBA === true ){
      return props;
    }

    if(props instanceof HHgColorHSLA === true){
      return HHgColorHelper.getRGBfromHSL(props);
    }
        if(typeof props === "string"){

          if(props[0] === "#"){
            return HHgColorHelper.getRGBfromHex(props);
          }

            switch(props){
              case "red":
              return new HHgColorRGBA(255,0,0);
              break;
              case "green":
              return new HHgColorRGBA(0,255,0);
              break;
              case "blue":
              return new HHgColorRGBA(0,0,255);
              break;
              case "white":
              return new HHgColorRGBA(255,255,255);
              break;
              case "black":
              return new HHgColorRGBA(0,0,0);
              break;
          }

        }

      if(!isNaN(props)) return undefined;

      if("H" in props){
        return HHgColorHelper.getRGBfromHSL(props.H, props.S, props.L, props.A || 1);
      }else if("hue" in props){
        return HHgColorHelper.getRGBfromHSL(props.hue, props.saturation, props.lightness, props.alpha || 1);
      }

      if("R" in props){
        return new HHgColorRGBA(props.R, props.G, props.B, props.A || 1);
      }else if("r" in props){
        return  new HHgColorRGBA(props.r, props.g, props.b, props.a || 1);
      }else if("red" in props){
        return new HHgColorRGBA(props.red, props.green, props.blue, props.alpha || 1);
      }

    return HHg.returnColorProps(props.color);

  },

  returnIsScreenPosProps: function(props){
    if(props === undefined){
      return false;
    }

    if(typeof props === "boolean"){
      return props;
    }

    if(props.isScreenPos !== undefined){
      return props.isScreenPos;
    }

    if(props.isParentPos !== undefined){
      return !props.isParentPos;
    }

    if(props.screenPos !== undefined){
      return props.screenPos;
    }

    if(props.parentPos !== undefined){
      return !props.parentPos;
    }

    return false;

  },



  returnPercentOrPixelProps: function(props){
    if(props === undefined) return undefined;
    if(!isNaN(props)){
      return props;
    }

    if(typeof props === "string"){
      if(props[props.length - 1] === "\%"){
        return [parseFloat(props) / 100];
      }else{
        return [parseFloat(props)];
      }
    }
  },

  testVector: function(xy){
    console.log("vector: " + xy.returnPretty());
  },


  zValues : {
    scene: 0,
    gameplay: 100,
    gameUI: 200,
    menus: 300,
    mouse: 400,
  },

  roundNumToPlaces: function(num, places){
    places = Math.pow(10, places);
    return Math.round(num * places)/places;
  },



}




