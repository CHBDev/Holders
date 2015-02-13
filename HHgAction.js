


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


	this.whatShouldIDoThisFrame = function(deltaT, now){

	};
	this.finalFrame = function(action){
		if(action.onComplete){
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

	if(!owner){
		return false;
	}
	
	HHgAction.call(this, owner, totalTime, ease, onComplete);

	this.vB = targetPos;
	this.vA = owner.getPositionInScreenOriginal();

	
	this.currentPosition = this.vA;
	this.totalDistance = this.vA.returnDistanceToVector(this.vB);

	var that = this;

	var deltaDistance = 0;

	console.log(this.vA.returnPretty() + " TO " + this.vB.returnPretty());

	this.whatShouldIDoThisFrame = function(deltaT, now){
		this.timeSoFar += deltaT/1000;
		
		if(this.timeSoFar >= this.totalTime){
			
			owner.setPositionInScreen(that.vB);
			that.finalFrame(that);

			return;
		}

		deltaDistance = that.totalDistance * ( (deltaT / 1000) / that.totalTime );

		that.currentPosition = that.currentPosition.returnVectorAtDistanceToVector(that.vB, deltaDistance);
		
	

		owner.setPositionInScreen(that.currentPosition);


	}

	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionMoveTo);

function HHgActionMoveBy(owner, deltaPos, totalTime, ease, onComplete){
		if(!owner){
		return false;
	}
	
	HHgAction.call(this, owner, totalTime, ease, onComplete);

	
	this.vA = owner.getPositionInScreenOriginal();
	this.vB = this.vA.returnVectorPlusVector(deltaPos);
	
	
	this.targetDistance = this.vA.returnDistanceToVector(this.vB);
	this.distanceSoFar = 0;

	var that = this;

	var deltaDistance = 0;

	console.log(this.vA.returnPretty() + " TO " + this.vB.returnPretty());

	this.whatShouldIDoThisFrame = function(deltaT, now){
		this.timeSoFar += deltaT/1000;
		
		if(this.timeSoFar >= this.totalTime){
			
			owner.setPositionInScreen(getPositionInScreenOriginal().returnVectorAtDistanceToVector(that.vB, that.targetDistance - that.distanceSoFar));
			that.finalFrame(that);

			return;
		}

		deltaDistance = that.targetDistance * ( (deltaT / 1000) / that.totalTime );
		distanceSoFar += deltaDistance;

		owner.setPositionInScreen(owner.getPositionInScreenOriginal().returnVectorAtDistanceToVector(that.vB, deltaDistance));
		


	}
	
	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionMoveTo);




function HHgActionRotateBy(owner, degrees, time, ease, onComplete){
	HHgAction.call(this, owner, time, ease, onComplete);


	this.degreesStart = this.owner.getRotationOriginal();
	this.degreesToRotate = degrees;

	this.degreesSoFar = this.vA;
	
	var that = this;

	var deltaDegrees = 0;

	this.whatShouldIDoThisFrame = function(deltaT, now){
		this.timeSoFar += deltaT/1000;
		
		if(this.timeSoFar >= this.totalTime){
			
			owner.setRotationOriginal(this.degreesStart + this.degreesToRotate);
			that.finalFrame(that);

			return;
		}

		deltaDegrees = that.degreesToRotate * ( (deltaT / 1000) / that.totalTime );

		that.degreesSoFar += deltaDegrees;
		owner.setRotationOriginalAdd(deltaDegrees);


	}
	
	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionMoveTo);



function HHgActionFollowPath(owner, targetPos, totalTime, path, ease, onComplete){

	if(!owner){
		return false;
	}
	
	HHgAction.call(this, owner, totalTime, ease, onComplete);

	this.path = path;
	this.pathLength = path.getTotalLength();
	
	
	var that = this;



	this.whatShouldIDoThisFrame = function(deltaT, now){
		this.timeSoFar += deltaT/1000;
		
		if(this.timeSoFar >= this.totalTime){
			
			owner.setPositionInScreen(that.path.getPointAtLength(this.pathLength));
			that.finalFrame(that);

			return;
		}

		deltaDistance = that.totalDistance * ( (deltaT / 1000) / that.totalTime );
	

		owner.setPositionInScreen(that.path.getPointAtLength(this.timeSoFar/this.totalTime * this.pathLength));


	}

	
}
HHg.HHgActionCommands.makeChildOfAction(HHgActionMoveTo);




//=======================




//====Helper Function for above







