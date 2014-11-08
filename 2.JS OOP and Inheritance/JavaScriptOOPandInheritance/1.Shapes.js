var Shape = (function () {
    var BORDERS = {
        TOP: 0,
        BOTTOM: 390,
        LEFT: 0,
        RIGHT: 450
    };

    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');

    var Shape = (function () {
        function Shape(x, y, color) {
            if (x < BORDERS.LEFT || y < BORDERS.TOP || x > BORDERS.RIGHT || y > BORDERS.BOTTOM) {
                throw new RangeError('x coordinate or y coordinate is out of bounds!');
            }

            this._x = x;
            this._y = y;
            this._color = color;
        }

        Shape.prototype.toString = function () {
            return 'X: ' + this._x + ' Y: ' + this._y + ' Color: ' + this._color;
        };

        return Shape;
    })();

    var Circle = (function () {
        function Circle(x, y, color, radius) {
            Shape.call(this, x, y, color);
            if (radius > 100) {
                throw new RangeError('radius must be in the range [1...100]!');
            }

            this._radius = radius;
        }

        Circle.prototype = Object.create(Shape.prototype);

        Circle.prototype.toString = function () {
            return 'Circle: ' + Shape.prototype.toString.call(this) + ' Radius: ' + this._radius;
        };

        Circle.prototype.draw = function () {
            context.beginPath();
            context.arc(this._x, this._y, this._radius, 0, 2 * Math.PI);
            context.fillStyle = this._color;
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = 'black';
            context.stroke();
        };

        return Circle;
    })();

    var Rectangle = (function () {
        function Rectangle(x, y, color, width, height) {
            Shape.call(this, x, y, color);
            if (width > 500 || height > 350 || width < 1 || height < 1) {
                throw new RangeError('width or height is out of bounds!')
            }

            this._width = width;
            this._height = height;
        }

        Rectangle.prototype = Object.create(Shape.prototype);

        Rectangle.prototype.toString = function () {
            return 'Rectangle: ' + Shape.prototype.toString.call(this) + ' Width: ' +
                this._width + ' Height: ' + this._height;
        };

        Rectangle.prototype.draw = function () {
            context.beginPath();
            context.rect(this._x, this._y, this._width, this._height);
            context.fillStyle = this._color;
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = 'black';
            context.stroke();
        };

        return Rectangle;
    })();

    var Triangle = (function () {
        function Triangle(x, y, color, x1, y1, x2, y2) {
            Segment.call(this, x, y, color, x1, y1);
            if (x2 < BORDERS.LEFT || y2 < BORDERS.TOP || x2 > BORDERS.RIGHT || y2 > BORDERS.BOTTOM) {
                throw new RangeError('x(1,2) coordinates or y(1,2) coordinates are out of bounds!');
            }

            this._x2 = x2;
            this._y2 = y2;
        }

        Triangle.prototype = Object.create(Shape.prototype);

        Triangle.prototype.toString = function () {
            return 'Triangle: ' + Segment.prototype.toString.call(this) +
                ' X2: ' + this._x2 + ' Y2: ' + this._y2;
        };

        Triangle.prototype.draw = function () {
            context.beginPath();
            context.moveTo(this._x, this._y);
            context.lineTo(this._x1, this._y1);
            context.lineTo(this._x2, this._y2);
            context.lineTo(this._x, this._y);
            context.fillStyle = this._color;
            context.fill();
            context.lineWidth = 1;
            context.strokeStyle = 'black';
            context.stroke();
        };

        return Triangle;
    })();

    var Segment = (function () {
        function Segment(x, y, color, x1, y1) {
            Shape.call(this, x, y, color);
            if (x1 < BORDERS.LEFT || y1 < BORDERS.TOP || x1 > BORDERS.RIGHT || y1 > BORDERS.BOTTOM) {
                throw new RangeError('x coordinate or y coordinate is out of bounds!');
            }

            this._x1 = x1;
            this._y1 = y1;
        }

        Segment.prototype = Object.create(Shape.prototype);

        Segment.prototype.toString = function () {
            return 'Segment: ' + Shape.prototype.toString.call(this) + ' X1: ' + this._x1 + ' Y1: ' + this._y1;
        };

        Segment.prototype.draw = function () {
            context.beginPath();
            context.moveTo(this._x, this._y);
            context.lineTo(this._x1, this._y1);
            context.fillStyle = this._color;
            context.fill();
            context.stroke();
        };

        return Segment;
    })();

    var Point = (function () {
        function Point(x, y, color) {
            Shape.call(this, x, y, color);
        }

        Point.prototype = Object.create(Shape.prototype);

        Point.prototype.toString = function () {
            return 'Point: ' + Shape.prototype.toString.call(this);
        }

        Point.prototype.draw = function () {
            context.beginPath();
            context.fillRect(this._x, this._y, 1, 1);
            context.lineWidth = '100';
            context.fillStyle = this._color;
            context.fill();
        };

        return Point;
    })();

    return {
        Shape: Shape,
        Circle: Circle,
        Rectangle: Rectangle,
        Triangle: Triangle,
        Segment: Segment,
        Point: Point
    };
})();

var circle = new Shape.Circle(30, 45, '#FF0000', 6);
console.log(circle.toString());
circle.draw();

var rectangle = new Shape.Rectangle(45, 60, '#1AAA0E', 100, 70);
console.log(rectangle.toString());
rectangle.draw();

var triangle = new Shape.Triangle(40, 215, '#0000FF', 350, 35, 370, 145);
console.log(triangle.toString());
triangle.draw();

var segment = new Shape.Segment(233, 300, '#000000', 150, 200);
console.log(segment.toString());
segment.draw();

var point = new Shape.Point(350, 340, '#FFFFFF');
console.log(point.toString());
point.draw();