import type { TaskType } from "./TaskType";
import type { StationType } from "../../entities/stations/Station";

export interface Task {
  
  type: TaskType;

  targetStation: StationType;
}