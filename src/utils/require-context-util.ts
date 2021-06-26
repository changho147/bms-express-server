import Logger from "@src/utils/logger";

export function getExportedByRequireContext(requireContext: __WebpackModuleApi.RequireContext): any {
    return requireContext
        .keys()
        .sort()
        .map((item: string) => {
            const required = requireContext(item);
            return Object.keys(required).reduce((items, currentValue) => {
                const exported = required[currentValue];
                Logger.info(`Exported Context - ${exported.name}`);
                if (typeof exported === "function") return items.concat(exported);

                return items;
            }, [] as any);
        })
        .flat();
}
