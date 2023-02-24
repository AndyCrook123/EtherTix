const assert = require("chai").assert;
const TicketNFT = artifacts.require("TicketNFT");
const Web3 = require('web3');
const web3 = new Web3();

contract("TicketNFT", (accounts) => { // Unit Tests for TicketNFT Contract

    let ticketNFT;

    beforeEach(async () => {
        ticketNFT = await TicketNFT.new();
    });

    const convertPriceToEther = () => {
        const price = web3.utils.toWei("0.01", "ether").toString()
        const priceInEther = web3.utils.fromWei(price, "ether");

        return priceInEther;
    }

    const fetchReceiptLogs = (receipt) => {
        const eventLogs = receipt.logs.find(log => log.event === "NewTokenMinted");
        return eventLogs;
    }

    it("Unit Test 1 : Test that mints one token", async () => {
        const tokenOneName = "Test Mint jjj Ticket 90";
        const tokenOnePrice = 50;

        const tokenTwoName = "Second Token Here!"
        const tokenTwoPrice = 50;

        const tokenOne = await ticketNFT.mintToken(tokenOneName, tokenOnePrice, { from: accounts[0] });
        const tokenTwo = await ticketNFT.mintToken(tokenTwoName, tokenTwoPrice, { from: accounts[0] });

        const mintEventLogs = fetchReceiptLogs(tokenOne);
        const tokenTwoReceipt = fetchReceiptLogs(tokenTwo);

        const tokenOneID = mintEventLogs.args.tokenId;
        const token = await ticketNFT.fetchTokenByIndex(tokenOneID);

        const tokenTwoID = tokenTwoReceipt.args.tokenId;
        const tokenTwoCurr = await ticketNFT.fetchTokenByIndex(tokenTwoID);

        assert.equal(token.tokenOwner, accounts[0]);
        assert.equal(token.tokenName, tokenOneName);
        assert.equal(token.tokenPrice, tokenOnePrice);

        assert.equal(tokenTwoCurr.tokenOwner, accounts[0]);
        assert.equal(tokenTwoCurr.tokenName, tokenTwoName);
        assert.equal(tokenTwoCurr.tokenPrice, tokenTwoPrice);
    });

    it(" Unit Test 2 : Should transfer the ownership of the token", async () => {
        const name = "Test Mint Token";
        const price = web3.utils.toWei("0.01", "ether")
       
        const receipt = await ticketNFT.mintToken(name, price, { from: accounts[0] });
        const eventLogs = fetchReceiptLogs(receipt);
        const tokenId = eventLogs.args.tokenId;

        await ticketNFT.transferTokenOwnership(tokenId, accounts[1], { from: accounts[0] });
        const token = await ticketNFT.fetchTokenByIndex(tokenId);

        assert.equal(token.tokenOwner, accounts[1], "Token ownership transfer failed");
    })

    it("Unit Test 3 - Should be able to list the currently minted NFT for sale", async () => {

        const name = "Test Mint Token";
        const priceInEther = convertPriceToEther();

        const receipt = await ticketNFT.mintToken(name, parseInt(priceInEther), { from: accounts[0] });
        const event = fetchReceiptLogs(receipt);
        const tokenID = event.args.tokenId;

        const currentListedTokenIndex = await ticketNFT.fetchTokenByIndex(tokenID);
        const tokenOwner = currentListedTokenIndex.tokenOwner;
        const theTokenId = currentListedTokenIndex.tokenId;

        await ticketNFT.listNftForSale(parseInt(theTokenId), parseInt(priceInEther), { from: tokenOwner });
    })


});