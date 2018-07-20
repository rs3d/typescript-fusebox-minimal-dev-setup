const path = require("path");
const express = require("express");
const fs = require("fs");

const {
  FuseBox,
  HTMLPlugin,
  JSONPlugin,
  SassPlugin,
  CSSResourcePlugin,
  CSSModules,
  CSSPlugin,
  QuantumPlugin,
  WebIndexPlugin
} = require("fuse-box");
const { src, task, exec, context, watch } = require("fuse-box/sparky");
const { TypeChecker } = require("fuse-box-typechecker");

const config = {
  basePath: "src",
  distPath: "dist"
};

const fuse = FuseBox.init({
  homeDir: config.basePath,
  target: "browser@es6",
  output: "dist/$name.js",
  sourceRoot : "/src", 
  sourceMaps: {
    inline: false,
    project: true,
    vendor: true,
  },
  plugins: [
    HTMLPlugin(),
    JSONPlugin(),
    [
      SassPlugin(),
      CSSResourcePlugin({ dist: "dist/css-resources" }),
      // CSSModules(), // removes source maps
      CSSPlugin()
    ],
    // WebIndexPlugin({}) // using index.html with reload()
  ]
});

const doTypeCheck = async () => {
  const checker = TypeChecker({
    basePath: config.basePath,
    tsConfig: "./tsconfig.json",
    name: "TypeChecking"
  });

  let totalErrors = await checker.runPromise();
  console.log(totalErrors);
};

task("devWatch", async context => {
  fuse.dev({ root: false }, server => {
    const app = server.httpServer.app;
    app.use(require('compression')());
    app.use("/", express.static(path.join(config.distPath)));
    app.use("/src", express.static(path.join(config.basePath)));
    app.use("/vendor", express.static(path.join('node_modules')));
  });

  fuse
    .bundle("app")
    .instructions(" > index.ts")
    .hmr()
    .watch();
  await fuse.run();
});

task("typeCheck", () => {
  const testWatch = TypeChecker({
    tsConfig: "tsconfig.json",
    basePath: ".",
    name: "Watch Async"
  });
  return testWatch.runWatch(path.join("./", config.basePath));
});

task("templateWatch", async context => {
  await watch(
    path.join("./", config.basePath, "index.html"),
    {
      base: config.basePath
    },
    () => {
      exec("reload");
    }
  )
    .dest("dist/")
    .exec();
});

task("templateCopy", async context => {
  await src(path.join("./", "index.html"), {
    base: config.basePath
  })
    .dest(path.join(config.distPath))
    .exec();
});

task("reload", async context => {
  fuse.sendPageReload();
});

task(
  "default",
  ["typeCheck", "templateCopy", "templateWatch", "devWatch"],
  () => {
    exec("reload");
  }
);
