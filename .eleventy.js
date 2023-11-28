// const htmlmin = require("html-minifier");
const { format } = require('date-fns');

module.exports = function (eleventyConfig) {
    // eleventyConfig.setUseGitIgnore(false);

    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/.well-known');
    eleventyConfig.addWatchTarget("./src/sass/");
    eleventyConfig.addPassthroughCopy({ "./src/favicon" : "/" } );
    eleventyConfig.addPassthroughCopy('./src/_redirects');

    // eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    //     if( outputPath && outputPath.endsWith(".html") ) {
    //         let minified = htmlmin.minify(content, {
    //             useShortDoctype: true,
    //             removeComments: true,
    //             collapseWhitespace: true
    //             // you can add more options here if needed
    //         });
    //         return minified;
    //     }
    //     return content;
    // });

    eleventyConfig.addCollection("sortedPosts", function(collectionApi) {
        return collectionApi.getFilteredByTag("post").sort(function(a, b) {
            return b.date - a.date; // For descending order
            // return a.date - b.date; // For ascending order
        });
    });

    eleventyConfig.addFilter('formatDate', (date, dateFormat) => {
        return format(date, dateFormat);
    });

    return {
        passthroughFileCopy: true,
        markdownTemplateEngin: "njk",
        templateFormts: ["html", "njk", "md"],
        dir: {
            input: "src",
            output: "public",
        }
    }
};
