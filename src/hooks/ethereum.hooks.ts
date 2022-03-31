import { HooksManager } from "../hooks-manager";
import type { BlockWithTransactions } from "@ethersproject/abstract-provider";
import type { BigNumber } from "ethers";

export interface UseEthereumBlocksReturn {
  list: BlockWithTransactions[];
  lastUpdate: number; // epoch
}

const INITIAL_BLOCKS = {
  list: [],
  lastUpdate: 0,
};

export function useEthereumBlocks(): UseEthereumBlocksReturn {
  const ethereumService = HooksManager.getService("ethereumService");
  const { useState, useEffect } = HooksManager.getCoupling("react");
  const [blocks, setBlocks] = useState<UseEthereumBlocksReturn>(INITIAL_BLOCKS);

  useEffect(() => {
    ethereumService.onBlock((newBlock) =>
      setBlocks(({ list: oldBlocks }) => ({
        list: [newBlock, ...oldBlocks],
        lastUpdate: Date.now(),
      }))
    );
    return () => ethereumService.offBlock();
  }, []);

  return blocks;
}

export function toEth(value: BigNumber) {
  const ethereumService = HooksManager.getService("ethereumService");
  return ethereumService.toEth(value);
}
