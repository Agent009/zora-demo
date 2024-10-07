import { zora, zoraSepolia } from "viem/chains";
import { http, custom, createPublicClient, createWalletClient, Chain } from "viem";
import { constants } from "@lib/constants";

export const chain = (constants.zora.useTestNet ? zoraSepolia : zora) as Chain;
export const chainId = chain.id;

export const publicClient = createPublicClient({
  // this will determine which chain to interact with
  chain: chain,
  transport: http(),
});

export const walletClient = createWalletClient({
  chain: chain,
  // @ts-expect-error ignore
  transport: custom(window.ethereum!),
});

export const creatorAccount = (await walletClient.getAddresses())[0]!;
export const minterAccount = (await walletClient.getAddresses())[1]!;
export const randomAccount = (await walletClient.getAddresses())[2]!;
