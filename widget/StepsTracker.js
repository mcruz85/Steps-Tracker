define([
	"dojo/_base/declare",
	"dojo/_base/array",
	"dojo/dom-construct",
	"dojo/query"
], function (declare, array, domConstruct, query) {


	return declare(null, {

		constructor: function(config) {

			this.config = config || {};
			this.config.steps = this.config.steps || [];
			this.config.currentStep = this.config.currentStep || 0;

		},

		placeAt: function(el) {			
			this.create(el);	
			this.config.el = el;	
		},

		setCurrentStep: function(step) {

			query("li", this.config.el).forEach(function(item, index) {
				item.className = getClassByStep(index, step);
			});

		},


		create: function(el) {

			var currentStep = this.config.currentStep;
			var ol = domConstruct.create("ol", {
				"class": "progtrckr",
				"data-progtrckr-steps": this.config.steps.length
			}, el);

			array.forEach(
				this.config.steps,				
				function(item, index) {

					domConstruct.create("li",  {
						class: getClassByStep(index, currentStep),
            			innerHTML: item
      				 }, ol);
				}
			);

		}

	});

	function getClassByStep(stepNumber, currentStep) {

		if (stepNumber < currentStep) {
			return "progtrckr-done";
		} else if (stepNumber === currentStep) {
			return "progtrckr-doing";
		} else {
			return "progtrckr-todo";
		}

	}

});