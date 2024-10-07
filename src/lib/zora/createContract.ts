import { useAccount, useChainId, usePublicClient, useWriteContract } from "wagmi";
import { createCreatorClient } from "@zoralabs/protocol-sdk";

// use wagmi hooks to get the chainId, publicClient, and account
const chainId = useChainId();
const publicClientW = usePublicClient()!;
const { address } = useAccount();
console.log("zora -> createContract -> chainId:", chainId, "publicClient:", publicClientW, "account:", address);

const creatorClient = createCreatorClient({ chainId, publicClient: publicClientW });

const { parameters, contractAddress } = await creatorClient.create1155({
  // the contract will be created at a deterministic address
  contract: {
    // contract name
    name: "testContract",
    // contract metadata uri
    uri: "ipfs://CX/contract.json",
  },
  token: {
    tokenMetadataURI: "ipfs://CX/token.json",
    // https://docs.zora.co/protocol-sdk/creator/onchain#custom-parameters-for-secondary-markets
    salesConfig: {
      type: "timed",
      // manually specifying the erc20 name and symbol
      erc20Name: "cxToken", // If not provided, uses the contract name
      erc20Symbol: "CX", // If not provided, extracts it from the name.
      saleStart: 0n, // If not provided, sets to 0
      marketCountdown: BigInt(24 * 60 * 60), // If not provided, sets to 24 hours
      minimumMarketEth: 2220000000000000n, // If not provided, sets to 200 mints worth of ETH
    },
  },
  // account to execute the transaction (the creator)
  account: address!,
});

// simulate the transaction
// const { request } = await publicClient.simulateContract(parameters);
// execute the transaction
// await walletClient.writeContract(request);

const { writeContract } = useWriteContract();

writeContract(parameters);

export { contractAddress };
