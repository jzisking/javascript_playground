Classes = {}

function Class(name, obj) {
    Classes[name] = obj;
}

function New(name) {
    var obj = Classes[name];
    var newObj = {...obj};

    if(newObj.__constructor) {
        var args = [];
        for(var i = 1; i < arguments.length; i++) {
            args.push(arguments[i]);
        }

        newObj.__constructor(args);
    }

    return newObj;
}

Class("Builder", {
    val: null,

    __constructor: function(params) {
        this.val = params[0];
    },

    print: function() {
        console.log(this.val);
    }
});

var builder = New("Builder", 5);
var builder1 = New("Builder", 6);
builder.print();
builder1.print();
