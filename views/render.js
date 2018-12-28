const fs = require('fs');

function render(fileName, data) {
    let response = fs.readFileSync(__dirname + `/${fileName}.html`, 'utf-8');
    let expressionsMatcherRegex = /<%([^%>]+)?%>/g, match;
    let jsFunctionsRegex = /(^( )?(if|for|else|switch|case|break{|}))(.*)?/g;
    let functionBodyString = 'let htmlStringArray=[];';
    let currentCursor = 0;
    let addCode = function (line, js) {
        if (js) {
            if (line.startsWith('file')) {
                /**
                 * In case expression starts with file. then render it recursively
                 */
                let renderedNestedFile = render(line.substr(5), data);
                // .replace expression to replace " to \" (escaping)
                functionBodyString += 'htmlStringArray.push("' + renderedNestedFile.replace(/"/g, '\\"') + '");\n';
            } else if (line.match(jsFunctionsRegex)) {
                /**
                 * If the line is javascript expressions for|if|else add it as it is.
                 */
                functionBodyString += line;
            } else {
                functionBodyString += 'htmlStringArray.push(' + line + ');\n';
            }
        } else {
            line = line.replace(/"/g, '\\"');
            if (line) {
                functionBodyString += 'htmlStringArray.push("' + line + '");';
            }
        }
    };

    /**
     * While still matching expressions e.g. <%someVariable%>.
     * The match variable will have:
     * - matching <%variableName%> as first element [0]
     * - variableName as second element [1]
     * - .index as currentCursor position
     */
    // noinspection JSAssignmentUsedAsCondition
    while (match = expressionsMatcherRegex.exec(response)) {
        let matchedExpression = match[1];
        addCode(response.slice(currentCursor, match.index));
        addCode(matchedExpression, true);
        currentCursor = match.index + match[0].length;
    }

    /**
     * add the rest of HTML code that doesn't have matching expressions (no more <%something%>
     */
    addCode(response.substr(currentCursor, response.length - currentCursor));
    functionBodyString += 'return htmlStringArray.join("");';

    console.log(functionBodyString.replace(/[\r\t\n]/g, ''));
    /**
     * Replacing \r\t\n to be able to evaluate javascript injected strings without errors.
     */
    return new Function(functionBodyString.replace(/[\r\t\n]/g, '')).apply(data) || fs.readFileSync('./404.html');
}

module.exports = render;