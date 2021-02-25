'use strict';

function autoPopulateAllFields(schema) {
    var paths = "";
    let array = [];
    schema.eachPath(function process(pathname, schemaType) {
        if (pathname=='_id') return;
        //console.log(schemaType.options);
        if (schemaType.options.ref){
            array.push(pathname);
        }
        if (schemaType.options.type[0] != undefined){
            if (schemaType.options.type[0].ref){
                array.push(pathname);
                //paths += " " + pathname + "";
            }
        }
        
           
    });

    schema.pre('find', function(){return handler.call()});
    schema.pre('findOne', function(){return handler.call()});

    var handler = function() {
        console.log("handeled " + JSON.stringify(array));
        //this.populate('RC_REALIZATION');
        for (var val of array){
            console.log(val);
            this.populate(val);
        }
        //console.log('paths: ' + paths);
        //console.log(JSON.stringify(array));
        //this.populate(paths);
    }
    
};

module.exports = autoPopulateAllFields;