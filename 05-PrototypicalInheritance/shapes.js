/*
 Takes two constructors

 Creates a new copy of the Parent object type
 Installs it as the prototype
 Resets that copied prototype's constructor to the 'derived' class' constructor

 Downside: is that we create an instance of the parent class and call it's constructor
 Upside: no copying the non-hasOwnProperties

 */
function inherits(Child, Parent) {
  var Intermediary = function(){};
  Intermediary.prototype = Parent.prototype;
  Child.prototype = new Intermediary();
}

function Shape(side_lengths) {
  this._side_lengths = side_lengths;
}

Shape.prototype.edge_count = function () {
  return this._side_lengths.length;
};

Shape.prototype.side_lengths = function () {
  return this._side_lengths;
};

Shape.prototype.perimeter = function () {
  return this.side_lengths().reduce(function (memo, length) {
    return memo + length;
  });
};

Shape.prototype.name = function () {
  return "Shape";
};

Shape.prototype.description = function () {
  return "I'm a " + this.name() + " with " +
    this.edge_count() + " sides and a perimeter of  " + this.perimeter();
};


function Square(side_length) {
  Shape.call(this, [side_length, side_length, side_length, side_length]);
}

inherits(Square, Shape);

Square.prototype.name = function () {
  return "Square";
};

Square.prototype.area = function () {
  return this.side_lengths()[0] * this.side_lengths()[0];
};

function Triangle(side_length) {
  Shape.call(this, [side_length, side_length, side_length]);
}

inherits(Triangle, Shape);

Triangle.prototype.name = function () {
  return "Triangle";
};

Triangle.prototype.area = function () {
  // Herons formula
  var p = this.perimeter() / 2.0;

  console.log("p2 = " + p);

  var area = Math.sqrt(p
      * (p - this.side_lengths()[0])
      * (p - this.side_lengths()[1])
      * (p - this.side_lengths()[2])
  );
  return area;
};

var square = new Square(50);

console.log("Description: " + square.description());
console.log("Area: " + square.area());
console.log("Perimeter: " + square.perimeter());


var triangle = new Triangle(50);

console.log("Description: " + triangle.description());
console.log("Area: " + triangle.area());
console.log("Perimeter: " + triangle.perimeter());



