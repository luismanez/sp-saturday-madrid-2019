import { ITask } from "../models/ITask";
import { ServiceKey } from "@microsoft/sp-core-library";
import GraphTaskService from "./GraphTaskService";

export interface ITaskService {
  getMyTasks(): Promise<ITask[]>;
}

export const TaskServiceKey = ServiceKey.create<ITaskService>("spsmad:taskService", GraphTaskService);
