import type React from "react";
import type { ethers as Ethers } from "ethers";
import { EthereumService } from "./services/ethereum.service";

export type RepoCouplings = {
  react: typeof React;
  ethers: typeof Ethers;
};

export type Services = {
  ethereumService: EthereumService
}
