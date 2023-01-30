module.exports = function (eleventyConfig) {
    // eleventyConfig.setUseGitIgnore(false);

    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addWatchTarget("./src/sass/");

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