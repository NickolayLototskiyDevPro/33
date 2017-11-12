const ProjectModule = (function() {
    let instance;
    
    return {
        getInstance: function() {

            if (!instance) {
                instance = project;
            }

            return instance;
        }
    }
})();

const project = {
    participants: [],
    pricing: { },
    isBusy: false,

    init(participants, pricing) {
        if (participants === undefined || pricing === undefined) {
            return;
        }
        this.participants = participants;
        this.pricing = pricing;
    },

    findParticipant(functor, callbackFunction) {
		if (this.isBusy) {
			return false;
		}
        this.isBusy = true;
        let isFirstFind = false;
        for (let i = 0; i < this.participants.length; i++) {
            if (functor(project.participants[i])) {
                isFirstFind = true;
                setTimeout(() => {
                    project.isBusy = false;
                    callbackFunction(project.participants[i]);
                });
                break;
            }
        }
        if (!isFirstFind) {
            setTimeout( () => {
                project.isBusy = false;
                callbackFunction(null);
            });
        }
    },


    findParticipants(functor, callbackFunction) {
		if (this.isBusy) {
			return false;
		}
        this.isBusy = true;
        let participantsArray = [];
        for (let i = 0; i < this.participants.length; i++) {
            if (functor(this.participants[i])) {
                participantsArray.push(this.participants[i]);
            }
        }

        setTimeout( () => {
            this.isBusy = false;
            callbackFunction(participantsArray);
        });
    },

    addParticipant(participantObject, callbackFunction) {
		if (this.isBusy) {
			return false;
		}
        this.isBusy = true;
        if ('seniorityLevel' in participantObject) {
            this.participants.push(participantObject);
            setTimeout( () => {
                this.isBusy = false;
                callbackFunction();
            });
        } else {
            setTimeout( () => {
                this.isBusy = false;
                callbackFunction('error');
            });
        }
    },

    removeParticipant(participantObject, callbackFunction) {
		if (this.isBusy) {
			return false;
		}
        this.isBusy = true;
        let indexForRemove;
        this.participants.forEach((participant, index) => {
            if (participant === participantObject) {
                indexForRemove = index;
            }
        });
        if (indexForRemove !== undefined) {
            let removed = this.participants.splice(indexForRemove, 1);
            setTimeout( () => {
                this.isBusy = false;
                callbackFunction(removed[0]);
            });
        } else {
            setTimeout( () => {
                this.isBusy = false;
                callbackFunction(null);
            });
        }
    },

    setPricing(participantPriceObject, callbackFunction) {
		if (this.isBusy) {
			return false;
		}
        this.isBusy = true;
        Object.assign(this.pricing, participantPriceObject);
        setTimeout( () => {
            this.isBusy = false;
            callbackFunction();
        });
    },

    calculateSalary(periodInDays) {
        const hour = 8;

        let sumSalary = this.participants.reduce((sum, participant) => {
            if (!Object.keys(this.pricing).includes(participant.seniorityLevel)) {
                throw new Error("error");
            }
            for (let key in this.pricing) {
                if (participant.seniorityLevel === key) {
                    sum += this.pricing[key] * hour * periodInDays ;
                }
            }
            return sum;
        }, 0);

        return sumSalary;
    }
};


module.exports = {
    firstName: 'Svetlana',
    lastName: 'Bedrataya',
    task: ProjectModule.getInstance()
}
