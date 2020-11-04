'use strict';

/**
               * Gets a random float between a given min and max number.
               */function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

/**
   * Gets a random integer between a given min and max number.
   */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
   * Gets the linear interpretation given a start, end, and the current amount (0–1)
   */
function lerp(start, end, amount) {
  return (1 - amount) * start + amount * end;
}

/**
   * Determines if two axis-aligned boxes intersect using AABB.
   */
function doBoxesIntersect(a, b) {
  if (a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.h + a.y > b.y) {
    return true;
  }
  return false;
}

/**
   * Scales a value given a target range and current range.
   */
function scaleBetween(initialVal, minAllow, maxAllow, min, max) {
  // scaleBetween(250, -1, 1, 0, 500) => 0
  return (maxAllow - minAllow) * (initialVal - min) / (max - min) + minAllow;
}

/**
   * Cycles through a total amount and current value.
   */
function cycle(value, total) {
  return (value % total + total) % total;
}

/**
   * Clamps a number between a given min and max range.
   */
function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

var utils = /*#__PURE__*/Object.freeze({
  getRandomFloat: getRandomFloat,
  getRandomInt: getRandomInt,
  lerp: lerp,
  doBoxesIntersect: doBoxesIntersect,
  scaleBetween: scaleBetween,
  cycle: cycle,
  clamp: clamp });


var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true } });


  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var Point = function () {
  function Point(x, y) {
    classCallCheck(this, Point);

    this.x = x;
    this.y = y;
  }

  createClass(Point, [{
    key: 'clone',
    value: function clone() {
      return new Point(this.x, this.y);
    } },
  {
    key: 'delta',
    value: function delta(point) {
      return [point.x - this.x, point.y - this.y];
    } },
  {
    key: 'distance',
    value: function distance(point) {
      var _delta = this.delta(point),
      _delta2 = slicedToArray(_delta, 2),
      dx = _delta2[0],
      dy = _delta2[1];

      return Math.sqrt(dx * dx + dy * dy);
    } },
  {
    key: 'moveTo',
    value: function moveTo(x, y) {
      this.x = x;
      this.y = y;
      return this;
    } },
  {
    key: 'move',
    value: function move(x, y) {
      this.x += x;
      this.y += y;
      return this;
    } },
  {
    key: 'moveAtAngle',
    value: function moveAtAngle(angle, distance) {
      this.x += Math.cos(angle) * distance;
      this.y += Math.sin(angle) * distance;
      return this;
    } },
  {
    key: 'angleRadians',
    value: function angleRadians(point) {
      // radians = atan2(deltaY, deltaX)
      var y = point.y - this.y;
      var x = point.x - this.x;
      return Math.atan2(y, x);
    } },
  {
    key: 'angleDeg',
    value: function angleDeg(point) {
      // degrees = atan2(deltaY, deltaX) * (180 / PI)
      var y = point.y - this.y;
      var x = point.x - this.x;
      return Math.atan2(y, x) * (180 / Math.PI);
    } },
  {
    key: 'rotate',
    value: function rotate(origin, radians) {
      // rotate the point around a given origin point
      var cos = Math.cos(radians);
      var sin = Math.sin(radians);
      this.x = cos * (this.x - origin.x) + sin * (this.y - origin.y) + origin.x;
      this.y = cos * (this.y - origin.y) - sin * (this.x - origin.x) + origin.y;
      return this;
    } },
  {
    key: 'lerp',
    value: function lerp$$1(destination, amount) {
      this.x = lerp(this.x, destination.x, amount);
      this.y = lerp(this.y, destination.y, amount);
      return this;
    } },
  {
    key: 'position',
    get: function get$$1() {
      return [this.x, this.y];
    } }]);

  return Point;
}();

var Bounds = function () {
  function Bounds(x, y, w, h) {
    classCallCheck(this, Bounds);

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.hw = w / 2;
    this.hh = h / 2;
    this.center = new Point(this.hw, this.hh);
    this.position = new Point(x, y);
  }

  createClass(Bounds, [{
    key: 'move',
    value: function move(x, y) {
      this.x += x;
      this.y += y;
      this.center.move(x, y);
      this.position.move(x, y);
      return this;
    } },
  {
    key: 'moveTo',
    value: function moveTo(x, y) {
      this.x = x;
      this.y = y;
      this.center.moveTo(x + this.hw, y + this.hh);
      this.position.moveTo(x, y);
      return this;
    } },
  {
    key: 'intersectsWith',
    value: function intersectsWith(bounds) {
      return doBoxesIntersect(this, bounds);
    } },
  {
    key: 'offsetOuter',
    value: function offsetOuter(offset) {
      var _params = slicedToArray(this.params, 4),
      x = _params[0],
      y = _params[1],
      w = _params[2],
      h = _params[3];

      return new Bounds(x - offset, y - offset, w + offset * 2, h + offset * 2);
    } },
  {
    key: 'offsetInner',
    value: function offsetInner(offset) {
      var _params2 = slicedToArray(this.params, 4),
      x = _params2[0],
      y = _params2[1],
      w = _params2[2],
      h = _params2[3];

      return new Bounds(x + offset, y + offset, w - offset * 2, h - offset * 2);
    } },
  {
    key: 'params',
    get: function get$$1() {
      return [this.x, this.y, this.w, this.h];
    } }]);

  return Bounds;
}();

var Pointer = function () {
  function Pointer(_ref) {
    var containerRect = _ref.containerRect,
    scrollPosition = _ref.scrollPosition;
    classCallCheck(this, Pointer);

    // cached getBoundingRect call
    this.containerRect = containerRect;
    // cached position from when the rect is got
    this.scrollPosition = scrollPosition;

    this.dpr = window.devicePixelRatio || 1;
    this.delta;
    this.lastPosition = null;
    this.position = new Point(null, null);
    this.addListeners();
  }

  createClass(Pointer, [{
    key: 'delta',
    value: function delta() {
      return this.position.delta(this.lastPosition);
    } },
  {
    key: 'addListeners',
    value: function addListeners() {
      var _this = this;

      ['mousemove', 'touchmove'].forEach(function (event, touch) {
        window.addEventListener(event, function (e) {
          // move previous point
          var _position = _this.position,
          px = _position.x,
          py = _position.y;

          // disable the demo modifier if it's been added

          if (_this.modifier) {
            _this.modifier = null;
          }

          // gets touch if avail else normal mouse event
          var x = null;
          var y = null;
          if (touch) {
            e.preventDefault();
            x = e.targetTouches[0].clientX * _this.dpr;
            y = e.targetTouches[0].clientY * _this.dpr;
          } else {
            x = e.clientX * _this.dpr;
            y = e.clientY * _this.dpr;
          }

          // set new last position
          if (!_this.lastPosition) {
            _this.lastPosition = new Point(x, y);
          } else {
            _this.lastPosition.moveTo(px, py);
          }

          // apply offsets if the pointer is in a container
          if (_this.containerRect && _this.scrollPosition) {
            var _containerRect = _this.containerRect,
            offX = _containerRect.left,
            offY = _containerRect.top;
            var _scrollPosition = _this.scrollPosition,
            scrollX = _scrollPosition.scrollX,
            scrollY = _scrollPosition.scrollY;

            // account for current and cached scroll positions

            var sx = window.pageXOffset - scrollX;
            var sy = window.pageYOffset - scrollY;

            // apply element offset from viewport
            x = x - offX * _this.dpr;
            y = y - offY * _this.dpr;

            // apply page scroll offset
            x = x + sx * _this.dpr;
            y = y + sy * _this.dpr;
          }

          // set the final positon
          _this.position.moveTo(x, y);
        }, false);
      });
    } }]);

  return Pointer;
}();

var Canvas = function () {
  function Canvas(_ref) {
    var _this = this;

    var canvas = _ref.canvas,
    container = _ref.container,
    _ref$entities = _ref.entities,
    entities = _ref$entities === undefined ? [] : _ref$entities,
    hasPointer = _ref.hasPointer,
    pauseInBackground = _ref.pauseInBackground;
    classCallCheck(this, Canvas);

    this.addEntity = function (newEntity) {
      _this.entities = [].concat(toConsumableArray(_this.entities), [newEntity]);
      // call setup since this is new
      newEntity.setup && newEntity.setup(_this);

      return _this.entities.length - 1;
    };

    this.stop = function () {
      _this.cancelRaf();
      _this.paused = true;
    };

    this.start = function () {
      _this.cancelRaf();
      _this.paused = false;
      _this.render();
    };

    this.render = function () {
      // Draw and Update items here.
      _this.entities.forEach(function (_ref2) {
        var draw = _ref2.draw,
        update = _ref2.update;

        draw && draw(_this);
        update && update(_this);
      });

      ++_this.tick;

      if (!_this.paused) {
        _this.rafId = window.requestAnimationFrame(_this.render);
      }
    };

    this.canvas = canvas;
    this.container = container;
    this.hasPointer = hasPointer;
    this.pauseInBackground = pauseInBackground;

    this.dpr = window.devicePixelRatio || 1;
    this.ctx = canvas.getContext('2d');
    this.ctx.scale(this.dpr, this.dpr);

    // tick counter
    this.tick = 0;

    // request animation frame id
    this.rafId = null;

    // entities to be drawn on the canvas
    this.entities = entities;

    // setup and run
    this.setCanvasSize();
    this.setContainerRect();
    this.setPointer();
    this.setupListeners();

    this.setupEntities();
    this.render();
  }

  createClass(Canvas, [{
    key: 'setupListeners',
    value: function setupListeners() {
      var _this2 = this;

      window.addEventListener('resize', function (event) {
        _this2.setCanvasSize();
        _this2.setPointer();
        _this2.setContainerRect();
        _this2.resizeEntities(event);
      });

      if (this.pauseInBackground) {
        window.addEventListener('blur', this.stop);
        window.addEventListener('focus', this.start);
      }
    } },
  {
    key: 'setContainerRect',
    value: function setContainerRect() {
      if (!this.container) return;
      this.containerRect = this.container.getBoundingClientRect();
    } },
  {
    key: 'setPointer',
    value: function setPointer() {
      // track mouse/touch movement
      var scrollX = window.pageXOffset;
      var scrollY = window.pageYOffset;
      this.pointer = this.hasPointer && new Pointer({
        containerRect: this.containerRect,
        scrollPosition: {
          scrollX: scrollX,
          scrollY: scrollY } });


    } },
  {
    key: 'setCanvasSize',
    value: function setCanvasSize() {
      var _window = window,
      w = _window.innerWidth,
      h = _window.innerHeight;

      // sized to the container if available

      if (this.container) {
        w = this.container.clientWidth;
        h = this.container.clientHeight;
      }

      // otherwise, fullscreen
      var w2 = w * this.dpr;
      var h2 = h * this.dpr;
      this.canvas.width = w2;
      this.canvas.height = h2;
      this.canvas.style.width = w + 'px';
      this.canvas.style.height = h + 'px';
      this.canvas.style.position = 'absolute';
      this.canvas.style.top = 0;
      this.canvas.style.left = 0;
      this.bounds = new Bounds(0, 0, w2, h2);
    } },
  {
    key: 'setupEntities',
    value: function setupEntities() {
      var _this3 = this;

      this.entities.forEach(function (_ref3) {
        var setup = _ref3.setup;

        setup && setup(_this3);
      });
    } },
  {
    key: 'resizeEntities',
    value: function resizeEntities(event) {
      var _this4 = this;

      this.entities.forEach(function (_ref4) {
        var resize = _ref4.resize;

        resize && resize(_this4, event);
      });
    } },
  {
    key: 'removeEntity',
    value: function removeEntity(deleteIndex) {
      this.entities = this.entities.filter(function (el, i) {
        return i !== deleteIndex;
      });
      return this.entities;
    } },
  {
    key: 'removeDead',
    value: function removeDead() {
      this.entities = this.entities.filter(function (_ref5) {
        var _ref5$dead = _ref5.dead,
        dead = _ref5$dead === undefined ? false : _ref5$dead;
        return !dead;
      });
    } },
  {
    key: 'cancelRaf',
    value: function cancelRaf() {
      this.rafId && cancelAnimationFrame(this.rafId);
      this.rafId = null;
    } },
  {
    key: 'clearCanvas',
    value: function clearCanvas(_ref6) {
      var ctx = _ref6.ctx,
      bounds = _ref6.bounds;

      ctx.clearRect.apply(ctx, toConsumableArray(bounds.params));
    }

    // Main loop
  }]);

  return Canvas;
}();

var Entity = function Entity() {
  var _this = this;

  classCallCheck(this, Entity);
  this.dpr = window.devicePixelRatio || 1;

  this.toValue = function (value) {
    return value * _this.dpr;
  };
};

var PointPhysics = function (_Point) {
  inherits(PointPhysics, _Point);

  function PointPhysics(_ref) {
    var x = _ref.x,
    y = _ref.y,
    mass = _ref.mass,
    isFixed = _ref.isFixed,
    _ref$pointerStrength = _ref.pointerStrength,
    pointerStrength = _ref$pointerStrength === undefined ? 0.25 : _ref$pointerStrength,
    _ref$pointerRadius = _ref.pointerRadius,
    pointerRadius = _ref$pointerRadius === undefined ? 100 : _ref$pointerRadius;
    classCallCheck(this, PointPhysics);

    var _this = possibleConstructorReturn(this, (PointPhysics.__proto__ || Object.getPrototypeOf(PointPhysics)).call(this, x, y));

    _this.update = function (_ref2) {
      var pointer = _ref2.pointer,
      tick = _ref2.tick;

      if (_this.isFixed) return;
      if (_this.pointerRadius && _this.pointerStrength) {
        _this.applyForceFromMouse(pointer);
      }
      _this.solveVelocity();
    };

    _this.vx = 0; // velocity x
    _this.vy = 0; // velocity y
    _this.fx = 0; // force x
    _this.fy = 0; // force y
    _this.mass = mass;
    _this.isFixed = isFixed;

    var DPR = devicePixelRatio || 1;
    _this.pointerRadius = pointerRadius * DPR;
    _this.pointerStrength = pointerStrength; // 0 - 1
    return _this;
  }

  createClass(PointPhysics, [{
    key: 'applyForce',
    value: function applyForce(x, y) {
      this.fx += x;
      this.fy += y;
    } },
  {
    key: 'applyForceFromMouse',
    value: function applyForceFromMouse(pointer) {
      var distance = this.distance(pointer.position);

      if (distance < this.pointerRadius) {
        var _pointer$delta = pointer.delta(),
        _pointer$delta2 = slicedToArray(_pointer$delta, 2),
        dx = _pointer$delta2[0],
        dy = _pointer$delta2[1];

        var power = (1 - distance / this.pointerRadius) * this.pointerStrength * -1;

        this.applyForce(dx * power, dy * power);
      }
    } },
  {
    key: 'solveVelocity',
    value: function solveVelocity() {
      if (this.fx === 0 && this.fy === 0) return;

      // acceleration = force / mass;
      var ax = this.fx / this.mass;
      var ay = this.fy / this.mass;

      // velocity + acceleration
      this.vx += ax;
      this.vy += ay;

      this.x += this.vx;
      this.y += this.vy;

      // reset any applied forces
      this.fx = 0;
      this.fy = 0;
    } }]);

  return PointPhysics;
}(Point);

var Segment = function () {
  function Segment(p1, p2) {
    classCallCheck(this, Segment);

    this.p1 = p1;
    this.p2 = p2;
    // alias
    this.a = this.p1;
    this.b = this.p2;
    //
    this.points = [this.p1, this.p2];

    var tl = new Point(Math.min(p1.x, p2.x), Math.min(p1.y, p2.y));
    var br = new Point(Math.max(p1.x, p2.x), Math.max(p1.y, p2.y));

    var _tl$delta = tl.delta(br),
    _tl$delta2 = slicedToArray(_tl$delta, 2),
    dx = _tl$delta2[0],
    dy = _tl$delta2[1];

    this.bounds = new Bounds(tl.x, tl.y, dx, dy);
  }

  createClass(Segment, [{
    key: 'move',
    value: function move() {
      var _p, _p2, _bounds;

      this.p1 = (_p = this.p1).move.apply(_p, arguments);
      this.p2 = (_p2 = this.p2).move.apply(_p2, arguments);
      (_bounds = this.bounds).move.apply(_bounds, arguments);
      return this;
    } }]);

  return Segment;
}();

var Spring = function (_Point) {
  inherits(Spring, _Point);

  function Spring(_ref) {
    var x = _ref.x,
    y = _ref.y,
    isFixed = _ref.isFixed,
    _ref$mass = _ref.mass,
    mass = _ref$mass === undefined ? 10 : _ref$mass,
    _ref$elasticity = _ref.elasticity,
    elasticity = _ref$elasticity === undefined ? 0.4 : _ref$elasticity,
    _ref$damping = _ref.damping,
    damping = _ref$damping === undefined ? 0.05 : _ref$damping;
    classCallCheck(this, Spring);

    var _this = possibleConstructorReturn(this, (Spring.__proto__ || Object.getPrototypeOf(Spring)).call(this, x, y));

    _this.attractors = [];

    _this.update = function (_ref2) {
      var pointer = _ref2.pointer;

      if (_this.isFixed) return;
      _this.setSpringForce();
      _this.setAdjacentForces();
      _this.solveVelocity();
    };

    _this.ox = x; // original origin x, never changes
    _this.oy = y; // original origin y, never changes
    _this.vx = 0; // velocity x
    _this.vy = 0; // velocity y
    _this.fx = 0; // force x
    _this.fy = 0; // force y

    _this.isFixed = isFixed; // indicates whether this point can be moved

    // spring constants
    _this.mass = mass;
    _this.elasticity = elasticity;
    _this.damping = damping;
    return _this;
  }

  createClass(Spring, [{
    key: 'applyForce',
    value: function applyForce(x, y) {
      this.fx += x;
      this.fy += y;
    } },
  {
    key: 'addAttractor',
    value: function addAttractor(point) {
      this.attractors = [].concat(toConsumableArray(this.attractors), [point]);
    } },
  {
    key: 'setAdjacentForces',
    value: function setAdjacentForces() {
      var _this2 = this;

      this.attractors.forEach(function (point, i) {
        var x = point.x,
        y = point.y;


        var force = { x: 0, y: 0 }; // prev point force
        var x1 = point.x,
        y1 = point.y;
        var x2 = _this2.x,
        y2 = _this2.y;


        force.x = x1 - x2;
        force.y = y1 - y2;

        // apply adjacent forces to current spring
        _this2.applyForce(force.x, force.y);
      });
    } },
  {
    key: 'setSpringForce',
    value: function setSpringForce() {
      // force to origin, difference multiplied by elasticity constant
      var fx = (this.ox - this.x) * this.elasticity;
      var fy = (this.oy - this.y) * this.elasticity;

      // sum forces
      this.fx += fx;
      this.fy += fy;
    } },
  {
    key: 'solveVelocity',
    value: function solveVelocity() {
      if (this.fx === 0 && this.fy === 0) return;

      // acceleration = force / mass;
      var ax = this.fx / this.mass;
      var ay = this.fy / this.mass;

      // velocity, apply damping then ad acceleration
      this.vx = this.damping * this.vx + ax;
      this.vy = this.damping * this.vy + ay;

      // add velocity to center and top/left
      this.x += this.vx;
      this.y += this.vy;

      // reset any applied forces
      this.fx = 0;
      this.fy = 0;
    } }]);

  return Spring;
}(Point);

var Stick = function () {
  function Stick(_ref) {
    var _this = this;

    var p1 = _ref.p1,
    p2 = _ref.p2,
    _ref$iterations = _ref.iterations,
    iterations = _ref$iterations === undefined ? 1 : _ref$iterations;
    classCallCheck(this, Stick);

    this.update = function () {
      if (_this.p1.isFixed && _this.p2.isFixed) return;
      _this.solveLinks();
    };

    this.p1 = p1;
    this.p2 = p2;
    this.restingDist = p1.distance(p2);
    this.iterations = Array(iterations).fill(null); // more solutions per frame, more accurate
  }

  createClass(Stick, [{
    key: "solveLinks",
    value: function solveLinks() {
      // verlet relax constraints solution
      // solve multiple time for accuracy
      var restingDist = this.restingDist,
      p1 = this.p1,
      p2 = this.p2,
      iterations = this.iterations;


      iterations.forEach(function () {
        // console.log(restingDist);
        var currentDist = p1.distance(p2);

        var _p2$delta = p2.delta(p1),
        _p2$delta2 = slicedToArray(_p2$delta, 2),
        diffX = _p2$delta2[0],
        diffY = _p2$delta2[1];

        // difference scalar


        var diff = restingDist - currentDist;
        var percent = diff / currentDist / 2;

        // translation for each axis
        // pushed 1/2 the required distance to match their resting distances.
        var translateX = diffX * percent;
        var translateY = diffY * percent;

        if (p1.isFixed) {
          p2.move(-translateX * 2, -translateY * 2);
          p2.applyForce(-translateX * 2, -translateY * 2);
        } else if (p2.isFixed) {
          p1.move(translateX * 2, translateY * 2);
          p1.applyForce(translateX * 2, translateY * 2);
        } else {
          p1.move(translateX, translateY);
          p1.applyForce(translateX * 2, translateY * 2);
          p2.move(-translateX, -translateY);
          p2.applyForce(-translateX * 2, -translateY * 2);
        }
      });
    } }]);

  return Stick;
}();

var Velocity = function () {
  function Velocity(vx, vy) {
    classCallCheck(this, Velocity);

    this.vx = vx;
    this.vy = vy;
  }

  createClass(Velocity, [{
    key: "flip",
    value: function flip() {
      // reflection on both axis
      this.vx *= -1;
      this.vy *= -1;
      return this;
    } },
  {
    key: "flipX",
    value: function flipX() {
      // reflection on x axis
      this.vx *= -1;
      return this;
    } },
  {
    key: "flipY",
    value: function flipY() {
      // reflection on y axis
      this.vy *= -1;
      return this;
    } },
  {
    key: "multiply",
    value: function multiply(scalar) {
      this.vx *= scalar;
      this.vy *= scalar;
      return this;
    } },
  {
    key: "divide",
    value: function divide(scalar) {
      this.vx /= scalar;
      this.vy /= scalar;
      return this;
    } }]);

  return Velocity;
}();


window.Bounds = Bounds;
window.Canvas = Canvas;
window.Entity = Entity;
window.Point = Point;
window.PointPhysics = PointPhysics;
window.Pointer = Pointer;
window.Segment = Segment;
window.Spring = Spring;
window.Stick = Stick;
window.Velocity = Velocity;
window.utils = utils;
// Inspired by:
// http://fabiensanglard.net/doom_fire_psx/
const DPR = window.devicePixelRatio || 1;
const CELL_WIDTH = 8 * DPR;
const CELL_HEIGHT = 8 * DPR;
const FLAME_COLOR_DEPTH = 24;
const FLAME_COLOR_TABLE = [
[0, 'lavender'],
[0.1, 'yellow'],
[0.3, 'gold'],
[0.5, 'hotpink'],
[0.6, 'tomato'],
[0.8, 'darkslateblue'],
[1, '#222']];

// direction the flame will spread from
const SPREAD_FROM = [
'bottom',
'bottom',
'bottom',
'bottom',
'bottom',
'bottom',
'bottom',
'bottom',
'bottom',
'bottom',
'left',
'left',
'right',
'right',
'top'];


function createGradientArray(size, colorStops) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = size;
  canvas.height = 1;

  const gradient = ctx.createLinearGradient(0, 0, size, 0);
  colorStops.forEach(args => gradient.addColorStop(...args));

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, 1);

  return Array(size).
  fill(null).
  map((_, x) => {
    const data = ctx.getImageData(x, 0, 1, 1).data;
    return `rgb(${data[0]}, ${data[1]}, ${data[2]})`;
  });
}

class Pixel {
  constructor(x, y, arr, idx) {_defineProperty(this, "draw",













    ({ ctx }) => {
      const fill = this.arr[this.idx];
      ctx.fillStyle = fill;
      ctx.fillRect(this.x, this.y, CELL_WIDTH, CELL_HEIGHT);
    });_defineProperty(this, "update",

    () => {
      const side = SPREAD_FROM[getRandomInt(0, SPREAD_FROM.length - 1)];
      const dest = this[side];

      // check if it can dest to designated side
      if (dest && dest.idx < this.idx) {
        const rand = getRandomInt(-1, 4);
        this.idx = dest.idx + rand;
      } else {
        this.idx += 1;
      }

      // resets if overflow
      if (this.idx > this.arr.length - 1) {
        this.idx = this.arr.length - 1;
      } else if (this.idx < 0) {
        this.idx = 0;
      }
    });this.x = x;this.y = y;this.idx = idx;this.arr = arr;}setSides({ top, left, bottom, right }) {this.top = top;this.left = left;this.bottom = bottom;this.right = right;}}


class Matrix {constructor() {_defineProperty(this, "setup",

































    context => this.createMatrix(context));_defineProperty(this, "resize",

    context => this.createMatrix(context));_defineProperty(this, "draw",

    ({ ctx, pointer, tick, bounds }) => {
      let { x, y } = pointer.position;
      let pointCol, pointRow;
      if (x !== null && y !== null) {
        // pointer
        pointCol = Math.floor(x / CELL_WIDTH);
        pointRow = Math.floor(y / CELL_HEIGHT);
      } else {
        // demo circle
        const z = tick / 10;
        const s = bounds.h / 4;
        const { center: c } = bounds;
        pointCol = Math.floor((c.x + Math.sin(z) * s) / CELL_WIDTH);
        pointRow = Math.floor((c.y + Math.cos(z) * s) / CELL_HEIGHT);
      }

      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.columns; col++) {
          const pixel = this.pixels[row][col];
          if (pointRow === row && pointCol === col) {
            pixel.idx = 0;
          }

          pixel.draw({ ctx });
          pixel.update();
        }
      }
    });}createMatrix({ bounds }) {const colors = createGradientArray(FLAME_COLOR_DEPTH, FLAME_COLOR_TABLE);this.rows = Math.ceil(bounds.h / CELL_HEIGHT);this.columns = Math.ceil(bounds.w / CELL_WIDTH);const table = Array(this.rows).fill(Array(this.columns).fill(null));this.pixels = table.map((row, y) => row.map((col, x) => new Pixel(x * CELL_WIDTH, y * CELL_HEIGHT, colors, y >= this.rows - 2 ? 0 : colors.length - 1)));for (let row = 0; row < this.rows; row++) {for (let col = 0; col < this.columns; col++) {const bounds = { top: this.pixels[row - 1] && this.pixels[row - 1][col], left: this.pixels[row][col - 1], bottom: this.pixels[row + 1] && this.pixels[row + 1][col], right: this.pixels[row][col + 1] };this.pixels[row][col].setSides(bounds);}}}}


const canvas = new Canvas({
  canvas: document.getElementById('canvas'),
  container: document.getElementById('container'),
  hasPointer: true,
  pauseInBackground: true,
  entities: [new Matrix()] });