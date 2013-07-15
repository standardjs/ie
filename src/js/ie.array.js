(function (prototype,instanceProperties) {
	for (var i in instanceProperties) {
		if (!prototype[i]) {
			prototype[i] = instanceProperties[i];
		}
	}

})(
	Array.prototype,
	{
		indexOf: function ie_array_indexOf(object) {
			for (var i=0,l=this.length;i!=l;i++) {
				if (this[i] === object) {
					return i;
				}
			}
			return -1;
		},
		lastIndexOf: function ie_array_indexOf(object) {
			for (var i= this.length-1; i!=-1;i--) {
				if (this[i] === object) {
					return i;
				}
			}
			return -1;
		},
		forEach: function ie_array_forEach(func) {
			for (var i=0,l=this.length;i!=l;i++) {
				func.apply(this[i]);
			}
		},
		filter: function ie_array_filter(func) {
			var results = [];
			for (var i=0,l=this.length;i!=l;i++) {
				if (func(this[i])) {
					results[results.length] = this[i];
				}
			}
		return results;
		},
		some: function ie_array_some(func){},
		every: function ie_array_every(func){},
		reduce: function ie_array_reduce(func){},
		reduceRight: function ie_array_reduce(func){}
	}
);