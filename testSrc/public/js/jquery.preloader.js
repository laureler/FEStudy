/**
加载提示处理：在加载完成后隐藏提示信息
*/
(function($) {

    /**
     * jQuery preloader plugin
     * @param params，具有参数:
     selector：提示控件选择器（默认为“#preloader”）
     removeType：提示控件移除方式：fade，渐隐（默认）；remove，直接移除
     fadeDuration：渐隐时长（单位为毫秒，默认为750）
     delay：在加载完成后，处理隐藏的延时时长（单位为毫秒，默认为0）
     * @returns {*}
     * 使用方法：
     * $("body").preloader();
     */
    $.fn.preloader = function(params) {

        /**
         * Plugin options
         */
        var options = $.extend({
            selector: '#preloader',
            type: 'document',
            removeType: 'fade',
            fadeDuration: 750,
            delay: 0
        }, params);

        /**
         * Preloader container holder
         * @type {null}
         */
        var element = null;

        /**
         * Initialize plugin
         */
        function init() {
            element = $(options.selector);
        }

        /**
         * Run plugin main event
         */
        function run() {
            switch (options.type) {
                case 'document':
                default:
                    setTimeout(function(){
                        enforceRemove();
                    }, options.delay);
                    break;
            }
        }

        /**
         * Enforce remove process
         */
        function enforceRemove() {
            switch (options.removeType) {
                case 'fade':
                    fadeOut();
                    break;
                case 'remove':
                default:
                    remove();
                    break;
            }
        }

        /**
         * Direct remove
         * @returns {*}
         */
        function remove() {
            return element.remove();
        }

        /**
         * Fade-out remove
         * @returns {*|{opacity}}
         */
        function fadeOut() {
            return element.fadeOut(
                options.fadeDuration,
                afterCallback()
            );
        }

        /**
         * After fade-out remove
         * @returns {Function}
         */
        function afterCallback() {
            return function(){
                element.remove();
            }
        }

        /*
         * Init plugin
         */
        init();

        /**
         * Return
         */
        return this.ready(function(){
            $(this).trigger('preloader:before');

            run();

            $(this).trigger('preloader:after');
        });
    }

}(jQuery));