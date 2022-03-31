import { EthereumService } from "./services/ethereum.service";
import { RepoCouplings, Services } from "./types";

export class HooksManager {
  private static repoCouplings: RepoCouplings = {} as RepoCouplings;
  private static services: Services

  public static setCouplings(couplings: RepoCouplings) {
    HooksManager.repoCouplings = couplings;
    HooksManager.services = {
      ethereumService: new EthereumService()
    }
  }

  public static getCoupling<T extends keyof RepoCouplings>(
    couplingName: T
  ): RepoCouplings[T] {
    const coupling = HooksManager.repoCouplings[couplingName];
    if (!coupling) {
      throw new Error(`Coupling ${couplingName} is missing in repo hook.`);
    }
    return coupling;
  }

  public static getAll() {
    return HooksManager.repoCouplings;
  }

  public static getService<T extends keyof Services>(serviceName: T): Services[T] {
    const service =  HooksManager.services[serviceName];
    if (!service) {
      throw new Error(`Service ${serviceName} is missing in repo hook.`);
    }
    return service; 
  }
}
