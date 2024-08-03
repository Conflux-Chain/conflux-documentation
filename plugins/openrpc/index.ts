import { LoadedVersion } from "@docusaurus/plugin-content-docs";
import { Plugin as DocusaurusPlugin, LoadContext } from "@docusaurus/types";
import { MethodObject, Methods, OpenrpcDocument } from "@open-rpc/meta-schema";
import { parseOpenRPCDocument } from "@open-rpc/schema-utils-js";
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";
import webpack from "webpack";

import path from "path";
export type DocusaurusOpenRPCOptions = {
  id: string;
  // either a file path, or uri to a document.
  openrpcDocument: string;
  defaultEndpoint: string;
  path: string;
};

export type DocusaurusOpenRPCContent = {
  openrpcDocument: OpenrpcDocument;
  defaultEndpoint: string;
};
export default async function OpenRPC(
  context: LoadContext,
  opts: DocusaurusOpenRPCOptions
): Promise<DocusaurusPlugin<DocusaurusOpenRPCContent>> {
  return {
    // A compulsory field used as the namespace for directories to cache
    // the intermediate data for each plugin.
    // If you're writing your own local plugin, you will want it to
    // be unique in order not to potentially conflict with imported plugins.
    // A good way will be to add your own project name within.
    name: "docusaurus-openrpc",

    async loadContent() {
      const document = await parseOpenRPCDocument(opts.openrpcDocument);

      const methods: Methods = document.methods.reduce<Methods>(
        (memo, method: any) => {
          if (memo.find((bMethod: any) => bMethod.name === method.name)) {
            return memo;
          }
          return [...memo, method];
        },
        []
      );

      document.methods = methods as any;
      return {
        openrpcDocument: document,
        defaultEndpoint: opts.defaultEndpoint,
      };
    },

    async contentLoaded({ content, actions }) {
      // The contentLoaded hook is done after loadContent hook is done.
      // `actions` are set of functional API provided by Docusaurus (e.g. addRoute)
      const { openrpcDocument, defaultEndpoint = "localhost:12537" } = content;
      const propsFilePath = await actions.createData(
        "props.json",
        JSON.stringify({
          path: opts.path,
          openrpcDocument,
          defaultEndpoint,
        })
      );

      for (const method of openrpcDocument.methods) {
        actions.addRoute({
          path: path.join(
            context.baseUrl,
            opts.path,
            (method as MethodObject).name.toLowerCase()
          ),
          component: path.join(
            path.resolve(),
            "./plugins/openrpc/src/pages/Method/index.tsx"
          ),
          modules: {
            propsFile: propsFilePath,
          },
          exact: true,
        });
      }
    },

    async postBuild(props) {
      // After docusaurus <build> finish.
    },

    // TODO
    // async postStart(props) {
    //   // docusaurus <start> finish
    // },

    // TODO
    // afterDevServer(app, server) {
    //   // https://webpack.js.org/configuration/dev-server/#devserverbefore
    // },

    // TODO
    // beforeDevServer(app, server) {
    //   // https://webpack.js.org/configuration/dev-server/#devserverafter
    // },

    configureWebpack() {
      return {
        plugins: [
          new NodePolyfillPlugin(),
          new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
          }),
        ],
        resolve: {
          fallback: {
            fs: false,
          },
        },
      };
    },

    // getPathsToWatch() {
    //   // Paths to watch.
    // },

    // getThemePath() {
    //   // Returns the path to the directory where the theme components can
    //   // be found.
    // },

    // getClientModules() {
    //   // Return an array of paths to the modules that are to be imported
    //   // in the client bundle. These modules are imported globally before
    //   // React even renders the initial UI.
    // },

    // extendCli(cli) {
    //   // Register an extra command to enhance the CLI of Docusaurus
    // },

    // injectHtmlTags({ content }) {
    //   // Inject head and/or body HTML tags.
    // },

    // async getTranslationFiles({ content }) {
    //   // Return translation files
    // },

    // translateContent({ content, translationFiles }) {
    //   // translate the plugin content here
    // },

    // translateThemeConfig({ themeConfig, translationFiles }) {
    //   // translate the site themeConfig here
    // },

    // async getDefaultCodeTranslationMessages() {
    //   // return default theme translations here
    // },
  };
}

// export function validateOptions({ options, validate }) {
//   const validatedOptions = validate(myValidationSchema, options);
//   return validatedOptions;
// }

// export function validateThemeConfig({ themeConfig, validate }) {
//   const validatedThemeConfig = validate(myValidationSchema, options);
//   return validatedThemeConfig;
// }
