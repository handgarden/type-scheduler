import { CronField } from "./CronField";
import { CronFieldBuilder } from "./CronFieldBuilder";

export type CronFieldFactory = (builder: CronFieldBuilder) => CronField;
