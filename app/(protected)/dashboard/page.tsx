"use client"

import { OverviewStats } from "@/components/dashboard/OverviewStats";
import { TransactionChart } from "@/components/dashboard/TransactionChart";
import { GovernmentSchemes } from "@/components/dashboard/GovernmentSchemes";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { NotificationsCenter } from "@/components/dashboard/NotificationsCenter";
import { ProfileStatus } from "@/components/dashboard/ProfileStatus";
import { useState } from "react";
import Head from "next/head";
import styles from "./Home.module.css";
import Web3 from "web3";
import Web3Modal from "web3modal";

const providerOptions = {
  // Add your provider options here if needed
};

const web3modal = new Web3Modal({
  network: "mainnet",
  cacheProvider: true,
  providerOptions,
});

const DashboardPage: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      const provider = await web3modal.connect();
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  return (
    <>
      <Head>
        <title>MetaMask Wallet Integration!</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative">
        {/* Connect Wallet Button */}
        <button
          className={styles.connectButton}
          onClick={connectWallet}
          style={{
            position: "absolute",
            top: "0px",
            right: "20px",
            zIndex: "1000",
          }}
        >
          {account ? "Wallet Connected" : "Connect Wallet"}
        </button>

        {/* Wallet Status */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            zIndex: "1000",
            fontSize: "14px",
            color: account ? "green" : "red",
          }}
        >
          {account ? `Connected: ${account}` : "Wallet not connected"}
        </div>

        {/* Dashboard Content */}
        <div className="p-6 md:p-8 lg:p-10">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <OverviewStats />
          </div>
          <div className="grid gap-6 lg:grid-cols-7 mt-6">
            <TransactionChart />
            <GovernmentSchemes />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
            <QuickActions />
            <NotificationsCenter />
            <ProfileStatus />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
