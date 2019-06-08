import { ICounterService } from "../../../services/ICounterService";

export interface IScopedCounterProps {
  description: string;
  counterService: ICounterService;
}
