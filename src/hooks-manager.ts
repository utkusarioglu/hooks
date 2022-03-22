import { RepoCouplings } from "./types";

export class HooksManager {
  private static repoCouplings: Partial<RepoCouplings> = {};

  public static setCouplings(couplings: RepoCouplings) {
    HooksManager.repoCouplings = couplings;
  }

  public static getCoupling(
    couplingName: keyof RepoCouplings
  ): RepoCouplings[keyof RepoCouplings] {
    const coupling = HooksManager.repoCouplings[couplingName];
    if (!coupling) {
      throw new Error(`Coupling ${couplingName} is missing in repo hook`);
    }
    return coupling;
  }

  public static getAll() {
    return HooksManager.repoCouplings;
  }
}
