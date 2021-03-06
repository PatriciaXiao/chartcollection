// Generated by CoffeeScript 1.11.1
(function() {
  var c3, initialize, initialized,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    slice = [].slice,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  c3 = (function() {
    function c3() {}

    c3.version = "0.1";

    c3.select = function(parent, query, before, children_only) {
      return new c3.Selection(parent, query, before, children_only);
    };

    return c3;

  })();

  this.c3 = c3;

  if ((typeof module !== "undefined" && module !== null)) {
    module.exports = c3;
  }

  if (typeof d3 === "undefined" || d3 === null) {
    throw Error("D3 library is required for C3");
  }

  c3.util = (function() {
    function util() {}

    util.extend = function(dest, src) {
      var k, v;
      if (src != null) {
        for (k in src) {
          v = src[k];
          dest[k] = v;
        }
        return dest;
      }
    };

    util.defaults = function(dest, src) {
      var k, v;
      if (src != null) {
        for (k in src) {
          v = src[k];
          if (dest[k] == null) {
            dest[k] = v;
          }
        }
        return dest;
      }
    };

    util.spin = function(ms) {
      var start;
      start = new Date();
      while (new Date() - start < ms) {
        null;
      }
    };

    util.isEmpty = function(obj) {
      var property;
      for (property in obj) {
        return false;
      }
      return true;
    };

    return util;

  })();

  c3.array = (function() {
    function array() {}

    array.remove_item = function(arr, item) {
      return arr.splice(arr.indexOf(item), 1);
    };

    array.sort_up = function(arr, accessor) {
      if (accessor == null) {
        accessor = function(d) {
          return d;
        };
      }
      if (typeof crossfilter !== "undefined" && crossfilter !== null) {
        crossfilter.quicksort.by(accessor)(arr, 0, arr.length);
        return arr;
      } else {
        return arr.sort(function(a, b) {
          return accessor(a) - accessor(b);
        });
      }
    };

    array.sort_down = function(arr, accessor) {
      if (typeof crossfilter !== "undefined" && crossfilter !== null) {
        c3.array.sort_up(arr, function(d) {
          return -accessor(d);
        });
        return arr;
      } else {
        return arr.sort(function(a, b) {
          return accessor(b) - accessor(a);
        });
      }
    };

    return array;

  })();

  c3.http = (function() {
    function http() {}

    http.deparam = function(string, key) {
      var l, len, pair, params, ref, split;
      if (!string) {
        return (key ? null : {});
      }
      params = {};
      ref = string.split('&');
      for (l = 0, len = ref.length; l < len; l++) {
        pair = ref[l];
        split = pair.split('=');
        if (split[0] === key) {
          return (split[1] != null ? split[1] : '');
        }
        params[split[0]] = split[1];
      }
      if (key) {
        return null;
      } else {
        return params;
      }
    };

    http.deparam_query = function(key) {
      return c3.http.deparam(document.location.search.slice(1), key);
    };

    return http;

  })();

  c3.html = (function() {
    var escapes, token, tokens;

    function html() {}

    escapes = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
      ',': '&#44;'
    };

    tokens = '[' + ((function() {
      var results;
      results = [];
      for (token in escapes) {
        results.push(token);
      }
      return results;
    })()) + ']';

    html.escape = function(string) {
      return String(string).replace(RegExp(tokens, 'g'), function(d) {
        return escapes[d];
      });
    };

    return html;

  })();

  c3.d3 = (function() {
    function d3() {}

    d3.set_range = function(scale, interval) {
      var ref;
      if (interval[0] === 0 && interval[1] === 0) {
        interval = [0, 1];
      }
      return (ref = scale != null ? typeof scale.rangePoints === "function" ? scale.rangePoints(interval) : void 0 : void 0) != null ? ref : scale != null ? scale.range(interval) : void 0;
    };

    return d3;

  })();

  c3.functor = function(f) {
    if (typeof f === 'function') {
      return f;
    } else {
      return function() {
        return f;
      };
    }
  };

  c3.Layout = (function() {
    function Layout() {}

    return Layout;

  })();

  c3.Layout.Tree = (function() {
    function Tree(options) {
      this.layout = bind(this.layout, this);
      this.revalue = bind(this.revalue, this);
      this.construct = bind(this.construct, this);
      c3.util.extend(this, options);
    }

    Tree.prototype.construct = function(data) {
      var build_nodes, child, child_key, child_node, datum, key, l, len, len1, len2, len3, len4, m, n, name1, node, nodes, o, old_node, old_nodes, p, parent_key, parent_node, ref, ref1, ref2, root, roots, set_depth;
      old_nodes = this.nodes;
      nodes = {};
      if (this.parent_key != null) {
        this.root_nodes = [];
        for (l = 0, len = data.length; l < len; l++) {
          datum = data[l];
          node = nodes[name1 = this.key(datum)] != null ? nodes[name1] : nodes[name1] = {
            children: []
          };
          node.datum = datum;
          parent_key = this.parent_key(datum);
          if (parent_key != null) {
            parent_node = nodes[parent_key];
            if (parent_node != null) {
              parent_node.children.push(node);
            } else {
              parent_node = nodes[parent_key] = {
                children: [node]
              };
            }
            node.parent = parent_node;
          } else {
            this.root_nodes.push(node);
          }
        }
        set_depth = function(node, depth) {
          var child, len1, m, ref, results;
          node.y1 = depth;
          node.y2 = depth + 1;
          ref = node.children;
          results = [];
          for (m = 0, len1 = ref.length; m < len1; m++) {
            child = ref[m];
            results.push(set_depth(child, depth + 1));
          }
          return results;
        };
        ref = this.root_nodes;
        for (m = 0, len1 = ref.length; m < len1; m++) {
          node = ref[m];
          set_depth(node, 0);
        }
      } else if (this.children_keys != null) {
        roots = {};
        for (n = 0, len2 = data.length; n < len2; n++) {
          datum = data[n];
          key = this.key(datum);
          nodes[key] = {
            datum: datum,
            children: this.children_keys(datum)
          };
          roots[key] = true;
        }
        for (key in nodes) {
          node = nodes[key];
          node.children = (function() {
            var len3, len4, o, p, ref1, ref2, results;
            if (node.children != null) {
              ref1 = node.children;
              for (o = 0, len3 = ref1.length; o < len3; o++) {
                child_key = ref1[o];
                roots[child_key] = false;
                child_node = nodes[child_key];
                if (child_node == null) {
                  throw Error("Missing child node");
                }
                child_node.parent = node;
              }
              ref2 = node.children;
              results = [];
              for (p = 0, len4 = ref2.length; p < len4; p++) {
                child_key = ref2[p];
                results.push(nodes[child_key]);
              }
              return results;
            } else {
              return [];
            }
          })();
        }
        this.root_nodes = (function() {
          var results;
          results = [];
          for (root in roots) {
            if (root) {
              results.push(nodes[key]);
            }
          }
          return results;
        })();
        set_depth = function(node, depth) {
          var child, len3, o, ref1, results;
          node.y1 = depth;
          node.y2 = depth + 1;
          ref1 = node.children;
          results = [];
          for (o = 0, len3 = ref1.length; o < len3; o++) {
            child = ref1[o];
            results.push(set_depth(child, depth + 1));
          }
          return results;
        };
        ref1 = this.root_nodes;
        for (o = 0, len3 = ref1.length; o < len3; o++) {
          node = ref1[o];
          set_depth(node, 0);
        }
      } else {
        build_nodes = (function(_this) {
          return function(datum, depth, parent) {
            var child;
            return node = nodes[_this.key(datum)] = {
              datum: datum,
              parent: parent,
              y1: depth,
              y2: depth + 1,
              children: (function() {
                var len4, p, ref2, ref3, results;
                ref3 = (ref2 = typeof this.children === "function" ? this.children(datum) : void 0) != null ? ref2 : [];
                results = [];
                for (p = 0, len4 = ref3.length; p < len4; p++) {
                  child = ref3[p];
                  results.push(build_nodes(child, depth + 1, null));
                }
                return results;
              }).call(_this)
            };
          };
        })(this);
        this.root_nodes = (function() {
          var len4, p, results;
          results = [];
          for (p = 0, len4 = data.length; p < len4; p++) {
            datum = data[p];
            results.push(build_nodes(datum, 0));
          }
          return results;
        })();
        for (key in nodes) {
          node = nodes[key];
          ref2 = node.children;
          for (p = 0, len4 = ref2.length; p < len4; p++) {
            child = ref2[p];
            child.parent = node;
          }
        }
      }
      if (old_nodes != null) {
        for (key in nodes) {
          node = nodes[key];
          old_node = old_nodes[key];
          if (old_node != null) {
            node.x1 = node.px1 = old_node.x1;
            node.x2 = node.px2 = old_node.x2;
            node.py1 = old_node.y1;
            node.py2 = old_node.y2;
          }
        }
      }
      return this.nodes = nodes;
    };

    Tree.prototype.revalue = function() {
      var compute_values, key, l, len, node, ref, ref1, self_value;
      if (this.self_value != null) {
        self_value = this.self_value;
        compute_values = function(node) {
          var child, l, len, ref;
          node.value = self_value(node.datum);
          ref = node.children;
          for (l = 0, len = ref.length; l < len; l++) {
            child = ref[l];
            node.value += compute_values(child);
          }
          return node.value;
        };
        ref = this.root_nodes;
        for (l = 0, len = ref.length; l < len; l++) {
          node = ref[l];
          compute_values(node, 0);
        }
        return (function(_this) {
          return function(d) {
            return _this.nodes[_this.key(d)].value;
          };
        })(this);
      }
      if (this.value != null) {
        ref1 = this.nodes;
        for (key in ref1) {
          node = ref1[key];
          node.value = this.value(node.datum);
        }
        return this.value;
      } else {
        throw Error("Tree layout must define either `value` or `self_value` option.");
      }
    };

    Tree.prototype.layout = function(sort1, limit_min_percent, root_datum) {
      var collect_nodes, current_data, l, len, limit_min, node, partition, ref, ref1, ref2, root_domain, root_node, sort, total_value;
      this.sort = sort1 != null ? sort1 : false;
      if (limit_min_percent == null) {
        limit_min_percent = 0;
      }
      if (root_datum == null) {
        root_datum = null;
      }
      sort = (function() {
        switch (this.sort) {
          case true:
            return function(node) {
              return -node.value;
            };
          case false:
          case null:
            return null;
          default:
            return (function(_this) {
              return function(node) {
                return -_this.sort(node.datum);
              };
            })(this);
        }
      }).call(this);
      total_value = 0;
      ref = this.root_nodes;
      for (l = 0, len = ref.length; l < len; l++) {
        node = ref[l];
        total_value += node.value;
      }
      root_node = root_datum != null ? this.nodes[this.key(root_datum)] : null;
      limit_min = limit_min_percent * (((root_node != null ? root_node.value : void 0) / total_value) || 1);
      partition = (function(_this) {
        return function(nodes, domain, total) {
          var angle, delta, dx, len1, len2, m, n, start;
          delta = domain[1] - domain[0];
          angle = domain[0];
          if (!total || delta < limit_min) {
            for (m = 0, len1 = nodes.length; m < len1; m++) {
              node = nodes[m];
              if (node.px1 === angle && node.px2 === angle && node.x1 === angle && node.x2 === angle) {
                continue;
              }
              node.px1 = node.x1;
              node.px2 = node.x2;
              node.py1 = node.y1;
              node.py2 = node.y2;
              node.x1 = angle;
              node.x2 = angle;
              if (node.children.length) {
                partition(node.children, domain, 0);
              }
            }
            return false;
          } else {
            if (sort) {
              c3.array.sort_up(nodes, sort);
            }
            dx = delta / total;
            for (n = 0, len2 = nodes.length; n < len2; n++) {
              node = nodes[n];
              node.px1 = node.x1;
              node.px2 = node.x2;
              node.py1 = node.y1;
              node.py2 = node.y2;
              node.x1 = start = angle;
              node.x2 = angle += dx * node.value;
              if (node.children.length) {
                partition(node.children, [start, angle], node.value);
              }
            }
            return true;
          }
        };
      })(this);
      partition(this.root_nodes, [0, 1], total_value);
      current_data = [];
      root_domain = [(ref1 = root_node != null ? root_node.x1 : void 0) != null ? ref1 : 0, (ref2 = root_node != null ? root_node.x2 : void 0) != null ? ref2 : 1];
      collect_nodes = function(nodes) {
        var len1, m;
        for (m = 0, len1 = nodes.length; m < len1; m++) {
          node = nodes[m];
          if (node.x2 - node.x1 > limit_min && node.x2 > root_domain[0] && node.x1 < root_domain[1]) {
            current_data.push(node.datum);
            if (node.children.length) {
              collect_nodes(node.children);
            }
          }
        }
        return null;
      };
      collect_nodes(this.root_nodes);
      return current_data;
    };

    return Tree;

  })();

  c3.Selection = (function() {
    function Selection() {}

    return Selection;

  })();

  c3.Selection.Options = (function() {
    function Options() {}

    Options.prototype["class"] = void 0;

    Options.prototype.classes = void 0;

    Options.prototype.styles = void 0;

    Options.prototype.events = void 0;

    Options.prototype.text = void 0;

    Options.prototype.html = void 0;

    Options.prototype.title = void 0;

    Options.prototype.animate = void 0;

    Options.prototype.duration = void 0;

    Options.prototype.animate_old = void 0;

    return Options;

  })();

  c3.Selection = (function() {
    Selection.prototype.all = d3.select();

    Selection.prototype["new"] = d3.select();

    Selection.prototype.old = d3.select();

    Selection.prototype.opt = {};

    Selection.prototype.opt_array = void 0;

    function Selection(d3_selection, query1, before1, children_only) {
      var ref, ref1, ref2;
      if (d3_selection == null) {
        d3_selection = d3.select();
      }
      this.query = query1;
      this.before = before1;
      this.node = bind(this.node, this);
      this.style = bind(this.style, this);
      this.position_tweens = bind(this.position_tweens, this);
      this.position = bind(this.position, this);
      this.update = bind(this.update, this);
      this.remove = bind(this.remove, this);
      this.bind = bind(this.bind, this);
      this.singleton = bind(this.singleton, this);
      this.inherit = bind(this.inherit, this);
      if (this.query) {
        if (indexOf.call(this.query, '|') >= 0) {
          ref = this.query.split('|'), this.namespace = ref[0], this.query = ref[1];
        }
        ref1 = this.query.split(' ').slice(-1)[0].split(/\.(.+)/), this.tag = ref1[0], this._query_class = ref1[1];
        if (this.namespace) {
          this.tag = this.namespace + ':' + this.tag;
        }
        this._query_class = (ref2 = this._query_class) != null ? ref2.replace('.', ' ') : void 0;
        if (d3_selection != null) {
          this.all = d3_selection.selectAll(this.query);
          if (children_only) {
            this.all = this.all.filter(function() {
              return d3_selection.some((function(_this) {
                return function(nodes) {
                  var ref3;
                  return ref3 = _this.parentNode, indexOf.call(nodes, ref3) >= 0;
                };
              })(this));
            });
          }
        }
      } else {
        this.all = d3_selection;
      }
    }

    Selection.prototype.select = function(query, before, children_only) {
      return new c3.Selection(this.all, query, before, children_only);
    };

    Selection.prototype.inherit = function(query, create, prepend) {
      var child;
      if (create == null) {
        create = true;
      }
      if (prepend == null) {
        prepend = false;
      }
      child = new c3.Selection(null, query);
      if (create) {
        child["new"] = this["new"].insert(child.tag, (prepend ? ':first-child' : null));
        if (create === 'restore' && child["new"].empty() && !this.all.empty()) {
          this.all.each(function() {
            var child_node, parent;
            parent = d3.select(this);
            child_node = parent.selectAll(child.tag).data(parent.data()).enter().append(child.tag);
            if (child._query_class != null) {
              return child_node.classed(child._query_class, true);
            }
          });
        }
        if (child._query_class != null) {
          child["new"].classed(child._query_class, true);
        }
      }
      child.all = this.all.select(query);
      child.old = this.old.select(query);
      return child;
    };

    Selection.prototype.singleton = function(datum) {
      return this.bind([datum]);
    };

    Selection.prototype.bind = function(data, key1) {
      var animate, ref;
      this.key = key1;
      if (!this.tag) {
        throw "Cannot bind() a selection that doesn't have a selection query set";
      }
      animate = this._animate && this.opt.duration && (((ref = this.opt.styles) != null ? ref.opacity : void 0) == null);
      this.all = this.all.data(data, this.key);
      if (animate) {
        this.all.style('opacity', 1).interrupt('binding');
      }
      this["new"] = this.all.enter().insert(this.tag, this.before);
      this.old = this.all.exit();
      if (this._query_class != null) {
        this["new"].classed(this._query_class, true);
      }
      if (animate) {
        this["new"].style('opacity', 0);
        this["new"].transition('binding').duration(this.opt.duration).style('opacity', 1);
        this.old.transition('binding').duration(this.opt.duration).style('opacity', 0).remove();
      } else {
        this.old.remove();
      }
      return this;
    };

    Selection.prototype.remove = function() {
      if (this._animate) {
        return this.all.duration(this.opt.duration).style('opacity', 0).remove();
      } else {
        return this.all.remove();
      }
    };

    Selection.prototype.options = function(opt1, opt_accessor1) {
      var base;
      this.opt = opt1 != null ? opt1 : {};
      this.opt_accessor = opt_accessor1;
      if ((base = this.opt).duration == null) {
        base.duration = 750;
      }
      return this;
    };

    Selection.prototype.animate = function(animate) {
      if (animate == null) {
        animate = true;
      }
      if (this.opt == null) {
        throw "Please call options() before animate()";
      }
      this._animate = animate && this.opt.animate;
      return this;
    };

    Selection.prototype.update = function() {
      var opt_accessor, selection, self;
      if (this.opt["class"] != null) {
        this["new"].attr('class', this.opt["class"]);
      }
      if (this._query_class != null) {
        this["new"].classed(this._query_class, true);
      }
      if (this.opt.html != null) {
        this.all.html(this.opt.html);
      } else if (this.opt.text != null) {
        this.all.text(this.opt.text);
      }
      if (this.opt.title != null) {
        selection = (typeof this.opt.title === 'function' ? this.all : this["new"]);
        if (this.all.node() instanceof SVGElement) {
          this["new"].append('title');
          if (selection.length <= 1) {
            selection.select('title').text(this.opt.title);
          } else {
            self = this;
            selection.each(function(d, i, j) {
              return d3.select(this).selectAll('title').text(self.opt.title(d, i, j));
            });
          }
        } else {
          selection.attr('title', this.opt.title);
        }
      }
      if (this.opt.events != null) {
        this["new"].on(this.opt.events);
      }
      if (this.opt_accessor != null) {
        opt_accessor = this.opt_accessor;
        this.all.each(function(d, i, j) {
          var node, opt, title;
          if (opt = opt_accessor(d, i, j)) {
            node = d3.select(this);
            if (opt.events != null) {
              node.on(opt.events);
            }
            if (opt.title != null) {
              if (this instanceof SVGElement) {
                title = node.selectAll('title').data([d]);
                title.enter().append('title');
                title.text(opt.title);
              } else {
                node.attr('title', opt.title);
              }
            }
            if (opt.html != null) {
              return node.html(opt.html);
            } else if (opt.text != null) {
              return node.text(opt.text);
            }
          }
        });
      }
      return this;
    };

    Selection.prototype.position = function(attrs, old_attrs) {
      var selection;
      if (this._animate) {
        this["new"].attr(old_attrs != null ? old_attrs : attrs);
        selection = this.all.transition('position.attrs').duration(this.opt.duration);
      } else {
        selection = this.all;
      }
      selection.attr(attrs);
      if (this._animate && this.opt.animate_old) {
        this.old.transition('position.attrs').duration(this.opt.duration).attr(attrs);
      }
      return this;
    };

    Selection.prototype.position_tweens = function(attrs) {
      var name, transition, tween;
      transition = this.all.transition('position.tweens').duration(this._animate ? this.opt.duration : 0);
      for (name in attrs) {
        tween = attrs[name];
        transition.attrTween(name, tween);
      }
      if (this._animate && this.opt.animate_old) {
        transition = this.old.transition('position.tweens').duration(this.opt.duration);
        for (name in attrs) {
          tween = attrs[name];
          transition.attrTween(name, tween);
        }
      }
      return this;
    };

    Selection.prototype.style = function(style_new) {
      var opt_accessor, selection;
      selection = style_new && (this.key != null) ? this["new"] : this.all;
      if ((this.opt["class"] != null) && typeof this.opt["class"] === 'function') {
        selection.attr('class', this.opt["class"]);
        if (this._query_class != null) {
          selection.classed(this._query_class, true);
        }
      }
      if (this.opt.classes != null) {
        selection.classed(this.opt.classes);
      }
      if (this.opt.styles != null) {
        selection.style(this.opt.styles);
      }
      if (this.opt_accessor != null) {
        opt_accessor = this.opt_accessor;
        selection.each(function(d, i, j) {
          var node, opt;
          if (opt = opt_accessor(d, i, j)) {
            node = d3.select(this);
            if (opt["class"] != null) {
              node.classed((typeof opt["class"] === 'function' ? opt["class"](d, i, j) : opt["class"]), true);
            }
            if (opt.classes != null) {
              node.classed(opt.classes);
            }
            if (opt.styles != null) {
              return node.style(opt.styles);
            }
          }
        });
      }
      return this;
    };

    Selection.prototype.node = function() {
      return this.all.node();
    };

    return Selection;

  })();

  c3.Dispatch = (function() {
    function Dispatch() {
      this.dispatcher = {};
    }

    Dispatch.prototype.on = function(event, handler) {
      var base, namespace, ref;
      ref = event.split('.'), event = ref[0], namespace = ref[1];
      if ((base = this.dispatcher)[event] == null) {
        base[event] = {};
      }
      if (handler) {
        return this.dispatcher[event][namespace] = handler;
      } else {
        return delete this.dispatcher[event][namespace];
      }
    };

    Dispatch.prototype.trigger = function() {
      var args, event, handler, handlers, namespace;
      event = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      if ((handlers = this.dispatcher[event]) != null) {
        for (namespace in handlers) {
          handler = handlers[namespace];
          handler.apply(this, args);
        }
      }
    };

    return Dispatch;

  })();

  c3.Base = (function() {
    Base._next_uid = 0;

    Base.prototype.anchor = void 0;

    Base.prototype.height = void 0;

    Base.prototype.width = void 0;

    Base.prototype.anchor_styles = void 0;

    Base.prototype.handlers = void 0;

    function Base(opt) {
      this.restyle = bind(this.restyle, this);
      this.redraw = bind(this.redraw, this);
      this.resize = bind(this.resize, this);
      this.render = bind(this.render, this);
      initialize();
      c3.util.extend(this, new c3.Dispatch);
      c3.util.extend(this, opt);
      this.uid = c3.Base._next_uid++;
    }

    Base.prototype.render = function(opt) {
      c3.util.extend(this, opt);
      this.trigger('render_start');
      this.init();
      this.trigger('render');
      this.trigger('resize_start');
      if (!this.rendered) {
        this.size(this.width, this.height);
      } else {
        this.size();
      }
      this.trigger('resize');
      this.trigger('redraw_start', 'render');
      this.update('render');
      this.draw('render');
      this.trigger('redraw', 'render');
      this.trigger('restyle_start', false);
      this.style(true);
      this.trigger('restyle', false);
      this.rendered = true;
      this.trigger('rendered');
      return this;
    };

    Base.prototype.resize = function(width, height) {
      if (this.rendered) {
        this.trigger('resize_start');
        this.size(width, height);
        this.trigger('resize');
        this.trigger('redraw_start', 'resize');
        this.draw('resize');
        this.trigger('redraw', 'resize');
        return this;
      }
    };

    Base.prototype.redraw = function(origin) {
      if (origin == null) {
        origin = 'redraw';
      }
      if (this.rendered) {
        this.trigger('redraw_start', origin);
        this.update(origin);
        this.draw(origin);
        this.trigger('redraw', origin);
        this.trigger('restyle_start', true);
        this.style(true);
        this.trigger('restyle', true);
        return this;
      }
    };

    Base.prototype.restyle = function() {
      if (this.rendered) {
        this.trigger('restyle_start', false);
        this.style(false);
        this.trigger('restyle', false);
        return this;
      }
    };

    Base.prototype.init = function() {
      this._prep();
      return this._init();
    };

    Base.prototype._prep = function() {
      var anchor_selector, d3_anchor, event, handler, ref, results;
      anchor_selector = this.anchor;
      if (this.anchor == null) {
        this.anchor = document.createElement('div');
      }
      d3_anchor = d3.select(this.anchor);
      this.anchor = d3_anchor.node();
      if (!this.anchor) {
        throw "Unable to find anchor: " + anchor_selector;
      }
      if (this.anchor_styles != null) {
        d3_anchor.style(this.anchor_styles);
      }
      if (this.handlers != null) {
        ref = this.handlers;
        results = [];
        for (event in ref) {
          handler = ref[event];
          results.push(this.on(event, handler));
        }
        return results;
      }
    };

    Base.prototype._init = function() {};

    Base.prototype.size = function(width, height) {
      if (width != null) {
        this.anchor.style.width = (typeof width === 'number' ? width + 'px' : width);
      }
      if (height != null) {
        this.anchor.style.height = (typeof height === 'number' ? height + 'px' : height);
      }
      this.width = this.anchor.offsetWidth;
      this.height = this.anchor.offsetHeight;
      return this._size();
    };

    Base.prototype._size = function() {};

    Base.prototype.update = function(origin) {
      return this._update(origin);
    };

    Base.prototype._update = function() {};

    Base.prototype.draw = function(origin) {
      return this._draw(origin);
    };

    Base.prototype._draw = function() {};

    Base.prototype.style = function(style_new) {
      return this._style(style_new);
    };

    Base.prototype._style = function() {};

    return Base;

  })();

  c3.Chart = (function(superClass) {
    extend(Chart, superClass);

    function Chart() {
      return Chart.__super__.constructor.apply(this, arguments);
    }

    Chart.prototype.type = 'chart';

    Chart.prototype["class"] = void 0;

    Chart.prototype.options = void 0;

    Chart.prototype.content_options = void 0;

    Chart.prototype.init = function() {
      var prototype;
      this._prep();
      this.svg = c3.select(d3.select(this.anchor), 'svg', null, true).singleton().options(this.options).update();
      this.svg.all.attr('class', 'c3 ' + (this["class"] != null ? this["class"] : '')).attr('height', '100%').attr('width', '100%').on('contextmenu', function() {
        return d3.event.preventDefault();
      });
      this.content = this.svg.select('g.content', null, true).singleton().options(this.content_options).update();
      prototype = Object.getPrototypeOf(this);
      while (prototype) {
        if (prototype.type != null) {
          this.svg.all.classed(prototype.type, true);
          this.content.all.classed(prototype.type, true);
        }
        prototype = Object.getPrototypeOf(prototype);
      }
      return this._init();
    };

    Chart.prototype.style = function() {
      this.svg.style();
      this.content.style();
      return Chart.__super__.style.apply(this, arguments);
    };

    return Chart;

  })(c3.Base);

  initialized = false;

  initialize = function() {
    var fade_left, fade_right, mask_fade_left, mask_fade_right;
    if (!initialized) {
      if (!c3.global_svg) {
        c3.global_svg = d3.select('body').append('svg').attr('class', 'c3 global');
        c3.global_defs = c3.global_svg.append('defs');
        fade_right = c3.global_defs.append('linearGradient').attr('id', 'gradient_for_mask_fade_right');
        fade_right.append('stop').attr('offset', 0.5).attr('stop-color', 'white').attr('stop-opacity', 1);
        fade_right.append('stop').attr('offset', 0.9).attr('stop-color', 'white').attr('stop-opacity', 0);
        fade_left = c3.global_defs.append('linearGradient').attr('id', 'gradient_for_mask_fade_left');
        fade_left.append('stop').attr('offset', 0.1).attr('stop-color', 'white').attr('stop-opacity', 0);
        fade_left.append('stop').attr('offset', 0.5).attr('stop-color', 'white').attr('stop-opacity', 1);
        mask_fade_right = c3.global_defs.append('mask').attr('id', 'mask_fade_right').attr('maskContentUnits', 'objectBoundingBox').attr('x', -1).attr('y', '-500000%').attr('height', '1000000%').attr('width', 2).append('rect').attr('x', -1).attr('y', -500000).attr('height', 1000000).attr('width', 2).attr('fill', "url(#" + (fade_right.attr('id')) + ")");
        mask_fade_left = c3.global_defs.append('mask').attr('id', 'mask_fade_left').attr('maskContentUnits', 'objectBoundingBox').attr('y', '-500000%').attr('height', '1000000%').attr('width', 2).append('rect').attr('y', -500000).attr('height', 1000000).attr('width', 2).attr('fill', "url(#" + (fade_left.attr('id')) + ")");
      }
      return initialized = true;
    }
  };

}).call(this);

//# sourceMappingURL=c3.js.map
