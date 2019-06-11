import { ServiceKey } from "@microsoft/sp-core-library";
import AppInsightsLogger from "./AppInsightsLogger";

export interface ILogger {
  log(message: string): void;
}

export const LoggerKey = ServiceKey.create<ILogger>("spsmad:logger", AppInsightsLogger);
