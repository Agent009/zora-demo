import { createCreatorClient } from "@zoralabs/protocol-sdk";
import { publicClient, walletClient, chainId, creatorAccount, minterAccount } from "@lib/zora/zoraConfig";
import { contractAddress } from "@lib/zora/createContract";

const creatorClient = createCreatorClient({ chainId, publicClient });
console.debug("zora -> mintToken -> creatorClient", creatorClient);

const { parameters: createParameters, prepareMint } = await creatorClient.create1155OnExistingContract({
  // by providing a contract address, the token will be created on an existing contract
  // at that address
  contractAddress,
  token: {
    // token metadata uri
    tokenMetadataURI: "ipfs://CX/token.json",
  },
  // account to execute the transaction (the creator)
  account: creatorAccount,
});
console.debug("zora -> mintToken -> create1155OnExistingContract -> prepareMint", prepareMint);

const { request } = await publicClient.simulateContract(createParameters);
console.debug("zora -> mintToken -> simulateContract -> request", request);

// execute the transaction
const hash = await walletClient.writeContract(request);
console.debug("zora -> mintToken -> writeContract -> hash", hash);
// wait for the response
const createReceipt = await publicClient.waitForTransactionReceipt({ hash });
console.log("zora -> mintToken -> waitForTransactionReceipt -> createReceipt", createReceipt);

if (createReceipt.status !== "success") {
  throw new Error("zora -> mintToken -> waitForTransactionReceipt -> create failed");
}

// the create function returns an async prepareMint function, which
// enables a mint call to be created on the token after it has been created.
// Note this can only be executed after the token has been brought onchain.
const { parameters: mintParams } = await prepareMint({
  quantityToMint: 2n,
  minterAccount,
});
console.log("zora -> mintToken -> prepareMint -> mintParams", mintParams);

// execute the mint transaction
const mintHash = await walletClient.writeContract(mintParams);
console.log("zora -> mintToken -> writeContract -> mintHash", mintHash);

const mintReceipt = await publicClient.waitForTransactionReceipt({
  hash: mintHash,
});
console.log("zora -> mintToken -> waitForTransactionReceipt -> mintReceipt", mintReceipt);

if (mintReceipt.status !== "success") {
  throw new Error("zora -> mintToken -> waitForTransactionReceipt -> mint failed");
}
