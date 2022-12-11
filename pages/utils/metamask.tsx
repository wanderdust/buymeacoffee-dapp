import React, { useEffect, useState } from "react";

export const isWalletConnected = async () => {
    if (!window.ethereum) {
        return false;
    }
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    return accounts.length > 0
};

export const getConnectedWallet = async () => {
    const accounts: [any] = await window.ethereum.request({ method: 'eth_accounts' });
    return accounts[0];
};