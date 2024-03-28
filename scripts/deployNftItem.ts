import { Address, Cell, beginCell, toNano } from '@ton/core';
import { NetworkProvider } from '@ton/blueprint';
import { Mint, NftCollection } from '../wrappers/NftCollection';

export async function run(provider: NetworkProvider) {
    const nft_collection_address = Address.parse('EQCtic4EiLV3yqAq4T-q08GdjBbkFmJNxDi9h_Pa3VpyvIsW');

    const nftCollection = provider.open(NftCollection.fromAddress(nft_collection_address));
    const message: Mint = {
        $$type: 'Mint',
        query_id: 0n,
    };

    await nftCollection.send(
        provider.sender(),
        {
            value: toNano('0.2'),
        },
        message,
    );

    const collectionData = await nftCollection.getGetCollectionData();
    const nftItemAddress = await nftCollection.getGetNftAddressByIndex(collectionData.next_item_index);

    await provider.waitForDeploy(nftItemAddress as Address);
}
function encodeNftItem(arg0: string): import('ton-core').Cell {
    throw new Error('Function not implemented.');
}
