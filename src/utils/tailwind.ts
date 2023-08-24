import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

const twConfig = resolveConfig(tailwindConfig);
const mdBreakpoint = Number.parseInt((twConfig.theme?.screens as any).md);

export { mdBreakpoint };
