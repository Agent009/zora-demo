import { createCreatorClient, createCollectorClient } from "@zoralabs/protocol-sdk";
import { chainId, publicClient } from "@lib/zora/zoraConfig";

/**
 * The Creator Client is used to create and manage Zora creator 1155 contracts and tokens.
 */
export const creatorClient = createCreatorClient({ chainId: chainId, publicClient });
/**
 * The Collector Client is used to mint Zora creator 1155, 721, and premints.
 */
export const collectorClient = createCollectorClient({ chainId: chainId, publicClient });
