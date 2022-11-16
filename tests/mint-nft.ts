import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { MintNft } from "../target/types/mint_nft";

describe("mint-nft", () => {

  const testNftTitle = "YouTube NFT!";
  const testNftSymbol = "TUBE";
  const testNftUri = "https://raw.githubusercontent.com/Coding-and-Crypto/Solana-NFT-Marketplace/master/assets/example.json";


  const provider = anchor.AnchorProvider.env();
  const wallet = provider.wallet as anchor.Wallet;
  anchor.setProvider(provider);

  const program = anchor.workspace.MintNft as Program<MintNft>;

  const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
      "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
  );

  it("Mint!!", async () => {
    //
    const mintKeypair : anchor.web3.Keypair = anchor.web3.Keypair.generate();
    const tokenAddress = await anchor.utils.token.associatedAddress({
      mint: mintKeypair.publicKey,
      owner: wallet.publicKey,
    });

    console.log(`New token: ${mintKeypair.publicKey}`);
    const metadataAddress = (await anchor.web3.PublicKey.findProgramAddress(
        [
            Buffer.from("metadata"),
            TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            mintKeypair.publicKey.toBuffer(),
        ],
        TOKEN_METADATA_PROGRAM_ID
    ))[0];



  });
});
