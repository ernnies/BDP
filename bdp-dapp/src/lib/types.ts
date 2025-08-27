export interface WalletState {
  address: string | null;
  isConnected: boolean;
}

export interface Block {
  header: {
    height: string;
    hash: string;
    timestamp: string;
  };
  txs: string[];
}

export interface SyncStatus {
  l1Status: { Synced: number } | { Syncing: { headBlockNumber: number; syncedBlockNumber: number } };
  l2Status: { Synced: number } | { Syncing: { headBlockNumber: number; syncedBlockNumber: number } };
}