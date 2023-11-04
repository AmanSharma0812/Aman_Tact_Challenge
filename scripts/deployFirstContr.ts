import { toNano } from 'ton-core';
import { FirstContr } from '../wrappers/FirstContr';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const firstContr = provider.open(await FirstContr.fromInit(BigInt(Math.floor(Math.random() * 10000))));

    await firstContr.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(firstContr.address);

    console.log('ID', await firstContr.getId());
}
