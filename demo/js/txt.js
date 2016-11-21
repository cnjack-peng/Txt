(function(root, doc) {

  var Txt, debugMode, selection, utils = {} , doBackList , doGoList ;
  var toString = Object.prototype.toString;
  var slice = Array.prototype.slice;

  // 允许的命令列表
  var commandsReg = {
    block: /^(?:p|h[1-6]|blockquote|pre)$/,
    inline: /^(?:bold|italic|underline|insertorderedlist|insertunorderedlist|indent|outdent)$/,
    source: /^(?:createlink|unlink)$/,
    insert: /^(?:inserthorizontalrule|insertimage|insert)$/,
    wrap: /^(?:code)$/
  };

  var lineBreakReg = /^(?:blockquote|pre|div)$/i;

  var effectNodeReg = /(?:[pubia]|h[1-6]|blockquote|[uo]l|li)/i;

  var strReg = {
    whiteSpace: /(^\s+)|(\s+$)/g,
    mailTo: /^(?!mailto:|.+\/|.+#|.+\?)(.*@.*\..+)$/,
    http: /^(?!\w+?:\/\/|mailto:|\/|\.\/|\?|#)(.*)$/
  };

  var autoLinkReg = {
    url: /((https?|ftp):\/\/|www\.)[^\s<]{3,}/gi,
    prefix: /^(?:https?|ftp):\/\//i,
    notLink: /^(?:img|a|input|audio|video|source|code|pre|script|head|title|style)$/i,
    maxLength: 100
  };

  // 类型检测
  utils.is = function(obj, type) {
    return toString.call(obj).slice(8, -1) === type;
  };

  utils.forEach = function(obj, iterator, arrayLike) {
    if (!obj) return;
    if (arrayLike == null) arrayLike = utils.is(obj, 'Array');
    if (arrayLike) {
      for (var i = 0, l = obj.length; i < l; i++) iterator(obj[i], i, obj);
    } else {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) iterator(obj[key], key, obj);
      }
    }
  };

  // 复制对象
  utils.copy = function(defaults, source) {
    utils.forEach(source, function (value, key) {
      defaults[key] = utils.is(value, 'Object') ? utils.copy({}, value) :
        utils.is(value, 'Array') ? utils.copy([], value) : value;
    });
    return defaults;
  };

  // log 日志
  utils.log = function(message, force) {
    if (debugMode || force)
      console.log('%cTxt DEBUGGER: %c' + message, 'font-family:arial,sans-serif;color:RGBA(255, 192, 203, 1.00);line-height:2em;', 'font-family:cursor,monospace;color:#333;');
  };

  //延后执行
  utils.delayExec = function (fn) {
    var timer = null;
    return function (delay) {
      clearTimeout(timer);
      timer = setTimeout(function() {
        fn();
      }, delay || 1);
    };
  };


  utils.merge = function(config) {

    // 默认设置
    var defaults = {
      class: 'txt',
      debug: false,
      toolbar: null, // custom toolbar
      stay: config.stay || !config.debug,
      stayMsg: 'Are you going to leave here?',
      textarea: '<textarea name="content"></textarea>',
      list: [
        'doback','dogo','blockquote', 'h1','h2', 'h3','h4',  'p', 'code', 'insertorderedlist', 'insertunorderedlist', 'inserthorizontalrule',
        'indent', 'outdent', 'bold', 'italic', 'underline', 'createlink', 'insertimage'
      ],
      titles: {},
      cleanAttrs: ['id', 'class', 'style', 'name'],
      cleanTags: ['script'],
      linksInNewWindow: false
    };

    // 配置
    if (config.nodeType === 1) {
      defaults.editor = config;
    } else if (config.match && config.match(/^#[\S]+$/)) {
      defaults.editor = doc.getElementById(config.slice(1));
    } else {
      defaults = utils.copy(defaults, config);
    }

    return defaults;
  };

  function commandOverall(ctx, cmd, val) {
    var message = ' 执行 「' + cmd + '」' + (val ? (' 命令 : ' + val) : '');

    try {
      doc.execCommand(cmd, false, val);
    } catch(err) {
      // TODO: there's an error when insert a image to document, but not a bug
      return utils.log('失败 ' + message, true);
    }

    utils.log('成功' + message);
  }

  function commandInsert(ctx, name, val) {
    var node = getNode(ctx);
    if (!node) return;
    ctx._range.selectNode(node);
    ctx._range.collapse(false);

    // 插入图片，影藏menu
    if(name === 'insertimage' && ctx._menu) toggleNode(ctx._menu, true);

    return commandOverall(ctx, name, val);
  }



  function commandBlock(ctx, name) {
    var list = effectNode(ctx, getNode(ctx), true);
    if (list.indexOf(name) !== -1) name = 'p';
    return commandOverall(ctx, 'formatblock', name);
  }

  function commandWrap(ctx, tag, value) {
    value = '<' + tag + '>' + (value||selection.toString()) + '</' + tag + '>';
    return commandOverall(ctx, 'insertHTML', value);
  }

  function commandLink(ctx, tag, value) {
    if (this && this.config.linksInNewWindow) {
      value = '< a href="' + value + '" target="_blank">' + (selection.toString()) + '</a>';
      return commandOverall(ctx, 'insertHTML', value);
    } else {
      return commandOverall(ctx, tag, value);
    }
  }


  function initPreview(ctx){
    var preView = $('<div></div>');
    preView.html('<div>qwwqqw</div>');
    $('#mdcontent').after(preView)
  }


  function initToolbar(ctx) {
    var icons = '', inputStr = '<input class="txt-input" placeholder="http://" />' , _icon = '';

    ctx._toolbar = ctx.config.toolbar;
    if (!ctx._toolbar) {
      var toolList = ctx.config.list;
      utils.forEach(toolList, function (name) {
        console.warn(name);
        var klass = 'txt-icon icon-' + name;
        var title = ctx.config.titles[name] || '';
        icons += `<i class="${klass}" data-action="${name}" title="${title}"></i>`

      }, true);
      console.warn(`&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&`);
      console.warn(toolList);
      console.warn(`&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&`);
      if (toolList.indexOf('createlink') >= 0 || toolList.indexOf('insertimage') >= 0)
        icons += inputStr;
    } else if (ctx._toolbar.querySelectorAll('[data-action=createlink]').length ||
      ctx._toolbar.querySelectorAll('[data-action=insertimage]').length) {
      icons += inputStr;
    }

    if (icons) {
      ctx._menu = doc.createElement('div');
      ctx._menu.setAttribute('class', ctx.config.class + '-menu txt-menu   tools-height');
      ctx._menu.innerHTML = icons;
      ctx._inputBar = ctx._menu.querySelector('input');
      toggleNode(ctx._menu, true);
      console.warn(doc.getElementById('nav2'));
      doc.getElementById('nav2').appendChild(ctx._menu)
    }
    if (ctx._toolbar && ctx._inputBar) toggleNode(ctx._inputBar);
  }

  function initEvents(ctx) {
    var toolbar = ctx._toolbar || ctx._menu, editor = ctx.config.editor;

    var toggleMenu = utils.delayExec(function() {
      ctx.highlight().menu();
    });
    var outsideClick = function() {};

    function updateStatus(delay) {
      ctx._range = ctx.getRange();
      toggleMenu(delay);
    }

    if (ctx._menu) {
      var setpos = function() {
        if (ctx._menu.style.display === 'block') ctx.menu();
      };

      // resize / scroll 改变 offset
      addListener(ctx, root, 'resize', setpos);
      addListener(ctx, root, 'scroll', setpos);

      // toolbar 显示隐藏
      var selecting = false;
      addListener(ctx, editor, 'mousedown', function() {
        selecting = true;
      });
      addListener(ctx, editor, 'mouseleave', function() {
        if (selecting) updateStatus(800);
        selecting = false;
      });
      addListener(ctx, editor, 'mouseup', function() {
        if (selecting) updateStatus(100);
        selecting = false;
      });
      // 离开编辑器 menu 隐藏
      outsideClick = function(e) {
        if (ctx._menu && !containsNode(editor, e.target) && !containsNode(ctx._menu, e.target)) {
          removeListener(ctx, doc, 'click', outsideClick);
          toggleMenu(100);
        }
      };
    } else {
      addListener(ctx, editor, 'click', function() {
        updateStatus(0);
      });
    }

    addListener(ctx, editor, 'keyup', function(e) {
      if (e.which === 8 && ctx.isEmpty()) return lineBreak(ctx, true);
      // 选中的显示隐藏toolbar
      if (e.which !== 13 || e.shiftKey) return updateStatus(400);
      var node = getNode(ctx, true);
      if (!node || !node.nextSibling || !lineBreakReg.test(node.nodeName)) return;
      if (node.nodeName !== node.nextSibling.nodeName) return;
      // hack for webkit 'enter'
      if (node.lastChild.nodeName !== 'BR') node.appendChild(doc.createElement('br'));
      utils.forEach(node.nextSibling.childNodes, function(child) {
        if (child) node.appendChild(child);
      }, true);
      node.parentNode.removeChild(node.nextSibling);
      focusNode(ctx, node.lastChild, ctx.getRange());
    });

    // 检查 lineBreakReg
    addListener(ctx, editor, 'keydown', function(e) {
      console.log(`keydown `);

      if (e.which == 13) {
      root.doBackList.unshift($('#mdcontent').html());
      // console.log(doBackList);
    }


      editor.classList.remove('txt-placeholder');
      if (e.which !== 13 || e.shiftKey) return;
      var node = getNode(ctx, true);
      if (!node || !lineBreakReg.test(node.nodeName)) return;
      var lastChild = node.lastChild;
      if (!lastChild || !lastChild.previousSibling) return;
      if (lastChild.previousSibling.textContent || lastChild.textContent) return;
      e.preventDefault();
      var p = doc.createElement('p');
      p.innerHTML = '<br>';
      node.removeChild(lastChild);
      if (!node.nextSibling) node.parentNode.appendChild(p);
      else node.parentNode.insertBefore(p, node.nextSibling);
      focusNode(ctx, p, ctx.getRange());
    });

    var menuApply = function(action, value) {
      ctx.execCommand(action, value);
      ctx._range = ctx.getRange();
      ctx.highlight().menu();
    };

    // 切换选中的功能
    addListener(ctx, toolbar, 'click', function(e) {

      console.warn();
      var node = e.target, action;

      while (node !== toolbar && !(action = node.getAttribute('data-action'))) {
        node = node.parentNode;
      }

      if (!action) return;
      if (!/(?:createlink)|(?:insertimage)/.test(action)) return menuApply(action);
      if (!ctx._inputBar) return;

      // 创建Link
      var input = ctx._inputBar;
      if (toolbar === ctx._menu) toggleNode(input);
      else {
        ctx._inputActive = true;
        ctx.menu();
      }
      if (ctx._menu.style.display === 'none') return;

      setTimeout(function() { input.focus(); }, 400);
      var createlink = function() {
        var inputValue = input.value;

        if (!inputValue) action = 'unlink';
        else {
          inputValue = input.value
            .replace(strReg.whiteSpace, '')
            .replace(strReg.mailTo, 'mailto:$1')
            .replace(strReg.http, 'http://$1');
        }
        menuApply(action, inputValue);
        if (toolbar === ctx._menu) toggleNode(input, false);
        else toggleNode(ctx._menu, true);
      };

      input.onkeypress = function(e) {
        if (e.which === 13) return createlink();
      };

    });

    // 监听 placeholder
    addListener(ctx, editor, 'focus', function() {
      if (ctx.isEmpty()) lineBreak(ctx, true);
      addListener(ctx, doc, 'click', outsideClick);
    });

    addListener(ctx, editor, 'blur', function() {
      checkPlaceholder(ctx);
      ctx.checkContentChange();
    });

    // 监听 paste 粘贴
    addListener(ctx, editor, 'paste', function() {
      setTimeout(function() {
        ctx.cleanContent();
      });
    });
  }

  function addListener(ctx, target, type, listener) {
    if (ctx._events.hasOwnProperty(type)) {
      ctx._events[type].push(listener);
    } else {
      ctx._eventTargets = ctx._eventTargets || [];
      ctx._eventsCache = ctx._eventsCache || [];
      var index = ctx._eventTargets.indexOf(target);
      if (index < 0) index = ctx._eventTargets.push(target) - 1;
      ctx._eventsCache[index] = ctx._eventsCache[index] || {};
      ctx._eventsCache[index][type] = ctx._eventsCache[index][type] || [];
      ctx._eventsCache[index][type].push(listener);

      target.addEventListener(type, listener, false);
    }
    return ctx;
  }

  // 触发自定义事件
  function triggerListener(ctx, type) {
    if (!ctx._events.hasOwnProperty(type)) return;
    var args = slice.call(arguments, 2);
    utils.forEach(ctx._events[type], function (listener) {
      listener.apply(ctx, args);
    });
  }

  function removeListener(ctx, target, type, listener) {
    var events = ctx._events[type];
    if (!events) {
      var _index = ctx._eventTargets.indexOf(target);
      if (_index >= 0) events = ctx._eventsCache[_index][type];
    }
    if (!events) return ctx;
    var index = events.indexOf(listener);
    if (index >= 0) events.splice(index, 1);
    target.removeEventListener(type, listener, false);
    return ctx;
  }

  function removeAllListeners(ctx) {
    utils.forEach(this._events, function (events) {
      events.length = 0;
    }, false);
    if (!ctx._eventsCache) return ctx;
    utils.forEach(ctx._eventsCache, function (events, index) {
      var target = ctx._eventTargets[index];
      utils.forEach(events, function (listeners, type) {
        utils.forEach(listeners, function (listener) {
          target.removeEventListener(type, listener, false);
        }, true);
      }, false);
    }, true);
    ctx._eventTargets = [];
    ctx._eventsCache = [];
    return ctx;
  }

  function checkPlaceholder(ctx) {
    ctx.config.editor.classList[ctx.isEmpty() ? 'add' : 'remove']('txt-placeholder');
  }

  function trim(str) {
    return (str || '').replace(/^\s+|\s+$/g, '');
  }

  // node.contains IE10/IE11 兼容
  function containsNode(parent, child) {
    if (parent === child) return true;
    child = child.parentNode;
    while (child) {
      if (child === parent) return true;
      child = child.parentNode;
    }
    return false;
  }

  function getNode(ctx, byRoot) {
    var node, root = ctx.config.editor;
    ctx._range = ctx._range || ctx.getRange();
    node = ctx._range.commonAncestorContainer;
    if (!node || node === root) return null;
    while (node && (node.nodeType !== 1) && (node.parentNode !== root)) node = node.parentNode;
    while (node && byRoot && (node.parentNode !== root)) node = node.parentNode;
    return containsNode(root, node) ? node : null;
  }

  // node
  function effectNode(ctx, el, returnAsNodeName) {
    var nodes = [];
    el = el || ctx.config.editor;
    while (el && el !== ctx.config.editor) {
      if (el.nodeName.match(effectNodeReg)) {
        nodes.push(returnAsNodeName ? el.nodeName.toLowerCase() : el);
      }
      el = el.parentNode;
    }
    return nodes;
  }

  // breakout from node
  function lineBreak(ctx, empty) {
    var range = ctx._range = ctx.getRange(), node = doc.createElement('p');
    if (empty) ctx.config.editor.innerHTML = '';
    node.innerHTML = '<br>';
    range.insertNode(node);
    focusNode(ctx, node.childNodes[0], range);
  }

  function focusNode(ctx, node, range) {
    range.setStartAfter(node);
    range.setEndBefore(node);
    range.collapse(false);
    ctx.setRange(range);
  }

  function autoLink(node) {
    if (node.nodeType === 1) {
      if (autoLinkReg.notLink.test(node.tagName)) return;
      utils.forEach(node.childNodes, function (child) {
        autoLink(child);
      }, true);
    } else if (node.nodeType === 3) {
      var result = urlToLink(node.nodeValue || '');
      if (!result.links) return;
      var frag = doc.createDocumentFragment(),
        div = doc.createElement('div');
      div.innerHTML = result.text;
      while (div.childNodes.length) frag.appendChild(div.childNodes[0]);
      node.parentNode.replaceChild(frag, node);
    }
  }

  function urlToLink(str) {
    var count = 0;
    str = str.replace(autoLinkReg.url, function(url) {
      var realUrl = url, displayUrl = url;
      count++;
      if (url.length > autoLinkReg.maxLength) displayUrl = url.slice(0, autoLinkReg.maxLength) + '...';
      // 如果需要添加HTTP前缀
      if (!autoLinkReg.prefix.test(realUrl)) realUrl = 'http://' + realUrl;
      return '<a href="' + realUrl + '">' + displayUrl + '</a>';
    });
    return {links: count, text: str};
  }

  function toggleNode(node, hide) {
    node.style.display = hide ? 'block' : 'block';
  }

  Txt = function(config) {

    if (!config) throw new Error('Can\'t find config');

    debugMode = config.debug;

    // 用户默认配置
    var defaults = utils.merge(config);

    var editor = defaults.editor;

    if (!editor || editor.nodeType !== 1) throw new Error('Can\'t find editor');

    // 默认样式
    editor.classList.add(defaults.class);

    // 可编辑属性
    editor.setAttribute('contenteditable', 'true');

    // 定义配置
    this.config = defaults;

    // placeholder
    if (defaults.placeholder) editor.setAttribute('data-placeholder', defaults.placeholder);
    checkPlaceholder(this);

    // 保存选择对象
    this.selection = selection;

    // 定义事件
    this._events = {change: []};

    // 初始化 Toolbar menu
    initToolbar(this);

    // 初始化 预览图
    initPreview(this);


    // 初始化事件
    initEvents(this);

    // 检查内容更改
    this._prevContent = this.getContent();

    // 影藏markdown
    if (this.markdown) this.markdown.init(this);

    // 当前页面
    if (this.config.stay) this.stay(this.config);

    if(this.config.input) {
      this.addOnSubmitListener(this.config.input);
    }
  };

  Txt.prototype.on = function(type, listener) {
    addListener(this, this.config.editor, type, listener);
    return this;
  };

  Txt.prototype.addOnSubmitListener = function(inputElement) {
    var form = inputElement.form;
    var me = this;
    form.addEventListener("submit", function() {
      inputElement.value = me.config.saveAsMarkdown ? me.toMd(me.config.editor.innerHTML) : me.config.editor.innerHTML;
    });
  };

  Txt.prototype.isEmpty = function(node) {
    node = node || this.config.editor;
    return !(node.querySelector('img')) && !(node.querySelector('blockquote')) &&
      !(node.querySelector('li')) && !trim(node.textContent);
  };

  Txt.prototype.getContent = function() {
    return this.isEmpty() ?  '' : trim(this.config.editor.innerHTML);
  };

  Txt.prototype.setContent = function(html) {
    this.config.editor.innerHTML = html;
    this.cleanContent();
    return this;
  };

  Txt.prototype.checkContentChange = function () {
    var prevContent = this._prevContent, currentContent = this.getContent();
    if (prevContent === currentContent) return;
    this._prevContent = currentContent;
    triggerListener(this, 'change', currentContent, prevContent);
  };

  Txt.prototype.getRange = function() {
    var editor = this.config.editor, range = selection.rangeCount && selection.getRangeAt(0);
    if (!range) range = doc.createRange();
    if (!containsNode(editor, range.commonAncestorContainer)) {
      range.selectNodeContents(editor);
      range.collapse(false);
    }
    return range;
  };

  Txt.prototype.setRange = function(range) {
    range = range || this._range;
    if (!range) {
      range = this.getRange();
      range.collapse(false);
    }
    try {
      selection.removeAllRanges();
      selection.addRange(range);
    } catch (e) {}
    return this;
  };

  Txt.prototype.focus = function(focusStart) {
    if (!focusStart) this.setRange();
    this.config.editor.focus();
    return this;
  };

  Txt.prototype.doBack = function() {
    var doBackList = root.doBackList
    var doGoList = root.doGoList
    console.log(doBackList);
    if (!doBackList[0]){
      $('#mdcontent').html('')
        return
      }
    var data = doBackList.shift()
    doGoList.unshift(data)
    console.warn(data);
    $('#mdcontent').html(data)
    $('#mdcontent').focus()
    console.log(doBackList);
    console.log(doGoList);
  };

  Txt.prototype.doGo = function(){
    var doBackList = root.doBackList
    var doGoList = root.doGoList
    console.log(!doGoList[0]);
    if (!doGoList[0]){
      return
    }
    $('#mdcontent').html(doGoList[0])
    $('#mdcontent').focus()
    var data = doGoList.shift()
    doBackList.unshift(data)
  }

  Txt.prototype.execCommand = function(name, value) {
    name = name.toLowerCase();
    this.setRange();

    if(root.doBackList == null){
      root.doBackList = []
    }
    switch (name) {
      case 'doback':
        this.doBack()
        return
        break;
      case 'dogo':
        this.doGo()
        return
        break;
      default:

    }

    if (commandsReg.block.test(name)) {
      commandBlock(this, name);
    } else if (commandsReg.inline.test(name)) {
      commandOverall(this, name, value);
    } else if (commandsReg.source.test(name)) {
      commandLink(this, name, value);
    } else if (commandsReg.insert.test(name)) {
      commandInsert(this, name, value);
    } else if (commandsReg.wrap.test(name)) {
      commandWrap(this, name, value);
    } else {
      // this.doBack()
      utils.log('系统没有命令函数 ，名称是: ' + name + (value ? (', value: ' + value) : ''), true);
    }
    if (name === 'indent') this.checkContentChange();
    else this.cleanContent({cleanAttrs: ['style']});

    console.warn(this._prevContent);
    root.doBackList.unshift(this._prevContent);
    // 限制 doBackList 长度 20
    if (root.doBackList.length > 20) {
        root.doBackList.pop();
    }

  };

  // remove attrs and tags
  // Txt.cleanContent({cleanAttrs: ['style'], cleanTags: ['id']})
  Txt.prototype.cleanContent = function(options) {
    var editor = this.config.editor;

    if (!options) options = this.config;
    utils.forEach(options.cleanAttrs, function (attr) {
      utils.forEach(editor.querySelectorAll('[' + attr + ']'), function(item) {
        item.removeAttribute(attr);
      }, true);
    }, true);
    utils.forEach(options.cleanTags, function (tag) {
      utils.forEach(editor.querySelectorAll(tag), function(item) {
        item.parentNode.removeChild(item);
      }, true);
    }, true);

    checkPlaceholder(this);
    this.checkContentChange();
    return this;
  };

  // 自动链接内容、返回内容
  Txt.prototype.autoLink = function() {
    autoLink(this.config.editor);
    return this.getContent();
  };

  // 高亮显示的菜单
  Txt.prototype.highlight = function() {
    var toolbar = this._toolbar || this._menu
      , node = getNode(this);
    // 移除所有高亮
    utils.forEach(toolbar.querySelectorAll('.active'), function(el) {
      el.classList.remove('active');
    }, true);

    if (!node) return this;

    var effects = effectNode(this, node)
      , inputBar = this._inputBar
      , highlight;

    if (inputBar && toolbar === this._menu) {
      inputBar.style.display = 'none';
      // 重置链接输入值
      inputBar.value = '';
    }

    highlight = function(str) {
      if (!str) return;
      var el = toolbar.querySelector('[data-action=' + str + ']');
      return el && el.classList.add('active');
    };
    utils.forEach(effects, function(item) {
      var tag = item.nodeName.toLowerCase();
      switch(tag) {
        case 'a':
          if (inputBar) inputBar.value = item.getAttribute('href');
          tag = 'createlink';
          break;
        case 'img':
          if (inputBar) inputBar.value = item.getAttribute('src');
          tag = 'insertimage';
          break;
        case 'i':
          tag = 'italic';
          break;
        case 'u':
          tag = 'underline';
          break;
        case 'b':
          tag = 'bold';
          break;
        case 'pre':
        case 'code':
          tag = 'code';
          break;
        case 'ul':
          tag = 'insertunorderedlist';
          break;
        case 'ol':
          tag = 'insertorderedlist';
          break;
        case 'li':
          tag = 'indent';
          break;
      }
      highlight(tag);
    }, true);

    return this;
  };


  //显示预览
  Txt.prototype.preView = function(){

  }


  // 显示menu
  Txt.prototype.menu = function() {
    if (!this._menu) return this;
    if (selection.isCollapsed) {
      this._menu.style.display = 'block';
      this._inputActive = false;
      return this;
    }
    if (this._toolbar) {
      if (!this._inputBar || !this._inputActive) return this;
    }
    var offset = this._range.getBoundingClientRect()
      , menuPadding = 10
      , top = offset.top - menuPadding
      , left = offset.left + (offset.width / 2)
      , menu = this._menu
      , menuOffset = {x: 0, y: 0}
      , stylesheet = this._stylesheet;


    if (offset.width === 0 && offset.height === 0) return this;

    //菜单水平样式表
    if (this._stylesheet === undefined) {
      var style = document.createElement("style");
      document.head.appendChild(style);
      this._stylesheet = stylesheet = style.sheet;
    }
    menu.style.display = 'block';

    menuOffset.x = left - (menu.clientWidth / 2);
    menuOffset.y = top - menu.clientHeight;


    if (stylesheet.cssRules.length > 0) {
      stylesheet.deleteRule(0);
    }
    if (menuOffset.x < 0) {
      menuOffset.x = 0;
      stylesheet.insertRule('.txt-menu:after {left: ' + left + 'px;}', 0);
    } else {
      stylesheet.insertRule('.txt-menu:after {left: 50%; }', 0);
    }
    if (menuOffset.y < 0) {
      menu.classList.add('txt-menu-below');
      menuOffset.y = offset.top + offset.height + menuPadding;
    } else {
      menu.classList.remove('txt-menu-below');
    }

    return this;
  };

  Txt.prototype.stay = function(config) {
    var ctx = this;
    if (!window.onbeforeunload) {
      window.onbeforeunload = function() {
        if (!ctx._isDestroyed) return config.stayMsg;
      };
    }
  };

  Txt.prototype.destroy = function(isAJoke) {
    var destroy = isAJoke ? false : true
      , attr = isAJoke ? 'setAttribute' : 'removeAttribute';

    if (!isAJoke) {
      removeAllListeners(this);
      try {
        selection.removeAllRanges();
        if (this._menu) this._menu.parentNode.removeChild(this._menu);
      } catch (e) { }
    } else {
      initToolbar(this);
      initEvents(this);
    }
    this._isDestroyed = destroy;
    this.config.editor[attr]('contenteditable', '');

    return this;
  };

  Txt.prototype.rebuild = function() {
    return this.destroy('it\'s a joke');
  };

  root.Txt = function(config) {
    if (!config) return utils.log('配置失败', true);

    var defaults = utils.merge(config)
      , klass = defaults.editor.getAttribute('class');

    klass = klass ? klass.replace(/\btxt\b/g, '') + ' txt-textarea ' + defaults.class : 'txt txt-textarea';
    defaults.editor.setAttribute('class', klass);
    defaults.editor.innerHTML = defaults.textarea;
    return defaults.editor;
  };
  root.doBackList = []
  root.doGoList = []
  // 导出markdown
  var regs = {
    a: [/<a\b[^>]*href=["']([^"]+|[^']+)\b[^>]*>(.*?)<\/a>/ig, '[$2]($1)'],
    img: [/<img\b[^>]*src=["']([^\"+|[^']+)[^>]*>/ig, '![]($1)'],
    b: [/<b\b[^>]*>(.*?)<\/b>/ig, '**$1**'],
    i: [/<i\b[^>]*>(.*?)<\/i>/ig, '***$1***'],
    h: [/<h([1-6])\b[^>]*>(.*?)<\/h\1>/ig, function(a, b, c) {
      return '\n' + ('######'.slice(0, b)) + ' ' + c + '\n';
    }],
    li: [/<(li)\b[^>]*>(.*?)<\/\1>/ig, '* $2\n'],
    blockquote: [/<(blockquote)\b[^>]*>(.*?)<\/\1>/ig, '\n> $2\n'],
    pre: [/<pre\b[^>]*>(.*?)<\/pre>/ig, '\n```\n$1\n```\n'],
    code: [/<code\b[^>]*>(.*?)<\/code>/ig, '\n`\n$1\n`\n'],
    p: [/<p\b[^>]*>(.*?)<\/p>/ig, '\n$1\n'],
    hr: [/<hr\b[^>]*>/ig, '\n---\n']
  };

  Txt.prototype.toMd = function() {
    var html = this.getContent()
          .replace(/\n+/g, '') // 移除 line break
          .replace(/<([uo])l\b[^>]*>(.*?)<\/\1l>/ig, '$2'); // 移除 ul/ol

    for(var p in regs) {
      if (regs.hasOwnProperty(p))
        html = html.replace.apply(html, regs[p]);
    }
    return html.replace(/\*{5}/g, '**');
  };

  // 外界触手
  if (doc.getSelection) {
    selection = doc.getSelection();
    root.Txt = Txt;
  }

}(window, document));
