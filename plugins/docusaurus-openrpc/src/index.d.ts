import type { LoadContext, Plugin } from "@docusaurus/types";
import type { OpenrpcDocument } from "@open-rpc/meta-schema";
import Content from "./components/content";
export { Content };
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
declare function pluginOpenRPCDocs(context: LoadContext, options: PluginOptions): Promise<Plugin<LoadedContent>>;
export declare function validateOptions({ options, validate }: any): any;
export default pluginOpenRPCDocs;
