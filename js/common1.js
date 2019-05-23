    //匀速
    function animate(obj, target) {

        clearInterval(obj.timerID);

        obj.timerID = setInterval(function () {

            //先获得它当前的位置
            var currentLeft = obj.offsetLeft;

            if (Math.abs(target - currentLeft) > 10) {

                //如果目标比当前位置大，就是往右走就给正10
                //否则-10
                var step = target > currentLeft ? 10 : -10;
                //在当前的位置上多加
                currentLeft += step;

                //设置给它的位置
                obj.style.left = currentLeft + "px";
            } else {

                obj.style.left = target + "px";
                clearInterval(obj.timerID);
            }

        }, 10);
    }


    //变速
    function shifting(obj, target) {

        clearInterval(obj.timerID);
        //先停止前一个计数器
        obj.timerID = setInterval(function () {
            //添加计数器
            var currentLeft = obj.offsetLeft;
            //先获得它当前的位置,
            var step = (target - currentLeft) / 10;
            //获得每次移动的步数
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            //判断变量step是否大于10
            //如果大于10就向下取整，如果小于10就向上取整
            currentLeft += step;
            //移动的步数等于每次移动的步数+上次的步数
            obj.style.left = currentLeft + "px";
            //赋值给元素中的left

            if (currentLeft == target) {
                //if判断，当走完的步数等于目的地步数时
                clearInterval(obj.timerID);
                //就停止计数器
            }
            console.log('目标的位置' + target + ',当前的位置' + currentLeft + ', 每次移动的步数' + step);
        }, 10);
    }



    //封装元素计算后的样式属性代码
    function getStyle(element, arr) {
        return window.getComputedStyle ? window.getComputedStyle(element, null)[arr] : element.currentStyle[arr];
        //适配不同的浏览器
    }


    //封装缓动动画增加任意一个属性
    function shiftingWill(element, arr, target) {

        clearInterval(element.timerID);
        //先停止前一个计数器
        element.timerID = setInterval(function () {
            //添加计数器
            var currentLeft = parseInt(getStyle(element, arr));
            //先获得它当前的位置,
            var step = (target - currentLeft) / 10;
            //获得每次移动的步数
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            //判断变量step是否大于10
            //如果大于10就向下取整，如果小于10就向上取整
            currentLeft += step;
            //移动的步数等于每次移动的步数+上次的步数
            element.style[arr] = currentLeft + "px";
            //赋值给元素中的left

            if (currentLeft == target) {
                //if判断，当走完的步数等于目的地步数时
                clearInterval(element.timerID);
                //就停止计数器
            }
            console.log('目标的位置' + target + ',当前的位置' + currentLeft + ', 每次移动的步数' + step);
        }, 10);
    }

    //封装缓动动画增加多个属性
    function multiAnimate(element, json) {

        clearInterval(element.timerID);
        //先停止前一个计数器
        element.timerID = setInterval(function () {
            //添加计数器
            var flag = true;
            //假设flag为真
            for (var arr in json) {
                //遍历对象
                var currentLeft = parseInt(getStyle(element, arr));
                //先获得它当前的位置,
                var target = json[arr];
                //把每次遍历过的对象值存储到step变量中
                var step = (target - currentLeft) / 10;
                //获得每次移动的步数
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                //判断变量step是否大于10
                //如果大于10就向下取整，如果小于10就向上取整
                currentLeft += step;
                //移动的步数等于每次移动的步数+上次的步数
                element.style[arr] = currentLeft + "px";
                //赋值给元素中的left
                if (currentLeft != target) {
                    //if判断要移动的步数是否等于目的地值，取反
                    flag = false;
                    //就改变flag的值
                }
            }
            if (flag) {
                //条件为false的时候执行下面代码
                clearInterval(element.timerID);
                //就停止计数器
            }
            console.log('目标的位置' + target + ',当前的位置' + currentLeft + ', 每次移动的步数' + step);
        }, 10);
    }


    //封装缓动动画增加多个属性和回调函数
    function multiAnimate(element, json, fn) {
        clearInterval(element.timerID);
        //先停止前一个计数器
        element.timerID = setInterval(function () {
            //添加计数器
            var flag = true;
            //假设flag为真
            for (var arr in json) {
                //遍历对象
                var currentLeft = parseInt(getStyle(element, arr));
                //先获得它当前的位置,
                var target = json[arr];
                //把每次遍历过的对象值存储到step变量中
                var step = (target - currentLeft) / 10;
                //获得每次移动的步数
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                //判断变量step是否大于10
                //如果大于10就向下取整，如果小于10就向上取整
                currentLeft += step;
                //移动的步数等于每次移动的步数+上次的步数
                element.style[arr] = currentLeft + "px";
                //赋值给元素中的left
                if (currentLeft != target) {
                    //if判断要移动的步数是否等于目的地值，取反
                    flag = false;
                    //就改变flag的值
                }
            }
            if (flag) {
                //条件为false的时候执行下面代码
                clearInterval(element.timerID);
                //就停止计数器
                if (fn) {
                    //所有的属性到达目的地的时候才执行这段代码，但前提是用户传入了这个函数
                    fn();
                }
            }
            console.log('目标的位置' + target + ',当前的位置' + currentLeft + ', 每次移动的步数' + step);
        }, 10);
    }


    //封装缓动动画增加多个属性和回调函数及透明度和层级
    function mAnimate(element, json, fn) {
        clearInterval(element.timerID);
        //先停止前一个计数器
        element.timerID = setInterval(function () {
            //添加计数器
            var flag = true;
            //假设flag为真
            for (var arr in json) {
                //遍历对象
                if (arr == "opacity") {
                    var currentLeft = getStyle(element, arr) * 100;
                    var target = json[arr] * 100;
                    var step = (target - currentLeft) / 10;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    currentLeft += step;
                    element.style[arr] = currentLeft / 100;
                } else if (arr == "zIndex") {
                    element.style[arr] = json[arr];
                } else {
                    var currentLeft = parseInt(getStyle(element, arr));
                    //先获得它当前的位置,
                    var target = json[arr];
                    //把每次遍历过的对象值存储到step变量中
                    var step = (target - currentLeft) / 10;
                    //获得每次移动的步数
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    //判断变量step是否大于10
                    //如果大于10就向下取整，如果小于10就向上取整
                    currentLeft += step;
                    //移动的步数等于每次移动的步数+上次的步数
                    element.style[arr] = currentLeft + "px";
                    //赋值给元素中的left
                }

                if (currentLeft != target) {
                    //if判断要移动的步数是否等于目的地值，取反
                    flag = false;
                    //就改变flag的值
                }
            }
            if (flag) {
                //条件为false的时候执行下面代码
                clearInterval(element.timerID);
                //就停止计数器
                if (fn) {
                    //所有的属性到达目的地的时候才执行这段代码，但前提是用户传入了这个函数
                    fn();
                }
            }
            //测试代码
            // console.log('目标的位置' + target + ',当前的位置' + currentLeft + ', 每次移动的步数' + step);
        }, 30);
    }



    /**
     * Created by 彭林 on 2017/7/1.
     */
    /***
     * 根据id获取页面元素
     * @param string  id id名
     * @returns {Element} 返回的元素
     */
    function id(id) {
        return document.getElementById(id);
    }


    /**
     * 获取元素的文本
     * @param ele 要获取文本的那个元素
     * @returns {*} 返回的文本值
     */
    function getText(ele) {
        //能力检测，判断执行当前这个代码的浏览器是否能使用textContent
        if (typeof ele.textContent == "string") {
            return ele.textContent;
        } else {
            //如果不支持textContent，就是ie8及他之前的浏览器，那肯定是支持innerText。
            return ele.innerText;
        }
    }



    /**
     * 封装一个函数，用来设置元素的文本
     * @param ele 就是要设置文本的元素
     * @param text 就是要设置的文本
     */
    function setText(ele, text) {
        //能力检测
        if (typeof ele.textContent == "string") {
            ele.textContent = text;
        } else {
            ele.innerText = text;
        }
    }



    /**
     * 获取下一个元素节点，
     * @param ele 元素
     * @returns {*} 返回值， 元素的下一个元素节点
     */
    function getNextElement(ele) {
        //能力检测-去判断执行当前这个代码的浏览器是否支持这个东西
        if (ele.nextElementSibling) {
            return ele.nextElementSibling;
        } else {
            //如果不支持nextElementSibling，那就是ie8及以前的浏览器。
            var node = ele.nextSibling;
            while (node.nodeType != 1) {
                node = node.nextSibling;
            }
            return node;
        }
    }

    //3.要获取上一个元素节点， 做兼容
    function getPreviousElement(ele) {
        //能力检测
        if (ele.previousElementSibling) {
            return ele.previousElementSibling;
        } else {
            //ie8及以前不支持previousElementSibling。 支持previousSibling
            var node = ele.previousSibling;
            while (node.nodeType != 1) {
                node = node.previousSibling;
            }
            return node;
        }
    }


    //3.获取元素的第一个子元素节点 ,  做兼容处理
    function getFirstElementChild(ele) {
        //能力检测
        if (ele.firstElementChild) {
            return ele.firstElementChild;
        } else {
            //到这里了就说明是ie8及以前的浏览器，不支持firstElementChild，但是支持firstChild。
            var node = ele.firstChild;
            while (node.nodeType != 1) {
                node = node.nextSibling;
            }
            return node;
        }
    }

    //3.获取最后一个子元素节点  兼容处理
    function getLastElementChild(ele) {
        //能力检测
        if (ele.lastElementChild) {
            return ele.lastElementChild;
        } else {
            //ie8及以前的浏览器不支持lastElementChild，但是他支持lastChild
            var node = ele.lastChild;
            while (node.nodeType != 1) {
                node = node.previousSibling;
            }
            return node;
        }
    }

    //scrollTop与scrollLest的兼容性
    function getScroll() {
        return {
            top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
            left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
        }
    }



    /**
     * 获得样式的兼容函数
     */
    function getStyle(obj, attr) {
        if (window.getComputedStyle) {
            return getComputedStyle(obj)[attr];
        } else {
            return obj.currentStyle[attr];
        }
    }

    /**
     * 获得页面滚出去的距离
     */
    function getPageScroll() {

        var sTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        var sLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;

        return {
            'scrollLeft': sLeft,
            'scrollTop': sTop
        };
    }


    /**
     * 获取事件对象相对于页面左上角的坐标
     * @param {传入事件对象} e 
     */
    function getEventPagePoint(e) {
        e = e || window.event;
        var pageX = e.clientX + getPageScroll().scrollLeft;
        var pageY = e.clientY + getPageScroll().scrollTop;

        return {
            'pageX': pageX,
            'pageY': pageY
        }
    }