import type { LoadContext, Plugin } from "@docusaurus/types";
import { parseOpenRPCDocument } from "@open-rpc/schema-utils-js";
import { OptionsSchema } from "./options";
import type { OpenrpcDocument } from "@open-rpc/meta-schema";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { generateMarkdownDoc } from "./openRPC";

type PluginOptions = {
  id?: string;
  openRPCPath: string;
  outputPath: string;
  category: {
    position?: number;
    label?: string;
    collapsible?: boolean;
    collapsed?: boolean;
    className?: string;
  };
};

type LoadedContent = {
  openrpc: OpenrpcDocument;
};

async function pluginOpenRPCDocs(
  context: LoadContext,
  options: PluginOptions
): Promise<Plugin<LoadedContent>> {
  return {
    name: "docusaurus-openrpc",

    async loadContent() {
      const rpcDocument = await parseOpenRPCDocument(options.openRPCPath);

      return {
        openrpc: rpcDocument,
      };
    },

    async contentLoaded({ content, actions }) {
      const { openrpc } = content;

      const outputPath = `${options.outputPath}`;
      // check the outputPath dir exists

      if (!existsSync(outputPath)) {
        try {
          mkdirSync(outputPath);
        } catch (err) {
          throw new Error(`Failed to create dir ${outputPath}`);
        }
      }

      for (const method of openrpc.methods) {
        if (!("$ref" in method)) {
          const content = generateMarkdownDoc({
            sidebar_label: method.name,
            method: method,
            servers: (openrpc.servers || []).map((serve) => ({
              name: serve.name || "",
              url: serve.url || "",
            })),
          });

          const fileName = `${method.name}.mdx`;
          const filePath = `${outputPath}/${fileName}`;

          try {
            writeFileSync(filePath, content);
          } catch (err) {
            throw new Error(`Failed to write ${filePath}`);
          }
        }
      }
      // _category_
      try {
        writeFileSync(
          `${outputPath}/_category_.json`,
          JSON.stringify({ ...options.category }, null, 2)
        );
      } catch (err) {
        throw new Error(`Failed to write ${outputPath}/sidebar.js`);
      }
    },

    async postBuild(props) {
      // After docusaurus <build> finish.
    },

    // // TODO
    // async postStart(props) {
    // 	// docusaurus <start> finish
    // },

    // TODO
    // afterDevServer(app, server) {
    // 	// https://webpack.js.org/configuration/dev-server/#devserverbefore
    // },

    // TODO
    // beforeDevServer(app, server) {
    // 	// https://webpack.js.org/configuration/dev-server/#devserverafter
    // },

    // configureWebpack(config, isServer, utils, content) {
    //   return {
    //     plugins: [],
    //   };
    // },

    // getPathsToWatch() {
    // 	// Paths to watch.
    // },

    getThemePath() {
      // Where compiled JavaScript output lives
      return "./components";
    },

    // getClientModules() {
    // 	// Return an array of paths to the modules that are to be imported
    // 	// in the client bundle. These modules are imported globally before
    // 	// React even renders the initial UI.
    // },

    // extendCli(cli) {
    // 	// Register an extra command to enhance the CLI of Docusaurus
    // },

    // injectHtmlTags({ content }) {
    // 	// Inject head and/or body HTML tags.
    // },

    // async getTranslationFiles({ content }) {
    // 	// Return translation files
    // },

    // translateContent({ content, translationFiles }) {
    // 	// translate the plugin content here
    // },

    // translateThemeConfig({ themeConfig, translationFiles }) {
    // 	// translate the site themeConfig here
    // },

    // async getDefaultCodeTranslationMessages() {
    // 	// return default theme translations here
    // },
  };
}

export function validateOptions({ options, validate }: any) {
  const validatedOptions = validate(OptionsSchema, options);
  return validatedOptions;
}

export default pluginOpenRPCDocs;
