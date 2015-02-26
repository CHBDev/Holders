


var HHgAction = function (owner, totalTime, ease, onComplete){
	if(owner === undefined){
		console.log("ERROR: no owner holder passed to Action");
		return;
	}
	this.owner = owner;

	this.onComplete = onComplete;
	this.ease = ease;
	this.totalTime = totalTime;
	this.startTime = +new Date;
	this.timeSoFar = 0;
	this.savedAmount = undefined;


	this.whatShouldIDoThisFrame = function(deltaT, now){
		//override in children
	};
	this.finalFrame = function(action){
		
		if(action.onComplete){
			console.log("called follow up");
			action.onComplete();
		}
		
		action.owner.doRemoveAction(action);
		HHgActionManager.doRemoveAction(action);


	};

	
}

HHg.HHgActionCommands = {
	makeChildOfAction : function(subclass){
		subclass.prototype = Object.create(HHgAction.prototype);
		subclass.prototype.constructor = subclass;

	}
}

//======= MOVEMENT

function HHgActionMoveTo(owner, targetPos, totalTime, ease, onComplete){

	HHgAction.call(this, owner, totalTime, ease, onComplete);

	this.posStart = this.owner.getPositionInScreenOriginal();
	this.moveByAmount = this.posStart.returnVectorSubtractedFromVector(targetPos);
	this.targetPos = targetPos;

	this.moveSoFar = HHg0Vector;
	
	var that = this;

	var deltaMove = HHg0Vector;

	var vectorStore = new HHgVector2(0,0);
	var xOrYLessThan1 = false;
	

	this.whatShouldIDoThisFrame = function(deltaT, now){
		this.timeSoFar += deltaT/1000;
		
		if(this.timeSoFar >= this.totalTime){
			
			deltaT += this.timeSoFar - this.totalTime;
			
			deltaMove = that.moveByAmount.returnVectorScaledBy(( (deltaT / 1000) / that.totalTime ));

			that.moveSoFar = that.moveSoFar.returnVectorPlusVector(deltaMove);
			owner.setPositionInScreenBy(deltaMove);
			
			that.finalFrame(that);

			return;
		}

		deltaMove = that.moveByAmount.returnVectorScaledBy(( (deltaT / 1000) / that.totalTime ));

		/*
		if(this.savedAmount !== undefined){
			deltaMove = deltaMove.returnVectorPlusVector(this.savedAmount);
			this.savedAmount = undefined;
		}


		if(deltaMove.getY() < 1 * HHgPixelScale ){
			xOrYLessThan1 = true;
			vectorStore.setY(deltaMove.getY());
			deltaMove.setY(0);
		}
		if(deltaMove.getX() < 1 * HHgPixelScale){
			xOrYLessThan1 = true;
			vectorStore.setX(deltaMove.getX());
			deltaMove.setX(0);
		}

		
		if(xOrYLessThan1 === true){

			if(this.savedAmount !== undefined){
				this.savedAmount = this.savedAmount.returnVectorPlusVector(vectorStore);
			}else{
				this.savedAmount = vectorStore.returnCopy();
			}

			vectorStore.setX(0);
			vectorStore.setY(0);
			xOrYLessThan1 = false;
		}
		*/


		that.moveSoFar = that.moveSoFar.returnVectorPlusVector(deltaMove);
		owner.setPositionInScreenBy(deltaMove);


	}

	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionMoveTo);

function HHgActionMoveBy(owner, deltaPos, totalTime, ease, onComplete){

	HHgAction.call(this, owner, totalTime, ease, onComplete);

	this.posStart = this.owner.getPositionInScreenOriginal();
	this.moveByAmount = deltaPos;

	this.moveSoFar = HHg0Vector;
	
	var that = this;

	var deltaMove = HHg0Vector;

	var vectorStore = new HHgVector2(0,0);
	var xOrYLessThan1 = false;

	this.whatShouldIDoThisFrame = function(deltaT, now){
		this.timeSoFar += deltaT/1000;
		
		if(this.timeSoFar >= this.totalTime){
			
			deltaT += this.timeSoFar - this.totalTime;
			
			deltaMove = that.moveByAmount.returnVectorScaledBy(( (deltaT / 1000) / that.totalTime ));

			that.moveSoFar = that.moveSoFar.returnVectorPlusVector(deltaMove);
			owner.setPositionInScreenBy(deltaMove);
			
			that.finalFrame(that);

			return;
		}

		deltaMove = that.moveByAmount.returnVectorScaledBy(( (deltaT / 1000) / that.totalTime ));

/*
		if(this.savedAmount !== undefined){
			deltaMove = deltaMove.returnVectorPlusVector(this.savedAmount);
			this.savedAmount = undefined;
		}

		if(deltaMove.getY() < 1 / HHgPixelScale ){
			xOrYLessThan1 = true;
			vectorStore.setY(deltaMove.getY());
			deltaMove.setY(0);
		}
		if(deltaMove.getX() < 1 / HHgPixelScale){
			xOrYLessThan1 = true;
			vectorStore.setX(deltaMove.getX());
			deltaMove.setX(0);
		}

		//console.log("" + vectorStore.getX() + " " + vectorStore.getY());

		if(xOrYLessThan1 === true){

			if(this.savedAmount !== undefined){
				this.savedAmount = this.savedAmount.returnVectorPlusVector(vectorStore);
			}else{
				this.savedAmount = vectorStore.returnCopy();
			}

			vectorStore.setX(0);
			vectorStore.setY(0);
			xOrYLessThan1 = false;
		}
	*/

		that.moveSoFar = that.moveSoFar.returnVectorPlusVector(deltaMove);
		owner.setPositionInScreenBy(deltaMove);


	}
	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionMoveBy);




function HHgActionRotateBy(owner, degrees, totalTime, ease, onComplete){
	HHgAction.call(this, owner, totalTime, ease, onComplete);

	this.degreesStart = this.owner.getRotationOriginal();
	this.degreesToRotate = degrees;

	this.degreesSoFar = 0;
	
	var that = this;

	var deltaDegrees = 0;

	this.whatShouldIDoThisFrame = function(deltaT, now){
		this.timeSoFar += deltaT/1000;
		
		if(this.timeSoFar >= this.totalTime){
			
			owner.setRotationOriginalTo(this.degreesStart + this.degreesToRotate);
			that.finalFrame(that);

			return;
		}

		deltaDegrees = that.degreesToRotate * ( (deltaT / 1000) / that.totalTime );

		that.degreesSoFar += deltaDegrees;
		owner.setRotationOriginalBy(deltaDegrees);


	}
	
	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionRotateBy);


function HHgActionRotateTo(owner, degrees, totalTime, ease, onComplete){
	
	HHgAction.call(this, owner, totalTime, ease, onComplete);

	this.degreesStart = this.owner.getRotationOriginal();
	this.degreesToRotate = degrees - this.degreesStart;

	this.degreesSoFar = 0;
	
	var that = this;

	var deltaDegrees = 0;

	this.whatShouldIDoThisFrame = function(deltaT, now){
		this.timeSoFar += deltaT/1000;
		
		if(this.timeSoFar >= this.totalTime){
			
			owner.setRotationOriginalTo(this.degreesStart + this.degreesToRotate);
			that.finalFrame(that);

			return;
		}

		deltaDegrees = that.degreesToRotate * ( (deltaT / 1000) / that.totalTime );

		that.degreesSoFar += deltaDegrees;
		owner.setRotationOriginalBy(deltaDegrees);


	}
	
	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionRotateTo);


function HHgActionScaleBy(owner, scaleXY, totalTime, ease, onComplete){
	HHgAction.call(this, owner, totalTime, ease, onComplete);

	this.scaleStart = this.owner.getScaleOriginal();
	this.scaleByAmount = scaleXY;

	this.scaleSoFar = HHg0Vector;
	
	var that = this;

	var deltaScale = HHg0Vector;

	this.whatShouldIDoThisFrame = function(deltaT, now){
		this.timeSoFar += deltaT/1000;
		
		if(this.timeSoFar >= this.totalTime){
			
			owner.setScaleOriginalTo(this.scaleStart.returnVectorPlusVector(this.scaleByAmount)  );
			that.finalFrame(that);

			return;
		}

		deltaScale = that.scaleByAmount.returnVectorScaledBy(( (deltaT / 1000) / that.totalTime ));

		that.scaleSoFar = that.scaleSoFar.returnVectorPlusVector(deltaScale);
		owner.setScaleOriginalBy(deltaScale);


	}
	
	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionScaleBy);


function HHgActionScaleTo(owner, scaleXY, totalTime, ease, onComplete){
	HHgAction.call(this, owner, totalTime, ease, onComplete);

	this.scaleStart = this.owner.getScaleOriginal();
	this.scaleByAmount = this.scaleStart.returnVectorSubtractedFromVector(scaleXY) ;

	this.scaleSoFar = HHg0Vector;
	
	var that = this;

	var deltaScale = HHg0Vector;

	this.whatShouldIDoThisFrame = function(deltaT, now){
		this.timeSoFar += deltaT/1000;
		
		if(this.timeSoFar >= this.totalTime){
			
			owner.setScaleOriginalTo(this.scaleStart.returnVectorPlusVector(this.scaleByAmount)  );
			that.finalFrame(that);

			return;
		}

		deltaScale = that.scaleByAmount.returnVectorScaledBy(( (deltaT / 1000) / that.totalTime ));

		that.scaleSoFar = that.scaleSoFar.returnVectorPlusVector(deltaScale);
		owner.setScaleOriginalBy(deltaScale);


	}
	
	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionScaleTo);




function HHgActionFollowQuad(owner, controlXY, endXY, totalTime, ease, onComplete){

	if(!owner){
		return false;
	}


	
	HHgAction.call(this, owner, totalTime, ease, onComplete);

	this.endXY = endXY;
	this.endX = endXY.getX();
	this.endY = endXY.getY();
	this.startXY = owner.getPositionInScreenOriginal();
	this.startX = this.startXY.getX();
	this.startY = this.startXY.getY();
	this.controlXY = controlXY;
	this.controlX = controlXY.getX();
	this.controlY = controlXY.getY();

	this.previousXY;


	
	var that = this;

	this.getXorYAlongQuad = function(t, p1, p2, p3) {
		
    	var iT = 1 - t;
    	var test = iT * iT * p1 + 2 * iT * t * p2 + t * t * p3;
    	//console.log(test);
    	return test;
	}

	this.getQuadraticCurvePoint = function(startX, startY, cpX, cpY, endX, endY, position) {
		return new HHgVector2(this.getXorYAlongQuad(position, startX, cpX, endX),
								this.getXorYAlongQuad(position, startY, cpY, endY));

    };
	
	var distanceAlongCurve;

	this.whatShouldIDoThisFrame = function(deltaT, now){
		this.timeSoFar += deltaT/1000;
		
		if(this.timeSoFar >= this.totalTime){
			
			owner.setPositionInScreenTo(this.endXY);
			that.finalFrame(that);

			return;
		}

		distanceAlongCurve =  ( this.timeSoFar / that.totalTime );
	
		this.previousXY = this.getQuadraticCurvePoint(this.startX, this.startY, this.controlX, this.controlY, this.endX, this.endY, distanceAlongCurve);

		owner.setPositionInScreenTo(this.previousXY);

	}

	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionFollowQuad);




//=======================




//====Helper Function for above







