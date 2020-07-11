/**
 * alinx.js
 * author : Tisserand David
 * version 1.0
 * Date : 2020-02-18
 *
 * NEED JQuery
 */


function Alinx(node, options) {
    node = node || '.alinx';
    obj = {};

    // DEFAULT OPTION
    var defaults = {
        complete: false,
        loader: false,
    }
    obj.options = $.extend({}, defaults, options);

    obj.init = function(node) {
        $(document).on('click', node, function(e) {
            e.preventDefault();
            var item = $(this);
            var output = item.data('output') || '#ajax-content';
            if (obj.options.loader) {
                $(output).html(obj.options.loader);
            }
            var url = item.data('url');
            $.ajax(url)
                .done(function(r) {
                    if (r.success) {
                        if (r.meta) {
                            if (r.url && r.meta.title) { window.history.pushState({"html":r.html,"pageTitle":r.meta.title},"", r.url); }
                            if (r.meta.title) { document.title = r.meta.title; }
                            if (r.meta.author) {
                                $('meta[name=author]').attr('content', r.meta.author);
                            }
                            if (r.meta.description) {
                                $('meta[name=description]').attr('content', r.meta.description);
                            }
                            if (r.meta.keywords) {
                                $('meta[name=keywords]').attr('content', r.meta.keywords);
                            }                            
                        }
                        $(output).html(r.html);
                        if (obj.options.complete && typeof obj.options.complete == 'function')
                            obj.options.complete(r, item);
                    } else {
                        console.log(r.error);
                    }
                })
                .fail(function(){
                    console.log('REQUEST FAILED TO "'+url+'"');
                });
            return false;
        });
    }
    obj.init(node); 
}