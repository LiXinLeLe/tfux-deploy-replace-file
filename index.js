'use strict';


module.exports = function (options, modified, total, next) {

    if (!options.from || typeof options.to === 'undefined') {
        fis.log.error('Invalid, please set option: {from: `reg/string` to: `function/string` }');
    }

    var fileData = (function(){
        var content, data;
        for (var i = 0; i < modified.length; i++) {
            if (modified[i].url === options.to) {
                content = modified[i]._content;
                if (typeof content === 'object') {
                    data = content.toString();
                }
                if (typeof content === 'string') {
                    data = content;
                }
                break;
            }
        }
        return data;
    })();


    modified.forEach(function (file) {
        if (file.isText() || typeof(file.getContent()) === 'string') {
            var content = file.getContent();

            if (fis.util.is(options.from, 'String')) {
                options.from = new RegExp(fis.util.escapeReg(options.from), 'g');
            }

            if (!fis.util.is(options.from, 'RegExp')) {
                fis.log.error('fis3-deploy-replace: option.from must a string or RegExp.');
            }

            var result = content;

            if (typeof content === 'string' || content instanceof String) {
                result = content.replace(options.from, fileData);
            }

            file.setContent(result);

            if (result !== content) {
                fis.log.debug('Replace from %s to %s in file [%s]', options.from, options.to, file);
            }

        }
    });
    next();
};
