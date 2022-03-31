import type { BlockWithTransactions } from "@ethersproject/abstract-provider";
// import "react-native-get-random-values";
// import "@ethersproject/shims";
import { HooksManager } from "../hooks-manager";
import type { ethers as Ethers } from "ethers";

const INFURA_PROJECT_ID = "62fe7a0486ba4dc4ba5db2110e8451a4";
const INFURA_PROJECT_SECRET = "aaade2f26b5741329c3e216b8737c200";

type NewBlocWithTransactionsCallback = (stuff: BlockWithTransactions) => void;

export class EthereumService {
  private ethers: typeof Ethers;
  private provider: ReturnType<typeof Ethers.providers.getDefaultProvider>;

  constructor() {
    this.ethers = HooksManager.getCoupling("ethers")
    this.provider = this.ethers.getDefaultProvider("goerli", {
      infura: {
        projectId: INFURA_PROJECT_ID,
        projectSecret: INFURA_PROJECT_SECRET,
      },
    });
  }

  onBlock(newBlocWithTransactionsCallback: NewBlocWithTransactionsCallback) {
    this.provider.on("block", async (blockNum) => {
      const blockWithTransactions =
        await this.provider.getBlockWithTransactions(blockNum);
      newBlocWithTransactionsCallback(blockWithTransactions);
    });
  }

  offBlock() {
    this.provider.off("block");
  }

  toEth(value: Ethers.BigNumber): string {
    return this.ethers.utils.formatUnits(value);
  }
}
